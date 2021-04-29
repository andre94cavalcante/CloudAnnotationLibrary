const http = require('http')
const app = require('./api/app')

// Create PORT
const port = process.env.PORT || 5000

app.set('port', port)
const server = http.createServer(app)

app.listen(port, () => console.log('Server started on 5000'))
