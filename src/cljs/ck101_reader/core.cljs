(ns ck101-reader.core
    (:require [reagent.core :as reagent]
              [re-frame.core :as re-frame]
              [ck101-reader.events]
              [ck101-reader.subs]
              [ck101-reader.routes :as routes]
              [ck101-reader.views :as views]
              [ck101-reader.config :as config]))

(defn dev-setup []
  (when config/debug?
    (enable-console-print!)
    (println "dev mode")))

(defn mount-root []
  (re-frame/clear-subscription-cache!)
  (reagent/render [views/main-panel]
                  (.getElementById js/document "app")))

(defn ^:export init []
  (routes/app-routes)
  (re-frame/dispatch-sync [:initialize-db])
  (re-frame/dispatch [:load-user-data])
  (dev-setup)
  (mount-root))
