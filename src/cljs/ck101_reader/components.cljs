(ns ck101-reader.components
  (:require
    [re-frame.core :as re-frame]
    [reagent.core :as r]
    [re-mdl.core  :as mdl]))

(defn get-reader-styles [viewport-height viewport-width]
  (let [readbar-height 50]
    {:text-view {:height (str (- viewport-height readbar-height) "px")
                 :padding "0px 1.7em"
                 :overflow-y "scroll"}
     :toc {:position "fixed"
           :width "300px"
           :height (str viewport-height "px") 
           :top "0px"
           :transition "left 0.3s ease"
           :background-color "white"
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

(defn get-id-from-link [url]
  (let [[_ post-id] (re-find #"ck101.com/thread-(\d+)-" url)]
    (js/parseInt post-id)))

(defn viewbar [panel-name]
  (let [title (re-frame/subscribe [:title])
        online? (re-frame/subscribe [:online?])]
    (fn []
      [mdl/layout-header
        :children
        [[mdl/layout-header-row
           :children
           [[mdl/layout-title
              :label (case @panel-name
                       :view-panel ""
                       "卡提諾閱讀器")]
            [mdl/layout-spacer]
            (case @panel-name
              :view-panel
              [mdl/layout-nav
                :children
                [(when (not @online?)
                   [:a
                     {:href "/#/"}
                     [:i.material-icons
                       "airplanemode_active"]])
                 [:a
                   {:href "/#/"}
                   [:i.material-icons
                     "home"]]]]
              [mdl/textfield
               :id "get-info"
               :handler-fn      #(do (re-frame/dispatch [:input-url-text %])
                                     (when (get-id-from-link %)
                                       (re-frame/dispatch [:preview-info %])))
               :expandable?     true
               :floating-label? true
               :expand-icon     "search"])]]]])))

(defn text-view [text progress]
  (r/create-class
    {:component-did-mount
      #(let [percent @progress
             dom (r/dom-node %)
             top (* (- (.-scrollHeight dom) (.-clientHeight dom)) (/ percent 100))]
          (if (> percent 0)
            (set! (.-scrollTop dom) top)))
     :component-did-update
      #(let [percent @progress
             dom (r/dom-node %)
             top (* (- (.-scrollHeight dom) (.-clientHeight dom)) (/ percent 100))]
          (set! (.-scrollTop dom) top))
     :display-name "TextView"
     :reagent-render
     (fn []
        [:div.text-view
         {:style (-> @styles :text-view)
          :on-scroll (fn [evt]
                       (let [dom (.-target evt)
                             percent (/ (.-scrollTop dom) (- (.-scrollHeight dom) (.-clientHeight dom)))]
                        (re-frame/dispatch [:set-progress (* percent 100)])))}
         (map-indexed
           (fn [idx item]
             ^{:key idx}
             [:p {:class (str "sec1-l" idx)}
              (str item)])
           (-> @text (clojure.string/split #"\s+")))
         [mdl/button
           :raised? true
           :colored? true
           :ripple-effect? true
           :on-click #(re-frame/dispatch [:go-next-section])
           :child "看下一章"]])}))
