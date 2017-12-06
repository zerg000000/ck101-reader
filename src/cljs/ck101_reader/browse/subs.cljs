(ns ck101-reader.browse.subs
    (:require-macros [reagent.ratom :refer [reaction]])
    (:require [re-frame.core :as re-frame]))

(re-frame/reg-sub
 :browse-items
 (fn [db]
   (:browse-items db)))

(re-frame/reg-sub
  :forum-url
  (fn [db]
    (:forum-url db)))
