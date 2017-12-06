(ns ck101-reader.core
  (:require
    [org.httpkit.client :as http]
    [clojure.core.async :as async]))

(defn fetch-post [url transform-fn]
  (let [resp @(http/get url)]
    (transform-fn (:body resp) url)))

(defn fetch-all
  " link-seq - url need to fetch in string format
    transform-fn - transform the html to list of data item
    ajax-interval - the time between each ajax call in ms, for preventing 429
  "
  [link-seq tranform-fn ajax-interval]
  (let [number-of-calls (count link-seq)
         ajax-ch (async/chan number-of-calls (map tranform-fn))]
    (doseq [link link-seq]
      (Thread/sleep (or ajax-interval 200))
      (http/get link #(async/go (async/>! ajax-ch %))))
    (async/<!!
      (async/go
        (loop [i 0 ret (transient [])]
          (if (>= i number-of-calls)
              (do
                (async/close! ajax-ch)
                (->> ret
                     persistent!
                     flatten
                     distinct
                     (sort-by :idx)))
              (recur (inc i) (conj! ret (async/<! ajax-ch)))))))))
