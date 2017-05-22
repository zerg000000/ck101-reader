(ns ck101-reader.events
    (:require [re-frame.core :as re-frame]
              [day8.re-frame.http-fx]
              [ajax.core :as ajax]
              [ck101-reader.db :as db]))

; interceptors

(def posts->local-store 
  (re-frame/after (partial db/items->local-store :posts)))
(def post-progress->local-store 
  (re-frame/after (partial db/items->local-store :post-progress)))

; events

(re-frame/reg-event-db
 :initialize-db
 (fn  [_ _]
   db/default-db))

(re-frame/reg-event-fx
  :load-user-data
  [(re-frame/inject-cofx :local-store :posts)
   (re-frame/inject-cofx :local-store :post-progress)]
  (fn [cofx event]
    (let [val (:local-store cofx)
          db (:db cofx)]
      {:db (merge db val)})))
  

(re-frame/reg-event-db
 :set-active-panel
 (fn [db [_ active-panel]]
   (assoc db :active-panel active-panel)))

(re-frame/reg-event-db
  :set-progress
  [post-progress->local-store]
  (fn [db [_ progress]]
    (let [new-db (assoc-in db [:current 2] progress)
          post-id (get-in db [:current 0])]
      (assoc-in new-db [:post-progress post-id] (get-in new-db [:current])))))
         

(re-frame/reg-event-db
  :go-next-section
  (fn [db [_ idx]]
    (let [cur (get-in db [:current])
          next-section-idx (if idx (dec idx) (inc (second cur)))
          has-next (get-in db [:posts (first cur) :sections next-section-idx])]
      (if has-next
        (assoc db :current [(first cur) next-section-idx 0])
        db))))

(re-frame/reg-event-db
  :input-url-text
  (fn [db [_ url]]
    (assoc db :url-text url)))

(re-frame/reg-event-db
  :delete-post
  [posts->local-store]
  (fn [db [_ id]]
    (update-in db [:posts] dissoc id)))
        
(re-frame/reg-event-db
  :resume-post
  (fn [db [_ post-id]]
    (let [cur (get-in db [:post-progress post-id] [post-id 1 0])]
      (assoc db :current cur :progress (nth cur 2) :active-panel :view-panel))))

(re-frame/reg-event-db
  :fetch-post-failure
  (fn [db]
    (assoc db :fetching false :message "")))

(re-frame/reg-event-db
  :fetch-post-success
  [posts->local-store]
  (fn [db [_ val]]
    (-> (assoc-in db [:posts (:id val)] val)
        (assoc
           :fetching false
           :current [(:id val) 1 0]
           :active-panel :view-panel))))

(re-frame/reg-event-fx
  :fetch-post
  (fn [{:keys [db]} _]
    {:db (assoc db :fetching true)
     :http-xhrio {:method :get
                  :uri (str "/fetch_post?url=" (:url-text db))
                  :timeout 30000
                  :response-format (ajax/json-response-format {:keywords? true})
                  :on-success [:fetch-post-success]
                  :on-failure [:fetch-post-failure]}}))