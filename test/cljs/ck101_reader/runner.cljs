(ns ck101-reader.runner
    (:require [doo.runner :refer-macros [doo-tests]]
              [ck101-reader.core-test]))

(doo-tests 'ck101-reader.core-test)
