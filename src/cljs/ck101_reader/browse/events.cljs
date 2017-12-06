(ns ck101-reader.browse.events
  (:require [re-frame.core :as re-frame]
            [day8.re-frame.http-fx]
            [ck101-reader.db :as db]
            [re-mdl.core :as mdl]
            [ajax.core :as ajax]))

(re-frame/reg-event-fx
  :fetch-forum
  (fn [{:keys [db]} [_ url cursor]]
    {:db         (assoc db :fetching true)
     :http-xhrio {:method          :get
                  :uri             (str "/fetch_forum?url=" url)
                  :timeout         30000
                  :response-format (ajax/json-response-format {:keywords? true})
                  :on-success      [:fetch-forum-success cursor]
                  :on-failure      [:fetch-forum-failure]}}))

(re-frame/reg-event-db
  :fetch-forum-success
  (fn [db [_ cursor resp]]
    (-> (assoc-in db cursor resp)
        (assoc :fetching false))))

(re-frame/reg-event-db
  :fetch-forum-failure
  (fn [db [_ cursor resp]]
    (assoc db :fetching false)))

(re-frame/reg-event-db
  :set-forum-url
  (fn [db [_ url]]
    (re-frame/dispatch [:fetch-forum url [:browse-items]])
    (assoc db :forum-url url)))
