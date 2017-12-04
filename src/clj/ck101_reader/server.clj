(ns ck101-reader.server
  (:require [ck101-reader.handler :refer [dev-handler]]
            [config.core :refer [env]]
            [ring.adapter.jetty :refer [run-jetty]])
  (:gen-class))

(defn -main [& args]
  (let [port (Integer/parseInt (or (env :port) "3000"))]
    (run-jetty dev-handler {:port port :join? false})))
