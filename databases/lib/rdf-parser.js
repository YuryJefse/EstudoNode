'use strict';

const
  fs = require('fs'),
  cheerio = require('cheerio');

module.exports = function(filename, callback){
  fs.readFile(filename, function(err, data){
    if (err) {
      callback(err);
    }

    let
      $ = cheerio.load(data.toString()),
      collect = function(index, element){
        return $(element).text();
      };

      callback(null, {
        _id: $('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', ''),
        title: $('dcterms\\:title').text(),
        authors: $('pgterms\\:agent pgterms\\:name').map(collect),
        subjects: $('[rdf\\:resource$="/LCSH"] ~ rdf\\:value').map(collect)
      });
  });
};
