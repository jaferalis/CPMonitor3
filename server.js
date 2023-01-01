require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(process.cwd()+"//CPMonitor//dist//CPMonitor//"));

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/devices', require('./production/devices.controller'));
app.use('/machines', require('./machines/machines.controller'));
app.use('/operators', require('./operators/operators.controller'));
// global error handler
app.use(errorHandler);

app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"//CPMonitor//dist//CPMonitor/index.html")
  });
// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8080;
app.listen(port, () => console.log('Server listening on port ' + port));