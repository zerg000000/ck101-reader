(ns ck101-reader.core-test
  (:require [cljs.test :refer-macros [deftest testing is]]
            [ck101-reader.core :as core]))

(deftest fake-test
  (testing "fake description"
    (is (= 1 2))))
