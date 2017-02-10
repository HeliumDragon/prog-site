module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'src',
  root: 'src/',
  staticFileGlobs: [
    'src/index.html',
    'src/**.js',
    'src/**.css',
    'src/assets/images/**/*.png',
    'src/assets/images/**/*.svg',
    'src/assets/manifests/**.json'
  ],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api.github.com\/users\//,
      handler: 'networkFirst'
    },
    {
      urlPattern: /\/users\//,
      handler: 'fastest',
      options: {
        cache: {
          maxEntries: 10,
          name: 'users-cache'
        }
      }
    }
  ]
};
