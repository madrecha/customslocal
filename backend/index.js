import { Hono } from 'hono'

const app = new Hono()

// CORS middleware - allow all
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

const port = process.env.PORT || 3000

console.log(`Server is running on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}