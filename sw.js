let coreAssets = [
  '/css/baseCss.css',
  '/js/form.js',
  '/js/transitionDetect.js',
  "/images/books-icon.png",
  "/images/café.png",
  "/images/chatPage.png",
  "/images/Code-Icon-1.jpg",
  "/images/email-icon.png",
  "/images/frontend.png",
  "/images/github-logo.png",
  "/images/linkedin-logo.svg",
  "/images/Logo-Backing.png",
  "/images/Logo-White.png",
  "/images/Logo.png",
  "/images/Project1.png",
  "/index.html",
  "/pages/contact.html",
  "/pages/experience.html",
  "/pages/projects.html",
  "/pages/thanks.html"
];

//Install cached assets
self.addEventListener('install', function (event) {

// Cache core assets
event.waitUntil(caches.open('app').then(function (cache) {
  for (let asset of coreAssets) {
    cache.add(new Request(asset));
  }
  return cache;
}));

});

//Listen for cached items fetch requests
self.addEventListener('fetch', function (event) {

// retrieve the request
let request = event.request;

if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

// Network-first function
if (request.headers.get('Accept').includes('text/html')) {
  event.respondWith(
    fetch(request).then(function (response) {

      
      let copy = response.clone();
      event.waitUntil(caches.open('app').then(function (cache) {
        return cache.put(request, copy);
      }));

      
      return response;

    }).catch(function (error) {

      // If there's no item in cache, respond with a fallback
      return caches.match(request).then(function (response) {
        return response || caches.match('/offline.html');
      });

    })
  );
}

// CSS & JavaScript
// Offline-first
if (request.headers.get('Accept').includes('text/css') || request.headers.get('Accept').includes('text/javascript')) {
  event.respondWith(
    caches.match(request).then(function (response) {
      return response || fetch(request).then(function (response) {

        // Return the response
        return response;

      });
    })
  );
  return;
}

// Images
// Offline-first
if (request.headers.get('Accept').includes('image')) {
  event.respondWith(
    caches.match(request).then(function (response) {
      return response || fetch(request).then(function (response) {

        // Save a copy of it in cache
        let copy = response.clone();
        event.waitUntil(caches.open('app').then(function (cache) {
          return cache.put(request, copy);
        }));

        // Return the response
        return response;

      });
    })
  );
}

  if (request.headers.get('Accept').includes('text/html')) {
  event.respondWith(
    caches.match(request).then(function (response) {
      return response || fetch(request).then(function (response) {

        // Save a copy of it in cache
        let copy = response.clone();
        event.waitUntil(caches.open('app').then(function (cache) {
          return cache.put(request, copy);
        }));

        // Return the response
        return response;

      });
    })
  );
}

});