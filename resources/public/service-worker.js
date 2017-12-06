/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["css/dialog-polyfill.css","984d480ffc2be9e051a23632cf63072f"],["css/material.min.css","0c0ecf74963d2482fdc7e868a5408656"],["index.html","ed17853011a920c6576e547b79945c55"],["js/compiled/app.js","fc7ba52b78e973319d0b1de95fcdb2c3"],["js/compiled/out/ajax/core.js","936a34200cec663022de794f8360daf6"],["js/compiled/out/ajax/protocols.js","019dd02f42f5b7ad9f47bc38fb20b7b3"],["js/compiled/out/ajax/xhrio.js","624bec5704d178258747390f9b5a9068"],["js/compiled/out/ajax/xml_http_request.js","efbb5b5984ce20e40a019dad68bae373"],["js/compiled/out/ck101_reader/browse/events.js","b9259863cfc5b2b4291a21f4059e3d54"],["js/compiled/out/ck101_reader/browse/subs.js","1b4b11ed936fcc5f8f1f58b181dac5fd"],["js/compiled/out/ck101_reader/browse/views.js","5359f8b3b6b0954b9b68372fc39fa893"],["js/compiled/out/ck101_reader/components.js","d5b3de65ab142bd56a17cd43810e90eb"],["js/compiled/out/ck101_reader/config.js","87b22f33df8459f6d1caa9127aebb528"],["js/compiled/out/ck101_reader/core.js","8a0cb264fb286ce628ea3ac6a6afeee4"],["js/compiled/out/ck101_reader/db.js","d5bbe4df74ba896f4f45c151dd650fc5"],["js/compiled/out/ck101_reader/events.js","dd91ce9e0e73c81809b5abbaa482bd16"],["js/compiled/out/ck101_reader/routes.js","8478a832b2904b64f4a4643d72fefc80"],["js/compiled/out/ck101_reader/subs.js","02679330e4947027470bfd5c312f5530"],["js/compiled/out/ck101_reader/views.js","cbae2cd0ef3b8ab1a5ac015b7b9a97b5"],["js/compiled/out/cljs/core.js","7793cde02a42742051614d6ca6d07ac4"],["js/compiled/out/cljs/core/async.js","94e39474a4dc1af62bbb899653249429"],["js/compiled/out/cljs/core/async/impl/buffers.js","4b372b840be69a546e1b1eb0cf6c254c"],["js/compiled/out/cljs/core/async/impl/channels.js","cbbe965d1a208175d4f82d031672b4c0"],["js/compiled/out/cljs/core/async/impl/dispatch.js","aa3311abecf5c84d94ff968e2f018f00"],["js/compiled/out/cljs/core/async/impl/ioc_helpers.js","9165b1b3bd5801cb456f13d8bd7708ff"],["js/compiled/out/cljs/core/async/impl/protocols.js","359726b80ec08896fdff43f59207ec9e"],["js/compiled/out/cljs/core/async/impl/timers.js","23d178d13b03a893e1e6ad808d4f566a"],["js/compiled/out/cljs/pprint.js","f2949f89f84af7c1fddc0ece81cf568c"],["js/compiled/out/cljs/reader.js","8d0b565f1d636010925e0439fd9ade4b"],["js/compiled/out/cljs/repl.js","f419944780388455447f3aa30b29389c"],["js/compiled/out/cljs/spec/alpha.js","c0a668780144a0c3648bff0803c14e1d"],["js/compiled/out/cljs/spec/gen/alpha.js","fcda7e5ad804337b356f1bcb42af9732"],["js/compiled/out/cljs/stacktrace.js","a87857fed4aadf7cb2a520d34cb8336d"],["js/compiled/out/cljs/tools/reader.js","dd06d620c31b52c3462b91d2da6ea734"],["js/compiled/out/cljs/tools/reader/edn.js","690a50cd7476815957fd6250ac8a0895"],["js/compiled/out/cljs/tools/reader/impl/commons.js","7568cdb5728edeecbaf307c6cf9df969"],["js/compiled/out/cljs/tools/reader/impl/errors.js","c28c85824f775a07358414248bb3d7f1"],["js/compiled/out/cljs/tools/reader/impl/inspect.js","bcb0a76fb3724d84664b0b2f5893e840"],["js/compiled/out/cljs/tools/reader/impl/utils.js","226b34733d898370930d8a76d1675014"],["js/compiled/out/cljs/tools/reader/reader_types.js","126b63c11bafedf2c56ea4c72fa904e6"],["js/compiled/out/cljs_deps.js","db2cfe5f67d52c9f080ad89cd33967ff"],["js/compiled/out/cljsjs/create-react-class/development/create-react-class.inc.js","f540b0c0b88706670cd68bddbe2359eb"],["js/compiled/out/cljsjs/dialog-polyfill/development/dialog-polyfill.inc.js","fcb9f75ad8304498fe8ce373f0a63881"],["js/compiled/out/cljsjs/material/development/material.inc.js","60f3ee61721d5bbac709fad9c239f2ac"],["js/compiled/out/cljsjs/react-dom/development/react-dom.inc.js","1546192b8e34aabcd09967fd6d7bc515"],["js/compiled/out/cljsjs/react-with-addons/development/react-with-addons.inc.js","ba4a1af5e39a95b1d44827eed5f3258f"],["js/compiled/out/clojure/data.js","49c7deece4abb14f9cf8211cdbaec317"],["js/compiled/out/clojure/set.js","e332d7d6e6791991cf7d0919b2fab733"],["js/compiled/out/clojure/string.js","389d06d41d8aa2cbc8ae4d398ced5dea"],["js/compiled/out/clojure/walk.js","65244cc369178ede19d1454cb8a0b9bb"],["js/compiled/out/cognitect/transit.js","4662523fa8ece133c0f57da05458af8a"],["js/compiled/out/com/cognitect/transit.js","7ad29af085f0a4859c77f42643c5f9b8"],["js/compiled/out/com/cognitect/transit/caching.js","f6d81ecabefa2176cdaf597ecf74dba7"],["js/compiled/out/com/cognitect/transit/delimiters.js","e20c2ac2e77a6d079221b005fad94258"],["js/compiled/out/com/cognitect/transit/eq.js","9f607c317c32a2217d4e41962b823b1c"],["js/compiled/out/com/cognitect/transit/handlers.js","60ebcc54345cb9c80d83c666515da809"],["js/compiled/out/com/cognitect/transit/impl/decoder.js","cb32ae3bdb7127447aa0ad177ede83d9"],["js/compiled/out/com/cognitect/transit/impl/reader.js","3765cac67d591001f05cb39787e91a22"],["js/compiled/out/com/cognitect/transit/impl/writer.js","f0b70859c58c9f6e987c642bb62244e9"],["js/compiled/out/com/cognitect/transit/types.js","c7cb914f09e69ecdebd5ffd1adac902f"],["js/compiled/out/com/cognitect/transit/util.js","0f135681b8a149deb227d306f257f2e2"],["js/compiled/out/day8/re_frame/http_fx.js","ba1abe7aebe2bc211d31032e3653e151"],["js/compiled/out/devtools/async.js","f538d953e681108975ffa38dae1ab7e8"],["js/compiled/out/devtools/context.js","f448be8bab3d7dcad84e0c30ed14e0d0"],["js/compiled/out/devtools/core.js","e4f2c314e3c4926e54dd7bbeacd3593c"],["js/compiled/out/devtools/defaults.js","e0b9d9d5345351e50c0c5a484542ffe6"],["js/compiled/out/devtools/format.js","2356bcfea03ab2f1d5dc495593debe0b"],["js/compiled/out/devtools/formatters.js","009b62ccdca0ab80bf825266d938b0da"],["js/compiled/out/devtools/formatters/budgeting.js","090995e3a918745bf286058b1e71141a"],["js/compiled/out/devtools/formatters/core.js","013cb1140096e4bab174b23cd883727b"],["js/compiled/out/devtools/formatters/helpers.js","e040f7df9a7f861cf7fd5ade3d18e402"],["js/compiled/out/devtools/formatters/markup.js","bcb84623994533e5188731d20221196c"],["js/compiled/out/devtools/formatters/printing.js","0de9dcef1f322fd1701520a5a5991081"],["js/compiled/out/devtools/formatters/state.js","f0ffe55e31de6273e3edaa83aa6d403a"],["js/compiled/out/devtools/formatters/templating.js","dcd762924d2b25a17dee7030806a5101"],["js/compiled/out/devtools/hints.js","624532c7b648b40cf6aada7b7c662bdb"],["js/compiled/out/devtools/munging.js","919413433c5eb1133d4a6b4f328914d6"],["js/compiled/out/devtools/prefs.js","68ded484e0380d3d5161894574b5c3c3"],["js/compiled/out/devtools/preload.js","edff6a0ac895497c351e1e4c7c0a7c1a"],["js/compiled/out/devtools/protocols.js","3297a8e3cc250059b928db429fa8d6ec"],["js/compiled/out/devtools/reporter.js","147e85701c0e3c1d946357f7acc2f0cb"],["js/compiled/out/devtools/toolbox.js","e7686daf10b57715dfab49d296cc7229"],["js/compiled/out/devtools/util.js","081c6ee9eeaa88f9a62fbe3c8f3e1db7"],["js/compiled/out/devtools/version.js","eff3430618472f7d96e81ad360ca3b2e"],["js/compiled/out/figwheel/client.js","79e1d3001c443f68e956c6c06f2337df"],["js/compiled/out/figwheel/client/file_reloading.js","b1b26ec23dc2758fbbbb0add02ed54a7"],["js/compiled/out/figwheel/client/heads_up.js","38729a117114848f791b3e62f3f026e8"],["js/compiled/out/figwheel/client/socket.js","035d6ba8d9b52fd74175eb3f4141032d"],["js/compiled/out/figwheel/client/utils.js","27914202b1b8e9972ab0172ca283d985"],["js/compiled/out/figwheel/connect/build_dev.js","d4e0f1efd9bf2df9e4290a5607136351"],["js/compiled/out/goog/array/array.js","90fdd85f2efca0d5bc53d31a4f3b5b9f"],["js/compiled/out/goog/asserts/asserts.js","0023709467836f623acd32c8a70df532"],["js/compiled/out/goog/async/freelist.js","cb806f394b3546571cdc8428845ed155"],["js/compiled/out/goog/async/nexttick.js","6955bd98cfb98d804885099258f044a2"],["js/compiled/out/goog/async/run.js","f2a71ebdf49c5e8f025e5ce28082f855"],["js/compiled/out/goog/async/workqueue.js","c506c7dbf692cced8fd11f9e10322299"],["js/compiled/out/goog/base.js","e4baef6434a5b538baeee4f021abb52d"],["js/compiled/out/goog/debug/debug.js","2fe5b71195459519c7e2e2ee2ba55d9a"],["js/compiled/out/goog/debug/entrypointregistry.js","44377b002cfa44343aca7aa4609776eb"],["js/compiled/out/goog/debug/error.js","2d2cb5f45b71d91919134fd4983abe66"],["js/compiled/out/goog/debug/errorcontext.js","5efb85d1ddf5054d9d509c1135847810"],["js/compiled/out/goog/debug/logbuffer.js","7bd690aa133b90fc67ea381a98d56758"],["js/compiled/out/goog/debug/logger.js","c7a911b043d659afe0bd5e97417be928"],["js/compiled/out/goog/debug/logrecord.js","76783ed76d1c2227895fe22a93d7add4"],["js/compiled/out/goog/deps.js","db66faf7428a9fa119338c1d2cf7157c"],["js/compiled/out/goog/disposable/disposable.js","160d30320e29478189937ac663e95fda"],["js/compiled/out/goog/disposable/idisposable.js","babddc465fdb7e7ddcc938768080cb6c"],["js/compiled/out/goog/dom/asserts.js","5406b640ba3c2b6fec71f3fd3b9bcf12"],["js/compiled/out/goog/dom/browserfeature.js","f6cf811d8f685c69ca8ce3958efe3061"],["js/compiled/out/goog/dom/dataset.js","54f74b7edc4c09180c59a7b4b7fe7a2b"],["js/compiled/out/goog/dom/dom.js","1e63cdf30024f4703280e0a6a68a9ce3"],["js/compiled/out/goog/dom/htmlelement.js","9fd0df55a6d53810d90ec146e6a908cc"],["js/compiled/out/goog/dom/inputtype.js","0f43c4b7cf2dc69c1688a6e070e6ce9f"],["js/compiled/out/goog/dom/nodetype.js","45edf36f22af5967295e248f49270c04"],["js/compiled/out/goog/dom/safe.js","c5b3b3d1b2e563eee034b9f527f87d47"],["js/compiled/out/goog/dom/tagname.js","1eb6e8931a21a86fb4b3cd0081ac2bc7"],["js/compiled/out/goog/dom/tags.js","c337b93772c55e244391d8da84c37e20"],["js/compiled/out/goog/events/browserevent.js","2324353eb78351ea20ead1bc0ce93ee0"],["js/compiled/out/goog/events/browserfeature.js","0d0258dda0d147fd02d69225fd6d2d1f"],["js/compiled/out/goog/events/event.js","0e8040c9ac5dc3cae1467f96fd6ec8c1"],["js/compiled/out/goog/events/eventhandler.js","0a88044e744c3c80fddbf59435547b3d"],["js/compiled/out/goog/events/eventid.js","b686ff97d531776a31ad02dd8140803b"],["js/compiled/out/goog/events/events.js","b096dfda5c09c84efcc506cc5315152f"],["js/compiled/out/goog/events/eventtarget.js","e70e0900edf405869c7dea27b883587f"],["js/compiled/out/goog/events/eventtype.js","763fded4843a4431cc89931681287727"],["js/compiled/out/goog/events/listenable.js","076c291fe9317aaacec73811c0fafcae"],["js/compiled/out/goog/events/listener.js","16ffc0b75d665a90b15f4e089b56bcaf"],["js/compiled/out/goog/events/listenermap.js","34254d282bcc25c45a6da0613d984a08"],["js/compiled/out/goog/fs/url.js","57acd2f9bbb6c19918379b125ba4aed4"],["js/compiled/out/goog/functions/functions.js","f5b85afb97b8de6635fcbc93322226a2"],["js/compiled/out/goog/history/event.js","7b82559b72b1cfdfeb8616fb1e472358"],["js/compiled/out/goog/history/eventtype.js","05bb1e19eedaf479efe24b7c8db1351c"],["js/compiled/out/goog/history/history.js","dd4c9bb20d53ec7d3cd046ee6375ceff"],["js/compiled/out/goog/html/legacyconversions.js","8cdc0c96bf35d10640dce583798d5880"],["js/compiled/out/goog/html/safehtml.js","63dcc1ef65bbcd6e231faac8ca7a1db3"],["js/compiled/out/goog/html/safescript.js","6f2994de83451e3fae787905322c88df"],["js/compiled/out/goog/html/safestyle.js","866ffaa69e484110b81879335636bf33"],["js/compiled/out/goog/html/safestylesheet.js","4aeb486aed2a681ed9ab854b1b75cace"],["js/compiled/out/goog/html/safeurl.js","2fff5ea9791c61973336d43bf382b98e"],["js/compiled/out/goog/html/trustedresourceurl.js","c25df36161ac95b39ce132e79235c95a"],["js/compiled/out/goog/html/uncheckedconversions.js","a97209a2302e0236fb1bb0a362724024"],["js/compiled/out/goog/i18n/bidi.js","cfad3f9b84e9f667d6efc27c70718a22"],["js/compiled/out/goog/iter/iter.js","f91dc85dbfa6d99e3e753afd7cdc07b0"],["js/compiled/out/goog/json/hybrid.js","b4d38180fbec6492df9a4b7bccc10f90"],["js/compiled/out/goog/json/json.js","238bce725735591d4113ecb3f7b69e94"],["js/compiled/out/goog/labs/useragent/browser.js","96e44d30b0f1c74d09ad1344bf549c82"],["js/compiled/out/goog/labs/useragent/device.js","b703d29f6fe72f2fcbd0810dae346d29"],["js/compiled/out/goog/labs/useragent/engine.js","83059cb309a761aa13571c20635dde22"],["js/compiled/out/goog/labs/useragent/platform.js","c625fff8b7d9da74919d140db8d41a27"],["js/compiled/out/goog/labs/useragent/util.js","e2eb93d1f10453786d10204461b861a5"],["js/compiled/out/goog/log/log.js","7f160a147acde674088d225914350ad1"],["js/compiled/out/goog/math/coordinate.js","69f853f45f2a9dd3bfa19548cb1405c4"],["js/compiled/out/goog/math/integer.js","73ac793f1303cc20b71a484400ea59ad"],["js/compiled/out/goog/math/long.js","3e39a7c7df5262f56531d2ae552f5398"],["js/compiled/out/goog/math/math.js","16afd30c2f7568382931dc6289ad0c72"],["js/compiled/out/goog/math/size.js","24987625f876914d572b92bbdb0e8d98"],["js/compiled/out/goog/memoize/memoize.js","e4f34ba3ea2045f275d2c7b6b71d2dde"],["js/compiled/out/goog/mochikit/async/deferred.js","616700743efef7fad3965443a835cfb2"],["js/compiled/out/goog/net/errorcode.js","121b2f4c92930d792f997276d8cd5487"],["js/compiled/out/goog/net/eventtype.js","4e26c803c7a760aca6f208ee1601c3ce"],["js/compiled/out/goog/net/httpstatus.js","b1b47ddd88db6dbaa5a82137b807e718"],["js/compiled/out/goog/net/jsloader.js","e59f13ad3ad3d97c67bd807d7d9bd88e"],["js/compiled/out/goog/net/wrapperxmlhttpfactory.js","33aa0a906296ef59fd2fdd91a155feb4"],["js/compiled/out/goog/net/xhrio.js","e7c00c96a9a8b1abb2ca936bd238e0a1"],["js/compiled/out/goog/net/xhriopool.js","31e7db3e002442f91702c8beb8b8f404"],["js/compiled/out/goog/net/xhrlike.js","f6935cdd3ca35d168fdc45ee5435ad40"],["js/compiled/out/goog/net/xhrmanager.js","4d94840dfb65f20f192839a948b18fb6"],["js/compiled/out/goog/net/xmlhttp.js","e724cf4129a6845087b9618cc9d2878e"],["js/compiled/out/goog/net/xmlhttpfactory.js","913c7c89c96c53e450490e9b3f267238"],["js/compiled/out/goog/object/object.js","ca4a86e21bbbc103372a07d0f9ec0509"],["js/compiled/out/goog/promise/promise.js","594b1b7dd09dd58457a6fee32a7f8878"],["js/compiled/out/goog/promise/resolver.js","def3fc8a9d045231a1eeeafcc10ecd2a"],["js/compiled/out/goog/promise/thenable.js","557a451d39a67ce12c053e0abc1e80e8"],["js/compiled/out/goog/reflect/reflect.js","5f2bf76a4129d16327cee779b45a73d4"],["js/compiled/out/goog/string/const.js","5588736efb9d0b9ab448dbbc14f34d2b"],["js/compiled/out/goog/string/string.js","63f51dd1a9c09a61454577b5cd0d3de0"],["js/compiled/out/goog/string/stringbuffer.js","569803d19c7d97cf5f7044900d66be2d"],["js/compiled/out/goog/string/typedstring.js","ed4111bbdf259ea690ebd44b5b413d1d"],["js/compiled/out/goog/structs/collection.js","dff4783b9fcf5c366496bc229ba9a6c2"],["js/compiled/out/goog/structs/heap.js","575e3c415af71338eafff9e2af66f4d8"],["js/compiled/out/goog/structs/map.js","0006b7e5b0d42d0e7715641573d64c76"],["js/compiled/out/goog/structs/node.js","bd5de90d53c188e85f8ba1d8bbd21203"],["js/compiled/out/goog/structs/pool.js","8f26adcb3c0dae31392e675a2025658e"],["js/compiled/out/goog/structs/prioritypool.js","7d2a630008b64c65c01b6a2d5f13a3d2"],["js/compiled/out/goog/structs/priorityqueue.js","d0449a776f09781a6974183c5638e2ac"],["js/compiled/out/goog/structs/queue.js","a4169619cf65ed9d090d221b9c7e38c3"],["js/compiled/out/goog/structs/set.js","44a72d6d6f7f4f5628be63c918a09b39"],["js/compiled/out/goog/structs/structs.js","00a07b2276ff077bf0f0bab56bc82fa3"],["js/compiled/out/goog/timer/timer.js","e4e1b88b36f8d549477c08cc72cedc84"],["js/compiled/out/goog/uri/uri.js","7be84aee68b003d7fb1deb5629a0bf89"],["js/compiled/out/goog/uri/utils.js","3d65f3c17f156e5da272a406f1e09e44"],["js/compiled/out/goog/useragent/product.js","4c6f3413ffa0e61c555dcfbf419147c3"],["js/compiled/out/goog/useragent/useragent.js","c3b60336930ec6b49feb762ea7fec209"],["js/compiled/out/process/env.js","2b45316f51a3f99e74a990d89d65980a"],["js/compiled/out/re_frame/cofx.js","079cdeec26ef84d502d7593c257f67b8"],["js/compiled/out/re_frame/core.js","9c46ce6541e23d694ca0b3f2cbc3c7c6"],["js/compiled/out/re_frame/db.js","978bfff884a714f6b18a948fb9a33127"],["js/compiled/out/re_frame/events.js","f1a303380457a296d6746a569a60d813"],["js/compiled/out/re_frame/fx.js","475d521098796e105ed2035d55c3394b"],["js/compiled/out/re_frame/interceptor.js","60a6d9041eae14a7bc4fb76ff3153d74"],["js/compiled/out/re_frame/interop.js","a0266f0a253030de989d7a2322d19de5"],["js/compiled/out/re_frame/loggers.js","d7292f4a918b808a40cc9d37d3846844"],["js/compiled/out/re_frame/registrar.js","e554ece7b9befd2d139e848cf45c863d"],["js/compiled/out/re_frame/router.js","d57c56ac5b0a28509c42ad472cc31f6b"],["js/compiled/out/re_frame/std_interceptors.js","577923cf7521763bb1a1fac96e71cff4"],["js/compiled/out/re_frame/subs.js","c0810ddd3be20aac13986da89498386c"],["js/compiled/out/re_frame/trace.js","45125d68f379aa5a45b1fb32c01af424"],["js/compiled/out/re_frame/utils.js","cc93ab95a5baba48076c70ad9de0aed8"],["js/compiled/out/re_mdl/components/badge.js","957d8a9f6b541c67bdf70432a95ace0f"],["js/compiled/out/re_mdl/components/button.js","5b938193c618c3f6cefa4590fbaa1062"],["js/compiled/out/re_mdl/components/card.js","2ca101c100e9c57d00b4f5a89eed89cb"],["js/compiled/out/re_mdl/components/chip.js","1155b33364fa60f5f5d69a1ff8ef706c"],["js/compiled/out/re_mdl/components/dialog.js","2f8206e0e1560a6269cc417e2d57442a"],["js/compiled/out/re_mdl/components/grid.js","475733458fd25c4152c8a475c8ccaa03"],["js/compiled/out/re_mdl/components/layout.js","2d9a42e828a899670a150ee3b262b1f6"],["js/compiled/out/re_mdl/components/list.js","2fefb209594be1fed2d74ae17a30130d"],["js/compiled/out/re_mdl/components/loading.js","f3646270ac23725f45653fc5afcebd6f"],["js/compiled/out/re_mdl/components/menu.js","9f4bee737f787eca53fe8bad447ce5cc"],["js/compiled/out/re_mdl/components/slider.js","e96949bd188b10d1e5d5fbefaddb6344"],["js/compiled/out/re_mdl/components/snackbar.js","b035c36b8fd0a60be04bd29d49942021"],["js/compiled/out/re_mdl/components/table.js","fc9dd022a76d0f50d2ca0e7be43114b0"],["js/compiled/out/re_mdl/components/textfield.js","d861b9d688805cf1319f867d6f33bd6a"],["js/compiled/out/re_mdl/components/toggle.js","7dce2605c7bba23449328e962839a71d"],["js/compiled/out/re_mdl/components/tooltip.js","5b1b2c667ebf191587becaa3fea3280a"],["js/compiled/out/re_mdl/core.js","8175621925f426b5b92736bff881a52b"],["js/compiled/out/re_mdl/util.js","6ca09c7f6acb4b258c41a19982c727eb"],["js/compiled/out/reagent/core.js","53851df10e9a0456bbb538e54cf73f7b"],["js/compiled/out/reagent/debug.js","563d476bcad7c6e22b017a01f7af0ea4"],["js/compiled/out/reagent/dom.js","781da00a3e66fed0c69f58a23e537d65"],["js/compiled/out/reagent/impl/batching.js","53112ec9af1ea01ff91831ca1da7dab0"],["js/compiled/out/reagent/impl/component.js","e5c5ebf7e4dd9b0458bbecff2c2cf535"],["js/compiled/out/reagent/impl/template.js","cff887920dae099d578e9c11fb72a85d"],["js/compiled/out/reagent/impl/util.js","003ca4e0bc9f9cf069cd8c94aef44f28"],["js/compiled/out/reagent/interop.js","5689cf975103071db3fd1f0602589ba6"],["js/compiled/out/reagent/ratom.js","2a258bc1ae4898be66eb2709ef8affd5"],["js/compiled/out/secretary/core.js","9207eec8ed42f1661a5fc5460e8dab27"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/fetch_posts.*/, toolbox.networkFirst, {});
toolbox.router.get(/fetch_forum.*/, toolbox.networkFirst, {});
toolbox.router.get(/epub.*/, toolbox.networkFirst, {});
toolbox.router.get(/post_info.*/, toolbox.networkFirst, {});




