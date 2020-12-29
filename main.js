var http = require('http');
var fs = require('fs');
var url = require('url');  // url 이라는 모듈을 사용할 것이다 변수이름 url 을 통해서만
var qs = require('querystring');

function templateHTML(title, list, body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">create</a>
    ${body}
  </body>
  </html>
  `;
}

function templateList(filelist){ // filelist 정보를 41번라인 코드에서 생성 templateList 함수에서 그 값을받아서 list 정보를 만들어서 return
  var list = '<ul>'; // 비어있는 문자열이 아닌 ul 태그로 시작
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</li>`;
      i = i + 1;
    }
    list = list + '</ul>';
    return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url; // request.url == query string 을 나타낸다
    var querydata = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    // path 가 붙지않은 현상태를 route 라고함
    if(pathname === '/'){  // pathname 을 통해서는 home 과 각각의 페이지를 구분하기어려움 ex) home 도 pathname 은 / 각각의 페이지마다 querydata 만 다를뿐 
      if(querydata.id === undefined){  // 현재 home 에는 querydata.id 가 없어서 undefined 나오는데 undefined가 나오면 13라인 코드 진행 
        fs.readdir('./data', function(err, filelist){
          var title = 'Welcome'; 
          var description = 'Hello node.js';
          // var list = '<ul>'; // 비어있는 문자열이 아닌 ul 태그로 시작
          // var i = 0;
          // while(i < filelist.length){
          //   list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</li>`;
          //   i = i + 1;
          // }
          // list = list + '</ul>';
          var list = templateList(filelist)

          var template = templateHTML(title, list, `<h2>${title}</h2>${description}` );
          response.writeHead(200);  // 200 = status code (success)
          response.end(template);

          })

      } else {

      fs.readdir('./data', function(err, filelist){
        console.log(filelist);
        // var list = '<ul>'; // 비어있는 문자열이 아닌 ul 태그로 시작
        // var i = 0;
        // while(i < filelist.length){
        //   list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</li>`;
        //   i = i + 1;
        // }
        // list = list + '</ul>';
        var list = templateList(filelist)
        
        fs.readFile(`data/${querydata.id}`, 'utf8', function(err, description){    // page가 열릴때마다 file 을 리로드해서 보여줌 
          var title = querydata.id  //  title 은 querydata.id
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}` );


          response.writeHead(200);  // 200 = status code (success)
          response.end(template);
        });   // data 폴더 밑에 querydata.id 와 같은 제목의 파일 읽어오세요 
      });
    }
  } else if(pathname === '/create'){
    fs.readdir('./data', function(err, filelist){
      var title = 'WEB - create'; 
      var list = templateList(filelist)
      var template = templateHTML(title, list, 
        `
        <form action="http://localhost:3000/create_process" method="POST">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
        </form>
        `);
      response.writeHead(200);  // 200 = status code (success)
      response.end(template);
    });
  } else if (pathname === '/create_process'){
    var body = '';
    request.on('data', function(data){
      body = body + data;
    });
    request.on('end', function(){
      var post = qs.parse(body);  // qs = querystring 의 parse 함수를 써서 post 변수를 객체화 시킬수있음
      var title = post.title;
      var description = post.description;
      console.log(post);
    });
    response.writeHead(200);  
    response.end('success');
  } else  {
        response.writeHead(404);  // 404 = staus code (fail)
        response.end('Not found');
      }
      
});
app.listen(3000);