(ns ck101-reader.views
    (:require
      [re-frame.core :as re-frame]
      [reagent.core :as r]
      [ck101-reader.components :as com]))

(com/setup-resize!)
;; home

(defn home-panel []
  (let [fetching (re-frame/subscribe [:fetching])
        posts (re-frame/subscribe [:posts])]
    (fn []
      [:div {:style {:display "flex" :flex-direction "column"}}
       [:div.input
         {:style {:display "flex" 
                  :flex-direction "column"
                  :padding "5px 10px"
                  :border-bottom "1px solid black"}}
         [:input {:type "text"
                  :on-change #(re-frame/dispatch [:input-url-text (-> % .-target .-value)])
                  :placeholder "Enter CK101 URL..."
                  :style {:outline "none"
                          :border "none"
                          :font-size "15px"
                          :height "30px"}}]]
       [:div.button
         {:style {:padding "5px 10px"
                  :display "flex"
                  :flex-direction "column"}}  
         [:button {:on-click #(re-frame/dispatch [:fetch-post])
                   :style {:height "30px" 
                           :margin-top "10px"
                           :font-size "15px"
                           :font-weight "bold"
                           :color "white" 
                           :background-color "blue" 
                           :outline "none" 
                           :border "none"}}
            (if @fetching
              "Loading..."
              "Fetch and Cache!")]]
       [:h3 "Cached Content"]
       [com/list-view 
         posts
         com/book-list-item]])))
      
       

;; about

(defn view-panel []
  (let [progress (re-frame/subscribe [:progress])
        text (re-frame/subscribe [:current-text])
        sections (re-frame/subscribe [:current-sections])
        toc (r/atom false)]
    (fn []
      [:div.container {:style {:position "relative"}}
        [:div.backdrop
          {:style {:position "absolute" 
                   :width (:viewport-width @com/styles) 
                   :height (:viewport-height @com/styles)
                   :background-color "rgba(0,0,0,0.3)"
                   :display (if @toc "block" "none")}
           :on-click #(swap! toc not)}]
        [:div.toc
          {:style {:position "fixed"
                   :width (:viewport-width @com/styles)
                   :height (:viewport-height @com/styles)
                   :top "0px" 
                   :left (str ((if @toc - +) (:viewport-width @com/styles) (:viewport-width @com/styles)) "px")
                   :transition "left 0.3s ease"
                   :background-color "white"
                   :overflow-y "scroll"}}
          [com/list-view
            sections com/section-list-item]]
        [:div.main {:style {:display "flex" :flex-direction "column"}}
          [com/readbar progress toc]
          [com/text-view text progress]]])))

;; main

(defn- panels [panel-name]
  (case panel-name
    :home-panel [home-panel]
    :view-panel [view-panel]
    [:div]))

(defn show-panel [panel-name]
  [panels panel-name])

(defn main-panel []
  (let [active-panel (re-frame/subscribe [:active-panel])]
    (fn []
      [show-panel @active-panel])))
