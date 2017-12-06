(ns ck101-reader.extract
  (:require [reaver :refer [parse extract extract-from chain text attr edn data jsoup]]
            [clojure.string :as string]
            [clojure.xml :as xml])
  (:import [org.jsoup.nodes Entities$EscapeMode]
           [java.lang Math]))

(defn parse-int [s]
  (Integer/parseInt s))

(defn get-total-page [txt]
  (let [total-section (Integer/parseInt txt)
        page-count (Math/ceil (/ total-section 10.0))]
    (if (< 1 page-count)
      page-count
      2)))


(defn get-page-link [post-id page]
  (str "https://ck101.com/thread-" post-id "-" page "-1.html"))

(defn get-id-from-link [url]
  (let [[_ post-id] (re-find #"thread-(\d+)-" url)]
    (parse-int post-id)))

(defn extract-post-info [raw-text url]
  (assoc
    (extract (parse raw-text)
             [:book-name :url :cover-image :big-cover-image :total-section :total-page :description]
             "#thread_subject" text
             "meta[property=og:url]" (attr "content")
             "meta[property=og:image]" (attr "content")
             ".mbn img" (attr "file")
             ".replayNum" text
             ".replayNum" (chain text get-total-page)
             "meta[property=og:description]" (attr "content"))
    :id (get-id-from-link url)))

(defn extract-page-content [result]
  (if-let [html (parse (-> result :body))]
    (let [posts (extract-from
                  html ".plhin"
                  [:idx :text]
                  "li.postNum em" (chain text parse-int)
                  ".t_f" edn)]
      posts)
    []))

(def remove-cover-post
  (filter #(not= :ignore_js_op (:tag %))))

(def remove-update-status
  (filter #(not= :pstatus (get-in % [:attrs :class]))))

(def remove-tag
  #(string/replace % #"<[^>]*>" ""))

(def remove-return-char
  #(string/replace % #"[\r\n]+" " "))

(def title-xf
  (comp
    (drop-while ; drop <i>, <br>, <ignore_js_op> spaces after <i>
      #(or (#{:br :i :ignore_js_op} (:tag %))
           (and (string? %) (re-find #"^\s+$" %))))
    (take-while #(not= :br (:tag %)))
    (map #(cond
            (string? %) %
            (map? %) (with-out-str (xml/emit-element %))
            :default (str %)))))

(def content-xf
  (comp
    remove-update-status
    remove-cover-post))

;; browse forum

(defn get-forum-id-from-link [url]
  (let [[_ post-id] (re-find #"forum-(\d+)-" url)]
    (parse-int post-id)))

(defn extract-forum-info [raw-text url]
  (let [html (parse raw-text)]
    (assoc
     (extract html
       [:previous :next]
       "#pgt a.prev" (attr "href")
       "#pgt a.nxt" (attr "href"))
     :posts
     (extract-from html
       "#threadlisttableid .threadrow"
       [:title :url :cover-image :last-post-time]
       ".blockTitle" text
       ".blockTitle a" (chain (attr "href") second)
       ".l_bPic.lzimg" (attr "src")
       ".lastpost_time" text))))
