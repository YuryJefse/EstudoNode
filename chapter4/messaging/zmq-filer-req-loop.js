"use strict";

const
  zmq = require("zmq"),
  filename = process.argv[2],
  requester = zmq.socket("req");

requester.on("message", function(data){
  let response = JSON.parse(data);
  console.log("Received response:", response);
});

requester.connect("tcp://localhost:5433");

for (let i = 0; i < array.length; i++) {
  console.log("Sending request "+ i +" for " + filename);
  requester.send(JSON.stringify({
    path: filename
  }));
}
