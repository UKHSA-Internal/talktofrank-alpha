module.exports = {
  "globDirectory": "static",
  "globPatterns": [
    "**/*.{ico,woff,woff2,png}",
    "offline/offline.html",
    "ui/css/main.css"
  ],
  "swDest": "static/ui/js/service-worker.js",
  "swSrc": "static/ui/js/sw.js"
};