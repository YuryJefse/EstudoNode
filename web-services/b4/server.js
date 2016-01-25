'use strict';

const
  morgan = require('morgan'),
  express = require('express'),
  app = express();

app.use(morgan('dev'));

const
  config = {
    booksdb : 'http://localhost:5984/books',
    b4db : 'http://localhost:5984/b4'
  };

require('./lib/book-search.js')(config, app);
require('./lib/field-search.js')(config, app);
require('./lib/bundle.js')(config, app);

app.listen(3000, function(){
  console.log("ready captain.");
});
