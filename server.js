var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()
app.use(serveStatic(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

var port = process.env.PORT || 5000
app.listen(port)

console.log('server started '+ port);