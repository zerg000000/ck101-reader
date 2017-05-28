(ns ck101-reader.handler
  (:require [compojure.core :refer [GET POST defroutes]]
            [compojure.route :refer [resources]]
            [ring.util.response :refer [resource-response]]
            [ring.middleware.reload :refer [wrap-reload]]
            [ring.middleware.defaults :refer [api-defaults wrap-defaults]]
            [ring.middleware.format :refer [wrap-restful-format]]
            [ck101-reader.core :as rdr]))

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
  (GET "/" [] (resource-response "index.html" {:root "public"}))
  (resources "/"))

(def dev-handler (-> #'routes wrap-reload (wrap-defaults api-defaults) (wrap-restful-format)))

(def handler routes)
