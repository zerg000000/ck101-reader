module.exports = {
  staticFileGlobs: [
    'resources/public/css/**.css',
    'resources/public/**.html',
    'resources/public/images/**.*',
    'resources/public/fonts/**.*',
    'resources/public/js/**/**.js'
  ],
  stripPrefix: 'resources/public/',
  runtimeCaching: [{
    urlPattern: /fetch_posts.*/,
    handler: 'networkFirst'
  }]
};
