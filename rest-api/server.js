
const restify = require('restify')
// const packageInfo = require('../package.json')
const os = require('os')
const restifyClients = require('restify-clients')
const serverName = Date.now().toString()
const server = restify.createServer({ name: 'rest-api' })
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({ mapParams: false }))
server.use(restify.plugins.gzipResponse())

let client = restifyClients.createJsonClient({
  url: 'http://localhost:5000',
  retry: false,
  connectTimeout: 6000
})
server.get('/healthCheck', async (req, res, next) => {
  console.log('Request for health check')
  client.get({ path: '/healthCheck' }, (err, clientReq, clientRes, responseBody) => {
    if (err) {
      responseBody = { name: clientReq._headers.host, err: err }
    }
    console.dir(responseBody)
    res.send({ serverName, name: 'rest-api', runningOn: req.headers.host, hostname: os.hostname(), os: os.platform() })
    return next()
  })
})

function eventTriggered (err, key) {
  console.log(serverName)
  if (err) {
    console.log(err)
  }
  console.log(key + ' triggered')
}

server.listen(4080, () => console.log(`${server.name} listening on: ${server.url}`))
