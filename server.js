const http = require('http');

const hostname = 'localhost';
const port = 3000;

//method creates a very basic server object using an existing http server class. 
//request handler is called every time the server receives a request and takes 2 objects as handlers (req and res). We will add data to the response and send it back.
const server = http.createServer((req, res) => {
  //see what headers look like from server-side point of view
  console.log(req.headers);
  //add status code property to response
  res.statusCode = 200;
  //tells client what kind of data to expect in the response body - anytime sending html in body do it this way
  res.setHeader('Content-Type', 'text/html');
  //response body - when short, can include it in the res.end method directly with html in it
  res.end('<html><body><h1>Hello World!</h1></body></html>');
});

//starts the server here

server.listen(port, hostname, () => {
  //3rd argument is a callback function that is executed when server starts up
  console.log( `Server running at http://${hostname}:${port}/`);
});