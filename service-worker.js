/**
 * service-worker.js - Service Worker for PWA Offline Support
 * Handles caching and offline functionality
 * IMPORTANT: Firebase and external APIs are NOT cached (always fresh)
 */

const CACHE_NAME = 'teaching-progress-v19';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/js/ui.js',
    '/js/db.js',
    '/js/security.js',
    '/js/firebase-config.js',
    '/manifest.json'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching app shell');
                return cache.addAll(URLS_TO_CACHE);
            })
            .catch((error) => {
                console.error('[Service Worker] Cache error during install:', error);
            })
    );
    
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[Service Worker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
    
    // Take control of all pages
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // CRITICAL: Allow Firebase and external APIs to always use network
    // Firebase Cloud Firestore MUST use network for real-time sync
    // Do NOT cache Firebase requests
    const isFirebaseRequest = url.hostname.includes('firebasejs') || 
                              url.hostname.includes('firebaseapp.com') ||
                              url.hostname.includes('firestore.googleapis.com');
    
    if (isFirebaseRequest) {
        console.log('[Service Worker] Allowing network access for Firebase:', request.url);
        event.respondWith(
            fetch(request)
                .catch((error) => {
                    console.error('[Service Worker] Firebase fetch failed:', error);
                    // Return error response - app handles Firebase unavailability
                    return new Response(
                        JSON.stringify({ error: 'Firebase unavailable - working offline' }),
                        {
                            status: 0,
                            statusText: 'Offline',
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            })
                        }
                    );
                })
        );
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((response) => {
                // Return cached response if available (for local assets only)
                if (response) {
                    console.log('[Service Worker] Served from cache:', request.url);
                    return response;
                }
                
                // For external non-Firebase requests, try network first
                return fetch(request)
                    .then((networkResponse) => {
                        // Don't cache if not a success response
                        if (!networkResponse || networkResponse.status !== 200) {
                            return networkResponse;
                        }
                        
                        // Clone the response
                        const responseToCache = networkResponse.clone();
                        
                        // Cache the new response (for future offline use)
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(request, responseToCache);
                            })
                            .catch((error) => {
                                console.error('[Service Worker] Error caching response:', error);
                            });
                        
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('[Service Worker] Fetch error:', error);
                        
                        // Try to serve from cache as fallback
                        return caches.match(request)
                            .then((cachedResponse) => {
                                if (cachedResponse) {
                                    console.log('[Service Worker] Serving cached fallback:', request.url);
                                    return cachedResponse;
                                }
                                
                                // No cache available
                                return new Response(
                                    'Offline - Resource not available',
                                    {
                                        status: 503,
                                        statusText: 'Service Unavailable',
                                        headers: new Headers({
                                            'Content-Type': 'text/plain'
                                        })
                                    }
                                );
                            });
                    });
            })
    );
});

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
    console.log('[Service Worker] Message received:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('[Service Worker] Loaded - Firebase requests bypass cache for real-time sync');
