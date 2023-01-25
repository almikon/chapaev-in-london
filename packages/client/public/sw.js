const CACHE_NAME = 'chapaev-in-london';

const URLS = [
	'/',
	'/sign-up',
	'/leaderboard',
	'/forum',
	'/sign-in',
	'/settings',
	'/profile'
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				console.log('Opened cache');
				return cache.addAll(URLS);
			})
			.catch(err => {
				console.log(err);
				throw err;
			})
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames
					.filter(name => {
						return true;
					})
					.map(name => caches.delete(name))
			);
		})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
			.then(response => {
				if (response) {
					return response;
				}

				const fetchRequest = event.request.clone();

				return fetch(fetchRequest)

					.then(response => {

						if (!response || response.status !== 200) {
							return response;
						}

						const responseToCache = response.clone();

						caches.open(CACHE_NAME)
							.then(cache => {
								if (!(event.request.url.indexOf('http') === 0)) {
									return;
								}
								cache.put(event.request, responseToCache);
							});

						return response;
					}
					);
			})
	);
});