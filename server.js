/*--------------------creating server------------------------------*/
var http = require('http'); // require http module to create server
var fs = require('fs'); // require fs module to read files

// reading all the files in once
var indexHtml = fs.readFileSync('./public/index.html', 'utf8');
var styleCSS = fs.readFileSync('./public/style.css', 'utf8');
var indexJS = fs.readFileSync('./public/index.js', 'utf8');
var foodMonsterJPG = fs.readFileSync('./public/foodMonster.jpg');
var pageNotFound = fs.readFileSync('./public/404.html', 'utf8');

// server function with callback
var server = http.createServer( function (req, res) {
  /*
  console.log("== Request made");
  console.log("  - method:", req.method);
  console.log("  - path:", req.url);
  console.log("  - headers:", req.headers);
  */

  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, {
      'Content-Type': 'text/html'  // specifying expected content type
    });
    res.write(indexHtml);
    res.end('\n');
  }
  else if (req.url === '/style.css') {
    res.writeHead(200, {
      'Content-Type': 'text/css'  // specifying expected content type
    });
    res.write(styleCSS);
    res.end('\n');
  }
  else if (req.url === '/index.js') {
    res.writeHead(200, {
      'Content-Type': 'text/js'  // specifying expected content type
    });
    res.write(indexJS);
    res.end('\n');
  }
  else if (req.url === '/foodMonster.jpg') {
    res.writeHead(200, {
      'Content-Type': 'image/jpeg'  // specifying expected content type
    });
    res.write(foodMonsterJPG);
    res.end('\n');
  }
  else {    // default case is the 404.html page
    res.writeHead(404, {
      'Content-Type': 'text/html' // specifying expected content type
    });
    res.write(pageNotFound);
    res.end('\n');
  }
});
/*---------------------Specifying Port-----------------------------*/
var port = process.env.PORT || 3000; // If port isn't specified then use 3000 as default.

server.listen(port, function () {
  console.log("== Server listening on port:", port);
});
