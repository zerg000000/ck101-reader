(defproject ck101-reader "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.9.0-RC2"]
                 [org.clojure/clojurescript "1.9.946"]
                 [reagent "0.7.0" :exclusions [cljsjs/react]]
                 [cljsjs/react-with-addons "15.6.1-0"]
                 [re-frame "0.10.2"]
                 [secretary "1.2.3"]
                 [day8.re-frame/http-fx "0.1.4"]
                 [com.yetanalytics/re-mdl "0.1.8" :exclusions [cljsjs/react-with-addons]]
                 [ns-tracker "0.3.1"]
                 [compojure "1.6.0"]
                 [yogthos/config "0.9"]
                 [ring "1.6.3"]
                 [ring/ring-defaults "0.3.1"]
                 [ring-middleware-format "0.7.2"]
                 [bk/ring-gzip "0.2.1"]
                 [reaver "0.1.2"]
                 [http-kit "2.3.0-alpha2"]
                 [org.clojure/core.async "0.3.465"]
                 [epublib-clj "0.1.0-SNAPSHOT"]]

  :plugins [[lein-cljsbuild "1.1.7"]]

  :min-lein-version "2.5.3"

  :source-paths ["src/clj"]

  :jvm-opts ["-Dclojure.compiler.elide-meta=[:doc :file :line :added]"
             "-Dclojure.compiler.direct-linking=true"]

  :clean-targets ^{:protect false} ["resources/public/js/compiled" "target"
                                    "test/js"]

  :figwheel {:css-dirs ["resources/public/css"]
             :ring-handler ck101-reader.handler/dev-handler}

  :repl-options {:nrepl-middleware [cemerick.piggieback/wrap-cljs-repl]}

  :profiles
  {:dev
   {:dependencies [[binaryage/devtools "0.9.8"]
                   [figwheel-sidecar "0.5.14"]
                   [com.cemerick/piggieback "0.2.2"]]

    :plugins      [[lein-figwheel "0.5.14"]
                   [lein-doo "0.1.7"]]}}


  :cljsbuild
  {:builds
   [{:id           "dev"
     :source-paths ["src/cljs"]
     :figwheel     {:on-jsload "ck101-reader.core/mount-root"}
     :compiler     {:main                 ck101-reader.core
                    :output-to            "resources/public/js/compiled/app.js"
                    :output-dir           "resources/public/js/compiled/out"
                    :asset-path           "js/compiled/out"
                    :source-map-timestamp true
                    :preloads             [devtools.preload]
                    :external-config      {:devtools/config {:features-to-install :all}}}}

    {:id           "min"
     :source-paths ["src/cljs"]
     :jar true
     :compiler     {:main            ck101-reader.core
                    :output-to       "resources/public/js/compiled/app.js"
                    :optimizations   :advanced
                    :closure-defines {goog.DEBUG false}
                    :pretty-print    false}}

    {:id           "test"
     :source-paths ["src/cljs" "test/cljs"]
     :compiler     {:main          ck101-reader.runner
                    :output-to     "resources/public/js/compiled/test.js"
                    :output-dir    "resources/public/js/compiled/test/out"
                    :optimizations :none}}]}


  :main ck101-reader.server

  :aot [ck101-reader.server]

  :uberjar-name "ck101-reader.jar"

  :prep-tasks [["cljsbuild" "once" "min"] "compile"])

