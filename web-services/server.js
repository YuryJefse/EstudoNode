const
  http = require('http'),
  server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.end('Hello');
  });

  server.listen(3000, function(){
    console.log("ready captain");
  });
