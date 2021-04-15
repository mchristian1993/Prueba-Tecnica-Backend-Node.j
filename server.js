
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');



const port = process.env.PORT || 5000;

// const port = process.env.PORT || '3000';

const product = require('./routes/productRoutes');
const category = require('./routes/categoryRoutes');
const supplier = require('./routes/supplierRoutes');

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



app.use(cors());

// SECURITY
app.disable('x-powered-by');



// ROUTES
product(app);
category(app);
supplier(app);


// START SERVER
app.set('port', port);


/*  server.listen(port, function() {
     console.log('listening on port: ', port);
}); */

server.listen(3000, '192.168.0.22' || 'localhost', function () {
  console.log('Application worker ' + process.pid + ' started...');
});
 
app.get('/', (req, res) => {
  res.send('Bienvenido API!')
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

module.exports = {
  app: app,

  server: server
};