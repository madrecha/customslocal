import { Hono } from 'hono'
import { Database } from "bun:sqlite";

const app = new Hono()

const db = new Database('database.db')

db.run('CREATE TABLE IF NOT EXISTS counter (counter INTEGER DEFAULT 0)')

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
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/users', (c) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]
  return c.json(users)
})

app.post('/users', async (c) => {
  const body = await c.req.json()
  return c.json({ message: 'User created', user: body }, 201)
})

// increment the counter
app.post('/counter', (c) => {
  // Try to get the current counter
  let counterRow = db.prepare('SELECT counter FROM counter').get();
  let newCounter;
  if (counterRow) {
    // If exists, increment and update
    newCounter = counterRow.counter + 1;
    db.prepare('UPDATE counter SET counter = ?').run(newCounter);
  } else {
    // If not exists, insert with value 1
    newCounter = 1;
    db.prepare('INSERT INTO counter (counter) VALUES (?)').run(newCounter);
  }
  return c.json({ counter: newCounter, message: 'Counter incremented' });
})

// get the counter
app.get('/counter', (c) => {
  const counter = db.prepare('SELECT counter FROM counter').get()
  return c.json({ counter: counter?.counter ?? 0, message: 'Counter fetched' })
})

// Export the Hono app for use in other files
export { app }