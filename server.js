import { Hono } from 'hono'
import { app as backendApp } from './backend/index.js'

const app = new Hono()

// --- Backend API ---
app.route('/api', backendApp)

// When compiled with `bun build --assets frontend/dist/**`,
// Bun will embed files and serve them via Bun.file(<path>).
// We reference assets using their original project paths.
const INDEX_CANDIDATES = [
  './frontend/dist/index.html',
  'frontend/dist/index.html',
  '/frontend/dist/index.html',
  './dist/index.html',
  'dist/index.html',
  '/dist/index.html'
]
const FAVICON_CANDIDATES = [
  './frontend/dist/favicon.ico',
  'frontend/dist/favicon.ico',
  '/frontend/dist/favicon.ico',
  './dist/favicon.ico',
  'dist/favicon.ico',
  '/dist/favicon.ico'
]

async function resolveFirstExisting(paths) {
  for (const p of paths) {
    try {
      if (await Bun.file(p).exists()) return p
    } catch { }
  }
  return null
}

// Diagnostics to probe embedded asset paths in the compiled binary
app.get('/__assets_probe', async (c) => {
  const candidates = [
    './frontend/dist/index.html',
    'frontend/dist/index.html',
    '/frontend/dist/index.html',
    './dist/index.html',
    'dist/index.html',
    '/dist/index.html'
  ]
  const results = await Promise.all(
    candidates.map(async (p) => ({ path: p, exists: await Bun.file(p).exists() }))
  )
  return c.json({ results })
})

// --- Serve static frontend ---
app.get('/assets/*', async (c) => {
  const assetPath = c.req.path.replace('/assets/', '')
  const candidates = [
    `./frontend/dist/assets/${assetPath}`,
    `frontend/dist/assets/${assetPath}`,
    `/frontend/dist/assets/${assetPath}`,
    `./dist/assets/${assetPath}`,
    `dist/assets/${assetPath}`,
    `/dist/assets/${assetPath}`
  ]
  const p = await resolveFirstExisting(candidates)
  if (!p) return c.text('File not found', 404)
  const ext = assetPath.split('.').pop()
  const mimeTypes = {
    'js': 'application/javascript',
    'css': 'text/css',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'svg': 'image/svg+xml'
  }
  const mimeType = mimeTypes[ext] || 'application/octet-stream'
  return new Response(Bun.file(p), { headers: { 'Content-Type': mimeType } })
})

app.get('/favicon.ico', async (c) => {
  const p = await resolveFirstExisting(FAVICON_CANDIDATES)
  if (!p) return c.text('Favicon not found', 404)
  return new Response(Bun.file(p), { headers: { 'Content-Type': 'image/x-icon' } })
})

app.get('/*', async (c) => {
  const p = await resolveFirstExisting(INDEX_CANDIDATES)
  if (!p) return c.text('Index file not found', 404)
  return new Response(Bun.file(p), { headers: { 'Content-Type': 'text/html' } })
})

// --- Server ---
const port = process.env.PORT || 3000
console.log(`Server is running on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}
