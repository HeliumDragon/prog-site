module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css'
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
