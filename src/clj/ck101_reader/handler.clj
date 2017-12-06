(ns ck101-reader.handler
  (:require [compojure.core :refer [GET POST defroutes]]
            [compojure.route :refer [resources]]
            [ring.util.response :refer [resource-response]]
            [ring.middleware.reload :refer [wrap-reload]]
            [ring.middleware.defaults :refer [api-defaults wrap-defaults]]
            [ring.middleware.format :refer [wrap-restful-format]]
            [ring.middleware.gzip :refer [wrap-gzip]]
            [ck101-reader.core :as rdr]
            [ck101-reader.extract :as extract]
            [ring.util.response :as response]
            [ring.util.io :as io]
            [epublib-clj.core :as epub]
            [epublib-clj.resource :as eres]
            [org.httpkit.client :as http]
            [clojure.core.async :as async]
            [clojure.xml :as xml]
            [clojure.string :as string])
  (:import [nl.siegmann.epublib.epub EpubWriter]))

(defn wrap-xhtml [body {:keys [lang title css-link]
                        :or {lang "en-US"
                             title "Untitled"
                             css-link nil}}]
  (str
    "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"no\"?>"
    "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">"
    "<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\""
    lang
    "\"><head><title>"
    title
    "</title>"
    (if css-link
      (str
        "<link href=\""
        css-link
        "\" rel=\"stylesheet\" type=\"text/css\"/>")
      "")
    "</head><body>"
    body
    "</body></html>"))

(defn transform-content [text-or-dom]
  (if (map? text-or-dom)
    (let [para (update text-or-dom
                       :content (fn [eles]
                                  (transduce extract/content-xf conj eles)))]
      (with-out-str
        (xml/emit-element para)))
    text-or-dom))

(defn get-first [image]
  (if (coll? image)
    (first image)
    image))

(defn get-epub-response
      [url]
      (let [{:keys [id book-name url cover-image big-cover-image total-page description]}
            (rdr/fetch-post url extract/extract-post-info)
            sections (rdr/fetch-all
                       (map #(extract/get-page-link id %) (range 1 total-page))
                       extract/extract-page-content 100)
            _ (println (get-first big-cover-image))
            data {:meta        {:titles  [book-name]
                                :authors [{:first-name (second (re-find #"作者：\s*([^\s]+)" book-name))
                                           :last-name ""}]}
                  :language "zh-TW"
                  :types ["comedy"]
                  :descriptions [description]
                  :cover-image {:src  (:body @(http/get (or (get-first big-cover-image) (get-first cover-image))
                                                        {:insecure? true
                                                         :as        :byte-array}))
                                :href "cover.png"}
                  :sections    (mapv
                                 (fn [{:keys [idx text]}]
                                   {:title
                                    (if (some #(= :ignore_js_op (:tag %)) (:content text))
                                      "簡介"
                                      (->> (transduce extract/title-xf conj (:content text))
                                        (apply str)
                                        string/trim
                                        extract/remove-tag
                                        extract/remove-return-char))
                                    :href (str "chapt" idx ".html") :type :text
                                    :src (-> text
                                             transform-content
                                             (wrap-xhtml
                                               {:lang "zh-TW"}))})
                                 sections)}]
        (-> data eres/fetch-resources epub/to-book (epub/write (str id ".epub")))
        (-> (response/file-response (str id ".epub"))
            (response/content-type "application/epub+zip"))))


(defroutes routes
  (GET "/post_info" [url]
    {:status 200
     :body (rdr/fetch-post url extract/extract-post-info)})
  (GET "/fetch_post" [id start end]
    {:status 200
     :body {:id (Integer/parseInt id)
            :sections
            (rdr/fetch-all
              (map (partial extract/get-page-link id) (range (Integer/parseInt start) (Integer/parseInt end)))
              extract/extract-page-content 100)}})
  (GET "/epub" [url]
    (get-epub-response url))
  (GET "/fetch_forum" [url]
    {:status 200
     :body (rdr/fetch-post url extract/extract-forum-info)})
  (resources "/"))

(def dev-handler (-> #'routes wrap-reload (wrap-defaults api-defaults) (wrap-restful-format) (wrap-gzip)))

(def handler routes)
