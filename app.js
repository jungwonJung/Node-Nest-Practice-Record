var express = require('express');
var app = express();
var ejs = require('ejs')
var bodyparser = require('body-parser');
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.set('views', './views/')

app.get('/', function(request,response){  // 요청받지않은 페이지 홈화면 요청받으면 index.ejs 페이지출력
    response.render('index')
})

app.use(bodyparser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function(){
    console.log('서버시작이')
});

app.post('/index', function(req, res){
    var data = req.body.des
    console.log(data)
    res.send(data)
})