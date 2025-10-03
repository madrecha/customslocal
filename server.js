import { Hono } from 'hono'
import { join } from 'path'
import { app as backendApp } from './backend/index.js'
import { readFile, stat } from 'fs/promises'

const app = new Hono()

// --- Backend API ---
app.route('/api', backendApp)

const distPath = join(import.meta.dir, 'frontend/dist')

// --- Serve static frontend ---
app.get('/assets/*', async (c) => {
  const assetPath = c.req.path.replace('/assets/', '')
  const path = join(distPath, 'assets', assetPath)
  try {
    const content = await readFile(path)
    const ext = path.split('.').pop()
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
    return new Response(content, {
      headers: {
        'Content-Type': mimeType
      }
    })
  } catch (error) {
    return c.text('File not found', 404)
  }
})

app.get('/favicon.ico', async (c) => {
  try {
    const content = await readFile(join(distPath, 'favicon.ico'))
    return new Response(content, {
      headers: {
        'Content-Type': 'image/x-icon'
      }
    })
  } catch (error) {
    return c.text('Favicon not found', 404)
  }
})

app.get('/*', async (c) => {
  try {
    const content = await readFile(join(distPath, 'index.html'))
    return new Response(content, {
      headers: {
        'Content-Type': 'text/html'
      }
    })
  } catch (error) {
    return c.text('Index file not found', 404)
  }
})

// --- Server ---
const port = process.env.PORT || 3000
console.log(`Server is running on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}
