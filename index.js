const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyparser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if(err){
        console.log('Could not connect to database: ', err);
    }
    else{
        console.log('connected to database: ' + config.db);
    }
});

app.use(bodyparser.urlencoded({ extended: false}))

app.use(bodyparser.json());
app.use(express.static(__dirname + '/client/dist/'));

app.use('/authentication', authentication);

app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, + '/client/dist/index.html'));
  });
  
  app.listen(8080, () => {
      console.log('Listening on port 8080');
  });