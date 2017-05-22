(ns ck101-reader.db
  (:require 
    [re-frame.core :as re-frame]
    [cljs.reader :as reader]))

(def default-db
  {:progress 0
   :fetching false
   :posts {}
   :post-progress {}
   :current [-1 -1 -1]
   :url-text ""})

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