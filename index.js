const http = require('http');
const fs = require('fs');

const PORT = 3000;

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
  console.log(`Received ${request.method} request to ${url}`);

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
      
      case "/tasks/get":
        content = await serveStaticFile("./tasks.json");
        contentType = "application/json";
        break;
        
      default: 
        content = "Ruta no v&aacutelida\r\n";
        contentType = "text/html";
    }

     sendResponse(response,
       content, contentType);
  } else if(request.method === "POST" && url === "/tasks/save") {
    console.log('Received POST request to /tasks/save');
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      fs.writeFile('./tasks.json', body, err => {
        if(err) throw err;
        sendResponse(response, 'Tasks saved successfully!', 'text/plain');
      });
    });
  } else{
     console.log(`Received unhandled ${request.method} request to ${url}`);
     response.writeHead(405, {"Content-Type": "text/html"});
     response.write(`M&eacutetodo ${request.method} no permitido!\r\n`);
  }
}


const server = http.createServer(handleRequest);
server.listen(PORT);