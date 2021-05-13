const http = require('http');

const hostname = 'localhost';
const port = 3000;

const path = require('path');
const fs = require('fs');

//method creates a very basic server object using an existing http server class. 
//request handler is called every time the server receives a request and takes 2 objects as handlers (req and res). We will add data to the response and send it back.
const server = http.createServer((req, res) => {
  //see what url and method loo like
  console.log(`Request for ${req.url} by method ${req.method}`);

  //only want server to respond to requests with GET method
  if (req.method === 'GET') {
    let fileUrl = req.url; //if request is just to host name you will just get a / for req.url
    if(fileUrl === '/') {
      fileUrl = '/index.html'; //sends back index.html if all received is /
    }

    //get absolute path of file requested
    const filePath = path.resolve('./public' + fileUrl); //will give us the full absolute path to the file

    //would like the server to only grant request to html files
    const fileExt = path.extname(filePath); //parse out extension from filepath
    if (fileExt === '.html') {
      //will check to see if the file even exists on the server first
      fs.access(filePath, err => {
        if (err) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
          return; //allows code after this to not be executed
        }
        //this is the situation where we don't have errors, have an html file that exists on the server in the public directory - the final stop
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html'); //tells client to expect an html document

        //to send the html file. This method takes care of reading the contents of the file it is given in small chunks rather than all at once (faster loading - like lazy loading)
        fs.createReadStream(filePath).pipe(res); //send it to the response object. Pipe method sends one stream of data to another; in this case the response stream.
      });
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
  }
});

//starts the server here

server.listen(port, hostname, () => {
  //3rd argument is a callback function that is executed when server starts up
  console.log( `Server running at http://${hostname}:${port}/`);
});