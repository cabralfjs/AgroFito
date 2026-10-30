// Sobe este número sempre que alterares xlsx.full.min.js ou os ícones
// (esses ficheiros são servidos "cache primeiro" e só mudam com a versão).
const CACHE_NAME = 'agrofito-v4';

// Só ficheiros verdadeiramente estáticos ficam em cache-primeiro.
const CORE_ASSETS = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './xlsx.full.min.js'
];

// Páginas da própria app: rede primeiro (o site muda com frequência); a
// cópia em cache só serve de reserva quando não há ligação.
const NETWORK_FIRST_PAGES = [
  './',
  './index.html',
  './usos.html',
  './produtos.html',
  './lmr.html',
  './tecnicas.html',
  './quantidade.html',
  './volume-calda.html'
];

const toPath = (a) => new URL(a, self.registration.scope).pathname;
const CORE_PATHS = new Set(CORE_ASSETS.map(toPath));
const PAGE_PATHS = new Set(NETWORK_FIRST_PAGES.map(toPath));

self.addEventListener('install', (event) => {
  // allSettled: um ficheiro em falta (ex.: um ícone) não impede os restantes.
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(CORE_ASSETS.map((a) => cache.add(a)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Só guarda respostas normais (200) da própria origem: nunca erros 404/500,
// respostas parciais nem respostas de outros sites.
function guardar(request, response) {
  if (response && response.ok && response.status === 200 && response.type === 'basic') {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
  }
  return response;
}

function redePrimeiro(request) {
  return fetch(request)
    .then((response) => guardar(request, response))
    .catch(() => caches.match(request))
    .then((r) => r || Response.error());
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Pedidos a outros domínios não passam pelo service worker.
  if (url.origin !== self.location.origin) return;

  // Páginas da app: rede primeiro, cache como reserva offline.
  if (PAGE_PATHS.has(url.pathname)) {
    event.respondWith(redePrimeiro(request));
    return;
  }

  // Ficheiros estáticos: cache primeiro, rede só se ainda não estiverem guardados.
  if (CORE_PATHS.has(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached || fetch(request).then((response) => guardar(request, response))
      )
    );
    return;
  }

  // Tudo o resto (dados JSON do SIFITO, ficheiros de LMR, scripts): rede primeiro.
  event.respondWith(redePrimeiro(request));
});
