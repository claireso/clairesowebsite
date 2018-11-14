const express = require('express')
const next = require('next')
const path = require('path')
const favicon = require('serve-favicon')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const customRoutes = {
  '/service-worker.js': {
    filePath: path.join(__dirname, '.next', '/service-worker.js')
  },
  '/robots.txt': {
    filePath: path.join(__dirname, 'static', 'robots.txt')
  }
}

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))

    server.get('/p/:slug', (req, res) => {
      const actualPage = '/project'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      const customRoute = customRoutes[req.url]

      if (customRoute && customRoute.filePath) {
        app.serveStatic(req, res, customRoute.filePath)
        return
      }

      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      /* eslint-disable */
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    /* eslint-disable */
    console.error(ex.stack)
    process.exit(1)
  })
