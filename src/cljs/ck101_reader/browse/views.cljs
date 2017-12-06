(ns ck101-reader.browse.views
  (:require
    [re-frame.core :as rf]
    [reagent.core :as r]
    [ck101-reader.components :as com]
    [re-mdl.core :as mdl]
    [clojure.string :as string]))

(defn browse-panel [_]
  (let [items (rf/subscribe [:browse-items])
        forum (rf/subscribe [:forum-url])]
    (rf/dispatch [:fetch-forum @forum [:browse-items]])
    (fn [_]
      [mdl/list-coll
       :children
       (into []
         (for [{:keys [url cover-image title last-post-time]} @items]
           ^{:key url}
           [mdl/list-item
            :item-type :two-line
            :children
            [[mdl/list-item-primary-content
               :icon [:span
                      [:img {:src   (if (string/blank? cover-image)
                                        "https://ck101.com/static/image/common/nophoto.gif"
                                        cover-image)
                             :style {:margin-right "8px"
                                     :width        "100px"
                                     :height       "65px"}}]]
               :child [:a {:href "/"}
                       title]
               :children
               [[mdl/list-item-sub-title
                  :child last-post-time]]]
             [mdl/list-item-secondary-content
              :children
              [[mdl/list-item-secondary-action
                :href  (str "/epub?url=" url)
                :el    :a
                :child [:i.material-icons "file_download"]]]]]]))])))
