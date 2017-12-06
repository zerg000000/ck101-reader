(ns ck101-reader.db
  (:require
    [re-frame.core :as re-frame]
    [cljs.reader :as reader]))

(set! *warn-on-infer* true)

(def default-db
  {:progress 0
   :fetching false
   :posts {}
   :post-progress {}
   :current [1 1 1]
   :url-text ""
   :forum-url "https://ck101.com/forum-3419-1.html"
   :forum-menu [{:name "長篇小說" :id "237"}
                {:name "日系小說" :id "1288"}
                {:name "短篇小說" :id "855"}
                {:name "全篇小說" :id "3419"}
                {:name "耽美小說" :id "3446"}
                {:name "原創言情" :id "3451"}
                {:name "原創全本" :id "3474"}
                {:name "出版言情" :id "1308"}]})

;; -- Local Storage  ----------------------------------------------------------
;;
;; Part of the todomvc challenge is to store todos in LocalStorage, and
;; on app startup, reload the todos from when the program was last run.
;; But the challenge stipulates to NOT  load the setting for the "showing"
;; filter. Just the todos.
;;

(defn items->local-store
  "Puts items into localStorage"
  [kw db]
  (.setItem js/localStorage (name kw) (str (get-in db [kw]))))     ;; sorted-map writen as an EDN map


;; register a coeffect handler which will load a value from localstore
;; To see it used look in events.clj at the event handler for `:initialise-db`
(re-frame/reg-cofx
  :local-store
  (fn [cofx ls-key]
      "Read in keys from localstore, and process into a map we can merge into app-db."
      (update-in
        cofx
        [:local-store]
        merge
        {ls-key (some->> (.getItem js/localStorage (name ls-key))
                         (reader/read-string))})))
