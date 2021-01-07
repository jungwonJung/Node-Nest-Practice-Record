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
    response.end();
})

app.use(bodyparser.json());  // bodyparser json 형태로 뿌려주기
app.use(bodyParser.urlencoded({extended:true}));  // 아직이해못함  true 로 설정되면 인코딩된 URL 데이터가 qs 모듈로 분석
                                                // false 면 querystring 으로 인코딩된 데이터 분석

var db = mysql.createConnection({  // 데이터베이스 연동폼 , 
    host : "localhost",
    user: "root",
    password: "99189176",
    database: "nodejs-quest",
    port:"3306",
});
db.connect(); // db connect 함수 시작
// 데이터베이스를 왜썻는가 ?
// fs 파일을 만들어서 데이터를 출력하는것이아닌 sql RDBMS 를 사용하여 데이터를 좀더 간편하게 CRUD 하기위함 

app.listen(3000, function(){ // 3000번포트로 뿌려주면 비동기함수 서버시작한다고 콘솔띄우기
    console.log('서버시작이')
});

app.post('/index', function(req, res){   //  3000/index 로 post 요청 , templates 파일 action 과 동일한 URI
    var data = req.body.des // data 변수안에 요청받은 bodyparser 중에 index.ejs form 안에 des 
    var query = db.query('INSERT INTO user (des) VALUES (?)',[    // user 안에 des 테이블
        data
    ]);
});

app.get('/GetList', function(req, res){
        return db.query('SELECT * FROM user', (err, results, fields) => {  
            if(err) { 
                // return res.status(500).send('server error');
            }

            var list = [];   // 빈배열을 만들어 문자열말고 배열화 시키자
            for(var i = 0; i < results.length; i++){
                list.push('id : '+  results[i].id + '  , '+'des : '+ results[i].des); // list = 반복문 을해버리면 반복문이 돌때마다 list 값이 변경됨
                console.log(list)
            };
            res.send(list.join('\n'));
            }
        ); 
    });

// app.get('GetList', function(req, res){  배열화 실패
//     var list = [];
//     var pushresults = function(results) {
//         for(var i = 0; i < list.length; i++) {
//             list.push(results[i].id, results[i].des);
//         };
//     };
// });

// return db.query('SELECT * FROM user', (err, results, fields) => {  
//     if(!err) {
//         pushresults(list);
//         console.log(list)
//     };
// });