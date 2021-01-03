
var mysql = require('mysql');
var ejs = require('ejs')
var express = require('express')

var app = express(); 

// 9~10 express 를 이용 ejs setting
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function(request,response){  // 요청받지않은 페이지 홈화면 요청받으면 index.ejs 페이지출력
    response.render('index')
})

app.listen(3000); // express 를 통해 node app.js 커맨드 실행할경우 로컬호스트:포트(변수) 로 나타낼것임

var db = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "99189176",
    database: "nodejs-quest",
    port:"3306",
});
db.connect();

app.post('/index', function(request, response){
    var body = request.body;
    var des = body.des;
    var query = db.query('INSERT INTO user (id, des) VALUES ("'+ id + '","'+ des +'")',
        function(err, rows) {
            if(err) {throw err;}
            console.log("데이터입력완료");
        });
    });