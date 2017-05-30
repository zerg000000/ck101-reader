(defproject ck101-reader "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.9.0-alpha16"]
                 [org.clojure/clojurescript "1.9.542"]
                 [reagent "0.6.2" :exclusions [cljsjs/react]]
                 [cljsjs/react-with-addons "15.4.2-2"]
                 [re-frame "0.9.2"]
                 [re-frisk "0.3.2"]
                 [secretary "1.2.3"]
                 [day8.re-frame/http-fx "0.1.3"]
                 [com.yetanalytics/re-mdl "0.1.6" :exclusions [cljsjs/react-with-addons]]
                 [ns-tracker "0.3.0"]
                 [compojure "1.5.0"]
                 [yogthos/config "0.8"]
                 [ring "1.4.0"]
                 [ring/ring-defaults "0.3.0"]
                 [ring-middleware-format "0.7.2"]
                 [reaver "0.1.2"]
                 [http-kit "2.3.0-alpha2"]
                 [org.clojure/core.async "0.3.442"]]

  :plugins [[lein-cljsbuild "1.1.6"]]

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
   {:dependencies [[binaryage/devtools "0.8.2"]
                   [figwheel-sidecar "0.5.9"]
                   [com.cemerick/piggieback "0.2.1"]]

    :plugins      [[lein-figwheel "0.5.9"]
                   [lein-doo "0.1.7"]]
    }}

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
                    :external-config      {:devtools/config {:features-to-install :all}}
                    }}
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
                    :optimizations :none}}
    ]}

  :main ck101-reader.server

  :aot [ck101-reader.server]

  :uberjar-name "ck101-reader.jar"

  :prep-tasks [["cljsbuild" "once" "min"] "compile"]
  )
