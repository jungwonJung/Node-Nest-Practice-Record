// app.js 는 express 프레임워크를 사용함에있어서 설정을 지정
// routes 폴더에 파일이 추가되면 app.js에도 코드추가 필요

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieparser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs')
var mysqlRouter = require('./routes/mysql')
var app = express();
var bodyParser = require('body-parser')

app.set('view engine', 'ejs'); // 뷰엔진으로 npm 설치한 ejs 사용
app.set('views', './views/') // view 파일들은 .view 에 잇다
app.use(bodyParser.urlencoded({extended: true})); // post 할때 자꾸 cannot property  에러나서 찾아보니 router 경로 지정 전에 bodyparser 미들웨어 설정해야함
app.use(bodyParser.json());

// var indexRouter = require('./routes/index'); // 각각에 해당하는 라우터 인스턴스를 사용
// var usersRouter = require('./routes/users');
var formRouter = require('./routes/form');
var boardRouter = require('./routes/board')

// app.use('/', indexRouter); // 각각의 라우터가 연결될 URI 를 추가 
// app.use('/users', usersRouter);
app.use('/form', formRouter);
app.use('/mysql', mysqlRouter);
app.use('/board', boardRouter);  //항상 추가해주자 라우터를 만들면 app.js 메인파일에 추가 항상!


app.listen(3000);