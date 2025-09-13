import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const app = new Hono()

// CORS middleware
app.use('*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*')
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin')
  c.header('Access-Control-Allow-Credentials', 'true')
  c.header('Access-Control-Max-Age', '86400')
  
  if (c.req.method === 'OPTIONS') {
    return c.text('', 200)
  }
  
  await next()
})

// API routes
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/users', (c) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]
  return c.json(users)
})

app.post('/api/users', async (c) => {
  const body = await c.req.json()
  return c.json({ message: 'User created', user: body }, 201)
})

// Serve static files from frontend dist
app.use('/assets/*', (c) => {
  const assetPath = c.req.path.replace('/assets/', '')
  // Try multiple possible paths for frontend files
  const possiblePaths = [
    join('./frontend/dist/assets', assetPath),
    join('./dist/assets', assetPath),
    join('./assets', assetPath)
  ]
  
  for (const fullPath of possiblePaths) {
    if (existsSync(fullPath)) {
      const content = readFileSync(fullPath)
      const ext = assetPath.split('.').pop()
      const mimeTypes = {
        'js': 'application/javascript',
        'css': 'text/css',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        'ico': 'image/x-icon'
      }
      const contentType = mimeTypes[ext] || 'application/octet-stream'
      return c.body(content, 200, { 'Content-Type': contentType })
    }
  }
  return c.text('Asset not found', 404)
})

app.get('/favicon.ico', (c) => {
  // Try multiple possible paths for favicon
  const possiblePaths = [
    join('./frontend/dist', 'favicon.ico'),
    join('./dist', 'favicon.ico'),
    join('./', 'favicon.ico')
  ]
  
  for (const faviconPath of possiblePaths) {
    if (existsSync(faviconPath)) {
      const favicon = readFileSync(faviconPath)
      return c.body(favicon, 200, { 'Content-Type': 'image/x-icon' })
    }
  }
  return c.text('Not found', 404)
})

// Serve index.html for all other routes (SPA routing)
app.get('/*', (c) => {
  // Try multiple possible paths for index.html
  const possiblePaths = [
    join('./frontend/dist', 'index.html'),
    join('./dist', 'index.html'),
    join('./', 'index.html')
  ]
  
  for (const indexPath of possiblePaths) {
    if (existsSync(indexPath)) {
      const html = readFileSync(indexPath, 'utf-8')
      return c.html(html)
    }
  }
  return c.text('Frontend not found', 404)
})

const port = process.env.PORT || 3000

console.log(`Server is running on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}