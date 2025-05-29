module.exports = {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{html,js,css,png,ico,json,svg}'
  ],
  swDest: 'dist/sw.js',
  clientsClaim: true,
  skipWaiting: true,
};
