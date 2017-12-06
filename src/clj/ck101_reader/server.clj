(ns ck101-reader.server
  (:require [ck101-reader.handler :refer [dev-handler]]
            [config.core :refer [env]]
            [ring.adapter.jetty :refer [run-jetty]]
            [clojure.java.io :as io])
  (:gen-class))

(defn cleanup-dir! []
  (let [epub-temp (.getPathMatcher
                    (java.nio.file.FileSystems/getDefault)
                    "glob:*.{epub}")]
    (->> "."
         io/file
         file-seq
         (filter #(.isFile %))
         (filter #(.matches epub-temp (.getFileName (.toPath %))))
         (mapv #(.delete %)))))


(defn -main [& args]
  (let [port (Integer/parseInt (or (env :port) "3000"))]
    (cleanup-dir!)
    (run-jetty dev-handler {:port port :join? false})))
