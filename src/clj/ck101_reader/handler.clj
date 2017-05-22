(ns ck101-reader.handler
  (:require [compojure.core :refer [GET POST defroutes]]
            [compojure.route :refer [resources]]
            [ring.util.response :refer [resource-response]]
            [ring.middleware.reload :refer [wrap-reload]]
            [ring.middleware.defaults :refer [api-defaults wrap-defaults]]
            [ring.middleware.format :refer [wrap-restful-format]]
            [ck101-reader.core :as rdr]))

(defroutes routes
  (GET "/fetch_post" [url]
        (let [post-info (rdr/fetch-post url)]
          {:status 200
           :body
          (assoc post-info
                 :sections
            (rdr/fetch-all
              (map (partial rdr/get-page-link (:id post-info)) (range (:total-page post-info)))
              rdr/extract-page-content 100))}))
  (GET "/" [] (resource-response "index.html" {:root "public"}))
  (resources "/"))

(def dev-handler (-> #'routes wrap-reload (wrap-defaults api-defaults) (wrap-restful-format)))

(def handler routes)
