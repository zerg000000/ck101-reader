(ns ck101-reader.browse.views
  (:require
    [re-frame.core :as rf]
    [reagent.core :as r]
    [ck101-reader.components :as com]
    [re-mdl.core :as mdl]
    [clojure.string :as string]))

(defn post-panel [_]
  (let [posts (rf/subscribe [:posts-items])]
    (rf/dispatch [:fetch-posts])
    (fn [_]
      [mdl/list-coll
       :children
       (into []
         (for [{:keys []} @posts]
           [mdl/list-item
            :children
            [[mdl/list-item-primary-content
              :child]]]))])))

(defn get-forum-ids [url]
  (if url
    (drop 1 (re-find #"forum-(\d+)-(\d+)\.html" url))))

(defn get-post-ids [url]
  (if url
    (drop 1 (re-find #"thread-(\d+)-(\d+).+\.html" url))))

(defn browse-panel [_]
  (let [items (rf/subscribe [:browse-items])
        forum (rf/subscribe [:forum-url])
        fetching (rf/subscribe [:fetching])]
    (rf/dispatch [:fetch-forum @forum [:browse-items]])
    (fn [_]
      (if @fetching
        [:div
         {:style {:display "flex"
                  :justify-content "center"
                  :height "100vh"
                  :align-items "center"}}
         [mdl/loading-spinner
           :is-active? true]]
        [mdl/list-coll
         :children
         (->
           (into [[mdl/list-item
                   :item-type :one-line
                   :children
                   [[mdl/list-item-primary-content
                      :child [:a {:href (str "/#/")}
                                 "上一層"]]]]]
             (for [{:keys [url cover-image title last-post-time]} (:posts @items)]
               ^{:key url}
               [mdl/list-item
                :item-type :two-line
                :children
                [[mdl/list-item-primary-content
                   :el :a
                   :attr {:href (let [[id page-id] (get-post-ids url)]
                                  (str "/#/post/" id))}
                   :icon [:span
                          [:img {:src   (if (string/blank? cover-image)
                                            "https://ck101.com/static/image/common/nophoto.gif"
                                            cover-image)
                                 :style {:margin-right "8px"
                                         :width        "100px"
                                         :height       "65px"}}]]
                   :child title
                   :children
                   [[mdl/list-item-sub-title
                      :child last-post-time]]]
                 [mdl/list-item-secondary-content
                  :children
                  [[mdl/list-item-secondary-action
                    :href  (str "/epub?url=" url)
                    :el    :a
                    :child [:i.material-icons "file_download"]]]]]]))
           (conj
             [mdl/list-item
              :item-type :one-line
              :children
              [[mdl/list-item-primary-content
                :child [:a {:href (let [[id page-id] (get-forum-ids (:next @items))]
                                    (str "/#/forum/" id "/" page-id))}
                        "下一頁"]]]]))]))))
