// app.js 는 express 프레임워크를 사용함에있어서 설정을 지정
// routes 폴더에 파일이 추가되면 app.js에도 코드추가 필요

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieparser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var indexRouter = require('./routes/index'); // 각각에 해당하는 라우터 인스턴스를 사용
var usersRouter = require('./routes/users');
var formRouter = require('./routes/form');

app.use('/', indexRouter); // 각각의 라우터가 연결될 URI 를 추가 
app.use('/users', usersRouter);
app.use('/form', formRouter);

app.listen(3000);