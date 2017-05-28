(ns ck101-reader.core
  (:require
    [org.httpkit.client :as http]
    [clojure.core.async :as async]
    [reaver :refer [parse extract extract-from chain text attr]]))

(defn parse-int [s]
  (Integer/parseInt s))

(defn get-total-page [txt]
  (let [total-section (Integer/parseInt txt)]
    (java.lang.Math/ceil (/ total-section 10.0))))

(defn get-page-link [post-id page]
  (str "https://ck101.com/thread-" post-id "-" page "-1.html"))

(defn get-id-from-link [url]
  (let [[_ post-id] (re-find #"thread-(\d+)-" url)]
    (parse-int post-id)))

(defn extract-post-info [raw-text url]
  (assoc
      (extract (parse raw-text)
               [:book-name :url :cover-image :total-section :total-page]
               "#thread_subject" text
               "meta[property=og:url]" (attr "content")
               "meta[property=og:image]" (attr "content")
               ".replayNum" text
               ".replayNum" (chain text get-total-page))
      :id (get-id-from-link url)))

(defn fetch-post [url]
  (extract-post-info (:body @(http/get url)) url))
  

(defn extract-page-content [result]
  (if-let [html (parse (-> result :body))]
    (let [posts (extract-from
                  html ".plhin"
                  [:idx :text]
                  "li.postNum em" (chain text parse-int)
                  ".t_f" text)]
      posts)
    []))

(defn fetch-all-sync [link-seq transform-fn ajax-interval]
  (into []
    (for [link link-seq]
      (transform-fn @(http/get link)))))

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
        (loop [i 0 ret []]
          (if (>= i number-of-calls)
              (sort-by :idx (distinct ret))
              (recur (inc i) (into ret (async/<! ajax-ch)))))))))