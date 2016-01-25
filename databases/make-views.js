#!usr/bin/env node --harmony
"use strict";

const
  request = require('request'),
  async = require('async'),
  views = require('./lib/views.js'),
  urlDb = 'http://localhost:5984/books/_design/books';

async.waterfall([
  function(next){
    request.get(urlDb, next);
  },

  function(res, body, next) {
    if (res.statusCode === 200) {
      next(null, JSON.parse(body));
    } else if (res.statusCode === 404) {
      next(null, { views: {} });
    }
  },

  function(doc, next) {
    Object.Keys(views).forEach(function(name){
      doc.views[name] = views[name];
    });

    request({
      method: 'PUT',
      url: urlDb,
      json: doc
    }, next);
  }
], function(err, res, body) {
  if (err) {
    throw err;
  }
  console.log(res.statusCode, body);
});
