
const restify = require('restify')
const os = require('os')
const server = restify.createServer({ name: 'single-pass' })
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({ mapParams: false }))
server.use(restify.plugins.gzipResponse())
const serverName = Date.now()
server.get('/healthCheck', async (req, res, next) => {
  res.send({ serverName, name: 'single-pass', runningOn: req.headers.host, hostname: os.hostname(), os: os.platform() })
  return next()
})
server.listen(5080, () => console.log(`${server.name} listening on: ${server.url}`))
