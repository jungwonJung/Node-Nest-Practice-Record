var express = require('express');
var app = express();
var ejs = require('ejs')
var bodyparser = require('body-parser');
var mysql = require('mysql')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs'); // 뷰엔진으로 npm 설치한 ejs 사용
app.set('views', './views/') // 아직 이해못함

app.get('/', function(request,response){  // 요청받지않은 페이지 홈화면 요청받으면 index.ejs 페이지출력
    response.render('index') // views 안에 index.ejs 렌더링
})

app.use(bodyparser.json());  // bodyparser json 형태로 뿌려주기
app.use(bodyParser.urlencoded({extended:true}));  // 아직이해못함


var db = mysql.createConnection({  // 데이터베이스 연동폼 
    host : "localhost",
    user: "root",
    password: "99189176",
    database: "nodejs-quest",
    port:"3306",
});
db.connect(); // db connect 함수 시작


app.listen(3000, function(){ // 3000번포트로 뿌려주면 비동기함수 서버시작한다고 콘솔띄우기
    console.log('서버시작이')
});

app.post('/index', function(req, res){   //  3000/index 로 post 요청 
    var data = req.body.des // data 변수안에 요청받은 bodyparser 중에 index.ejs form 안에 des 
    var query = db.query('INSERT INTO user (des) VALUES (?)',[
        data
    ])
    
    var list = db.query('SELECT * FROM user', (err, results) => {
        if(err) throw err;
        console.log('DATA RECEIVE:');
        console.log(results);
        res.send(results)
    })
})
