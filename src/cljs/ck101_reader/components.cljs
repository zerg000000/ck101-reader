(ns ck101-reader.components
  (:require
    [re-frame.core :as re-frame]
    [reagent.core :as r]))

(defn get-reader-styles [viewport-height viewport-width]
  (let [readbar-height 50]
    {:text-view {:height (str (- viewport-height readbar-height) "px")
                 :padding "0px 1.7em"
                 :overflow-y "scroll"}
     :viewport-height viewport-height
     :viewport-width viewport-width}))

(def styles
  (r/atom
    (get-reader-styles (.-innerHeight js/window) (.-outerWidth js/window))))

(defn setup-resize! []
  (aset js/window
        "onresize"
        (fn [evt]
          (reset! styles
                  (get-reader-styles (.-innerHeight js/window) (.-innerWidth js/window))))))

(defn progress-line [{:keys [progress thick color]}]
  (fn []
    [:div {:style {:width "100%"}}
     [:div {:style {:height thick
                    :width (str @progress "%")
                    :background-color color}}]]))

(defn micon [kw on-click]
  [:div
   {:style {:flex "0 0 30px"}
    :on-click on-click}
   [:i.fa
    {:class (name kw)}]])

(defn readbar [progress toc]
  (let [title (re-frame/subscribe [:title])]
    (fn []
      [:div {:style {:height "50px" :width "100%"}}
       [:div {:style (merge {:height "47px" :width "100%"
                             :text-align "center" :vertical-align "middle"
                             :line-height "47px" :font-weight "bold"
                             :transition "all 0.3s ease"
                             :display "flex"}
                            (if (< @progress 10)
                                {:font-size "1.2em"
                                 :height "40px" :line-height "40px"}
                                {}))}
        [:div {:style {:height "40px"
                       :white-space "nowrap" 
                       :overflow "hidden"
                       :text-overflow "ellipsis"
                       :padding-left "2em" :text-align "left"}} @title]
        [:div {:style {:height "40px" :padding-right "2em" 
                       :flex "1 0 auto" :text-align "right" 
                       :display "flex" :justify-content "flex-end"
                       :min-width "90px"}}
         [micon :fa-home #(re-frame/dispatch [:set-active-panel :home-panel])]
         [micon :fa-list #(swap! toc not)]
         [micon :fa-share #()]]]
        [progress-line {:progress progress :color "blue" :thick "3px"}]])))

(defn read-next []
  [:div {:style {:height (:viewport-height @styles)
                 :border "1px solid black"
                 :color "black"
                 :background-color "white"
                 :text-align "center"
                 :margin-bottom "50px"}}
   [:div {:style {:font-size "1.8em"}} "向下滾動讀下一章"]
   [:div [:i.fa.fa-5x.fa-arrow-down]]
   [:div [:i.fa.fa-5x.fa-arrow-down]]])

(defn text-view [text progress]
  (r/create-class
    {:component-did-mount
      #(let [percent @progress
             dom (r/dom-node %)
             top (* (- (.-scrollHeight dom) (.-clientHeight dom)) (/ percent 100))]
          (if (> percent 0)
            (set! (.-scrollTop dom) top)))
     :display-name "TextView"
     :reagent-render
     (fn []
        [:div.text-view
         {:style (-> @styles :text-view)
          :on-scroll (fn [evt]
                       (let [dom (.-target evt)
                             percent (/ (.-scrollTop dom) (- (.-scrollHeight dom) (.-clientHeight dom)))]
                         (if (>= percent 1)
                             (do (aset dom "scrollTop" 0)
                                 (re-frame/dispatch [:go-next-section]))
                             (re-frame/dispatch [:set-progress (* percent 100)])
                             )))}
         (map-indexed
           (fn [idx item]
             ^{:key idx}
             [:p {:class (str "sec1-l" idx)}
              (str item)])
           (-> @text (clojure.string/split #"\s+")))
         [read-next]])}))

(defn book-list-item [post]
  (fn []
    [:div  
      [:div
        [:div
          {:on-click #(re-frame/dispatch [:resume-post (:id post)])}
          [:img {:src (:cover-image post)
                   :height "240px" :width "600px"}]]
        [:div (:book-name post)]
        [micon :fa-trash #(re-frame/dispatch [:delete-post (:id post)])]]]))

(defn section-list-item [section]
  (fn []
    [:div 
      {:on-click #(re-frame/dispatch [:go-next-section (:idx section)])}
      (take-while #(not (re-find #"[。：「，？]" %)) (clojure.string/split (:text section) #"\s+"))]))
    

(defn list-view [data list-item]
  [:div.list-view
    (map-indexed
      (fn [idx item]
        ^{:key idx}
        [list-item item])
      @data)])
