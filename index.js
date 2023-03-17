const http = require('http');
const fs = require('fs');

const PORT = 80;

const serveStaticFile = async (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function(err, data) {
      if(err) reject(err);
      resolve(data);
    });
  });
} 

const sendResponse = (response, content, contentType) => {
  response.writeHead(200, {"Content-Type": contentType});
  response.end(content);
}

const handleRequest = async (request, response) => {
  const url = request.url;

  if(request.method === "GET"){
    let content;
    let contentType;
    switch(url){
      case "/":
      case "/index.html":
        content = await serveStaticFile("www/index.html");
        contentType = "text/html";
        break;
      case "/script.js":
        content = await serveStaticFile("www/script.js");
        contentType = "text/javascript";
        break;
      case "/style.css":
        content = await serveStaticFile("www/style.css");
        contentType = "text/css";
        break;
      default: 
        content = "Ruta no v&aacutelida\r\n";
        contentType = "text/html";
    }

     sendResponse(response, content, contentType);
  } else{
     response.writeHead(405, {"Content-Type": "text/html"});
     response.write(`M&eacutetodo ${request.method} no permitido!\r\n`);
  }
}


const server = http.createServer(handleRequest);
server.listen(PORT);