//import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import jsonServer from 'json-server'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// const app = express()
const PORT = process.env.PORT || 3000

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'src', 'mock', 'db.json'))
const middlewares = jsonServer.defaults()

server.use(router)

server.use(middlewares)

// const distPath = path.join(__dirname, 'dist')
// server.use(jsonServer.static(distPath))

// server.get('*', (req, res) => {
//   res.sendFile(path.join(distPath, 'index.html'))
// })

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
