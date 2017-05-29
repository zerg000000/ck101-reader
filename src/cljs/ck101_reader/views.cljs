(ns ck101-reader.views
    (:require
      [re-frame.core :as re-frame]
      [reagent.core :as r]
      [ck101-reader.components :as com]
      [re-mdl.core  :as mdl]))

(com/setup-resize!)
;; home
(js/setInterval #(re-frame/dispatch [:update-onoffline (.-onLine js/navigator)]) 5000)

(defn home-panel []
  (let [fetching (re-frame/subscribe [:fetching])
        preview (re-frame/subscribe [:preview])
        posts (re-frame/subscribe [:posts])]
    (fn []
      [:div
        [mdl/list-coll
          :children
          (into []
            (for [post @posts]
             ^{:key (:id post)}
             [mdl/list-item
               :item-type :two-line
               :children
               [[mdl/list-item-primary-content
                  :avatar "person"
                  :attr {:href  (str "/#/view/" (:id post))}
                  :el    :a
                  :child (:book-name post)
                  :children
                  [[mdl/list-item-sub-title
                     :child (:total-section post)]]]
                [mdl/list-item-secondary-content
                  :children
                  [[mdl/list-item-secondary-action
                    :href  (str "/#/view/" (:id post) "/delete")
                    :el    :a
                    :child [:i.material-icons "delete"]]]]]]))]
        (when @preview
         [mdl/dialog
           :children
           [[mdl/dialog-title
            :child (:book-name @preview)]
            [mdl/dialog-content
             :children
             [[:p (:description @preview)]]]
            [mdl/dialog-actions
             :children
             [[mdl/button
               :child    "加到離線閱讀"
               :on-click #(re-frame/dispatch [:fetch-post @preview])]
              [mdl/button
               :child     "取消"]]]]])])))   

;; about

(defn view-panel []
  (let [progress (re-frame/subscribe [:progress])
        text (re-frame/subscribe [:current-text])
        sections (re-frame/subscribe [:current-sections])]
    (fn []
      [com/text-view text progress])))

;; main

(defn- panels [panel-name]
  [mdl/layout
        :fixed-header? true
        :children
        [[com/readbar panel-name]
         [mdl/layout-drawer
           :children
           [[mdl/layout-title
             :label "Title"]]]
         [mdl/layout-content
           :children
           [(case @panel-name
              :home-panel [home-panel]
              :view-panel [view-panel]
              [:div])
            [mdl/snackbar-target]]]]])

(defn main-panel []
  (let [active-panel (re-frame/subscribe [:active-panel])]
    (fn []
      [panels active-panel])))
