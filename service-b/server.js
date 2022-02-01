// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const http = require("http")

// Declare a route
fastify.get('/', async (request, reply) => {
  return { service: 'b' }
})

fastify.get('/service-a', async (request, reply) => {
  http.get("http://service-a:3000", (res) => {
    let chunks = [];

    res.on("data", chunk => chunks.push(chunk))

    res.on("end", () => {
      const data = JSON.parse(Buffer.concat(chunks).toString())
      reply.send(data)
    })
  })
  return reply
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, "0.0.0.0")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()