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
  workbox.precaching.precacheAndRoute([
  {
    "url": "ui/favicon.ico",
    "revision": "69b83740d3321debb6938468fbbcf55d"
  },
  {
    "url": "ui/font/roboto-bolditalic-webfont.woff",
    "revision": "b9bf5a7f9c43423ca0ea2ff65e99fa22"
  },
  {
    "url": "ui/font/roboto-bolditalic-webfont.woff2",
    "revision": "0396609f0d7e5df73411fc22b5c96f3a"
  },
  {
    "url": "ui/font/roboto-medium-webfont.woff",
    "revision": "aa8eaad36d80b75e102bb56e9cc30a08"
  },
  {
    "url": "ui/font/roboto-medium-webfont.woff2",
    "revision": "32e06bfc3516aad49017a9ccc45f2aa2"
  },
  {
    "url": "ui/font/roboto-regular-webfont.woff",
    "revision": "36f62dedc1d7e15a3338c045119376d2"
  },
  {
    "url": "ui/font/roboto-regular-webfont.woff2",
    "revision": "4bde759fe5d8524e1fdf52c3f66f1066"
  },
  {
    "url": "ui/img/bg-homepage-desktop.png",
    "revision": "e3b66870c06d383c018babebf92b01e5"
  },
  {
    "url": "ui/img/bg-homepage-mobile.png",
    "revision": "4dfe2d1718be3020521ad3118cd02ece"
  },
  {
    "url": "offline/offline.html",
    "revision": "deade7226ca4ecac61f4c9bac0ee5ef1"
  },
  {
    "url": "ui/css/main.css",
    "revision": "a48e884213dab98f610f67f5b5923d38"
  }
])

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