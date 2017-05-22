(ns ck101-reader.subs
    (:require-macros [reagent.ratom :refer [reaction]])
    (:require [re-frame.core :as re-frame]))

(re-frame/reg-sub
 :name
 (fn [db]
   (:name db)))

(re-frame/reg-sub
 :active-panel
 (fn [db _]
   (:active-panel db)))

(re-frame/reg-sub
  :progress
  (fn [db _]
    (get-in db [:current 2])))

(re-frame/reg-sub
  :title
  (fn [db _]
    (let [[post-id idx] (:current db)]
      (get-in db [:posts post-id :book-name]))))

(re-frame/reg-sub
  :current-text
  (fn [db _]
    (let [[post-id idx] (:current db)]
      (get-in db [:posts post-id :sections idx :text]))))

(re-frame/reg-sub
  :current-sections
  (fn [db _]
    (let [[post-id _] (:current db)]
      (get-in db [:posts post-id :sections]))))

(re-frame/reg-sub
  :next-section
  (fn [db _]
    (let [[post-id idx] (:current db)]
      (get-in db [:posts post-id :sections (inc idx)]))))

(re-frame/reg-sub
  :fetching
  (fn [db _]
    (get-in db [:fetching])))

(re-frame/reg-sub
  :posts
  (fn [db _]
    (vals (get-in db [:posts]))))

(re-frame/reg-sub
  :url-text
  (fn [db _]
    (get-in db [:url-text])))
