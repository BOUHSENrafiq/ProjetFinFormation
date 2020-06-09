const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // CORS policy because the backend and the front end are running in different ports
const port = 7777;  // you can choose a port
const api = require('./routes/api')
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', api)
app.get('/', function (req, res) {
  res.send('hello');
})
app.listen(port, function () {
  console.log('server at port:' + port);
})
