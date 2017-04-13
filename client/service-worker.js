let name = 'book-market-cache'
let files = [
  './',
  './index.html',
  './style.css',
  './main.js'
]

self.addEventListener('install', event => {
  let cacheFiles = () => caches
    .open(name)
    .then(cache => cache.addAll(files))
    .catch(error => console.error(error))

  event.waitUntil(cacheFiles())
})

self.addEventListener('activate', event => {
  let cacheDeleteUnused = () => caches
    .keys()
    .then(list => Promise.all(list.map(key => {
      if (key !== name)
        return caches.delete(key)
      })))
    .catch(error => console.error(error))

  event.waitUntil(cacheDeleteUnused())

  return self.clients.claim()
})

self.addEventListener('fetch', event => {
  let cacheFetch = () => caches
    .match(event.request)
    .then(response => response || fetch(event.request))
    .catch(error => console.error(error))

  event.respondWith(cacheFetch())
})
