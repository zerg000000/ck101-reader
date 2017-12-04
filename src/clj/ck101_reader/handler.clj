(ns ck101-reader.handler
  (:require [compojure.core :refer [GET POST defroutes]]
            [compojure.route :refer [resources]]
            [ring.util.response :refer [resource-response]]
            [ring.middleware.reload :refer [wrap-reload]]
            [ring.middleware.defaults :refer [api-defaults wrap-defaults]]
            [ring.middleware.format :refer [wrap-restful-format]]
            [ring.middleware.gzip :refer [wrap-gzip]]
            [ck101-reader.core :as rdr]
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

(defn get-epub-response
      [url]
      (let [{:keys [id book-name url cover-image total-page description]} (rdr/fetch-post url)
            sections (rdr/fetch-all
                       (map #(rdr/get-page-link id %) (range 1 total-page))
                       rdr/extract-page-content 100)
            data {:meta        {:titles  [book-name]
                                :authors [{:first-name "Peter" :last-name "Pan"}]}
                  :cover-image {:src  (:body @(http/get cover-image
                                                        {:insecure? true
                                                         :as        :byte-array}))
                                :href "cover.png"}
                  :sections    (mapv
                                 (fn [{:keys [idx text]}]

                                   {:title
                                    (string/replace
                                      (string/trim
                                        (apply str (map #(cond
                                                           (string? %) %
                                                           (map? %) (with-out-str (xml/emit-element %))
                                                           :default (str %))
                                                        (take-while #(not= :br (:tag %)) (:content text)))))
                                      #"<[^>]*>" "")
                                    :href (str "chapt" idx ".html") :type :text
                                    :src (wrap-xhtml (with-out-str (xml/emit-element text))
                                                     {:lang "zh-TW"})})
                                 sections)}]
        (-> (response/response (io/piped-input-stream
                                 (fn [out]
                                   (let [writer (EpubWriter.)]
                                     (.write writer (-> data eres/fetch-resources epub/to-book)
                                             out)))))
            (response/content-type "application/epub+zip"))))
            ;(response/header "Content-Length" (:size data)))))

(defroutes routes
  (GET "/post_info" [url]
    {:status 200
     :body (rdr/fetch-post url)})
  (GET "/fetch_post" [id start end]
    {:status 200
     :body {:id (Integer/parseInt id)
            :sections
            (rdr/fetch-all
              (map (partial rdr/get-page-link id) (range (Integer/parseInt start) (Integer/parseInt end)))
              rdr/extract-page-content 100)}})
  (GET "/epub" [url]
    (get-epub-response url))
  (GET "/" [] (resource-response "index.html" {:root "public"}))
  (resources "/"))

(def dev-handler (-> #'routes wrap-reload (wrap-defaults api-defaults) (wrap-restful-format) (wrap-gzip)))

(def handler routes)
