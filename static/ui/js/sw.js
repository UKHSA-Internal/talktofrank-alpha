importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js')

if (workbox) {
  workbox.setConfig({
    debug: false
  })
  // Custom tracking for GA see
  // https://developers.google.com/web/tools/workbox/modules/workbox-google-analytics
  workbox.googleAnalytics.initialize({
    parameterOverrides: {
      dimension1: 'offline',
    },
    hitFilter: (params) => {
      const queueTimeInSeconds = Math.round(params.get('qt') / 1000)
      params.set('metric1', queueTimeInSeconds)
    },
  })
  workbox.skipWaiting()
  workbox.clientsClaim()
  workbox.precaching.precacheAndRoute([])

  // Using network first for development, cache will then be used
  // for offline connections
  workbox.routing.registerRoute(
    /\.(?:ico|woff|woff2|png|svg|css)$/,
    workbox.strategies.networkFirst()
  )

  workbox.routing.registerRoute(
    ({event}) => event.request.mode === 'navigate',
    ({url}) => fetch(url.href)
      .catch(() => caches.match('/offline/offline.html'))
  )
}