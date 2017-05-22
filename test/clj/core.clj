(ns ck101-reader.core
  (:require [cljs.test :refer :all]
            [ck101-reader.core :as core]))

(deftest fake-test
  (testing "test extract post info"
    (is (= {} (core/extract-post-info (slurp "testResources/test1.html"))))))