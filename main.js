var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;

  if (pathname === '/') {
    if (queryData.id === undefined) { // 메인페이지일때, 메인 페이지는 id가 정의되어 있지 않기에 undefined

      fs.readdir('./data', (err, filelist) => { // data폴더에 있는 파일 목록 가져옴
        var title = 'Welcome!';
        var description = 'Hello, Node.js';
        var list = '<ul>';

        var i = 0;
        while (i < filelist.length) { // 파일목록 개수만큼 반복
          list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i++;
        }
        list = list + '</ul>';

        var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template);
      })


    } else { // 다른 이름이 정의되어있는 페이지일때
      fs.readdir('./data', (err, filelist) => { // data폴더에 있는 파일 목록 가져옴
        var title = 'Welcome!';
        var description = 'Hello, Node.js';
        var list = '<ul>';

        var i = 0;
        while (i < filelist.length) { // 파일목록 개수만큼 반복
          list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i++;
        }
        list = list + '</ul>';
        fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
          var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
          response.writeHead(200);
          response.end(template);
        });
      });
    }

  } else {
    response.writeHead(404);
    response.end('Not found');
  }
  //console.log(__dirname + _url);
});
app.listen(3000);