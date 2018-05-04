module.exports = {
  stripPrefix: 'build/',
  staticFileGlobs: ['build/*.html', 'build/manifest.json', 'build/static/**/!(*map*)'],
  runtimeCaching: [
    {
      urlPattern: /https:\/\/githop-backend.firebaseio.com\/resume\.json/,
      handler: 'networkFirst',
    },
  ],
  swFilePath: 'build/service-worker.js',
  dontCacheBustUrlsMatching: /\.\w{8}\./,
};
