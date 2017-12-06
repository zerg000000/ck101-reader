(ns ck101-reader.routes
    (:require-macros [secretary.core :refer [defroute]])
    (:import goog.History)
    (:require [secretary.core :as secretary]
              [goog.events :as events]
              [goog.history.EventType :as EventType]
              [re-frame.core :as re-frame]))

(defn hook-browser-navigation! []
  (doto (History.)
    (events/listen
     EventType/NAVIGATE
     (fn [event]
       (secretary/dispatch! (.-token event))))
    (.setEnabled true)))

(defn app-routes []
  (secretary/set-config! :prefix "#")
  ;; --------------------
  ;; define routes here
  (defroute "/" []
    (re-frame/dispatch [:set-active-panel :browse-panel]))

  (defroute "/view/:post/delete" [post]
    (re-frame/dispatch [:delete-post (js/parseInt post)]))

  (defroute "/view/:post/:section" [post section]
    (re-frame/dispatch [:go-next-section (js/parseInt section)]))

  (defroute "/view/:post" [post]
    (re-frame/dispatch [:resume-post (js/parseInt post)]))


  ;; --------------------
  (hook-browser-navigation!))
