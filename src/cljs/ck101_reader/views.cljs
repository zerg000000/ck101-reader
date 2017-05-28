(ns ck101-reader.views
    (:require
      [re-frame.core :as re-frame]
      [reagent.core :as r]
      [ck101-reader.components :as com]))

(com/setup-resize!)
;; home

(defn get-id-from-link [url]
  (let [[_ post-id] (re-find #"ck101.com/thread-(\d+)-" url)]
    (js/parseInt post-id)))

(defn home-panel []
  (let [fetching (re-frame/subscribe [:fetching])
        preview (re-frame/subscribe [:preview])
        posts (re-frame/subscribe [:posts])]
    (fn []
      [:div {:style {:display "flex" :flex-direction "column"}}
       [:div.input
         {:style {:display "flex" 
                  :flex-direction "column"
                  :padding "5px 10px"
                  :border-bottom "1px solid black"}}
         [:input {:type "text"
                  :on-change #(do (re-frame/dispatch [:input-url-text (-> % .-target .-value)])
                                  (when (get-id-from-link (-> % .-target .-value))
                                    (re-frame/dispatch [:preview-info (-> % .-target .-value)])))
                  :placeholder "Enter CK101 URL..."
                  :style {:outline "none"
                          :border "none"
                          :font-size "15px"
                          :height "30px"}}]]
       (when @preview
         [:div 
           {:on-click #(re-frame/dispatch [:fetch-post @preview])} 
           (if @fetching
              "Loading"
              (str @preview))])
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
                   :width (str (:viewport-width @com/styles) "px")
                   :height (str (:viewport-height @com/styles) "px")
                   :background-color "rgba(0,0,0,0.3)"
                   :display (if @toc "block" "none")}
           :on-click #(swap! toc not)}]
        [:div.toc
          {:style (assoc (:toc @com/styles) :left (str ((if @toc - +) (:viewport-width @com/styles) 300) "px"))}
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
