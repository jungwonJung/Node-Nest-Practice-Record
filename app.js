var express = require('express');
var app = express();
var ejs = require('ejs')
var bodyparser = require('body-parser');
var mysql = require('mysql')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs'); // 뷰엔진으로 npm 설치한 ejs 사용
app.set('views', './views/') // view 파일들은 .view 에 잇다

app.get('/', function(request,response){  // 요청받지않은 페이지 홈화면 요청받으면 index.ejs 페이지출력
    response.render('index') // views 안에 index.ejs 렌더링
    response.end();
})

app.use(bodyparser.json());  // bodyparser json 형태로 뿌려주기
app.use(bodyParser.urlencoded({extended:true}));  // 입력폼에서 POST 요청으로 데이터를 얻을수있는지 확인하기위해 라우팅설정
                                                    // req.body 에 받은 데이터 저장

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

app.post('/', function(req, res){   //  3000/index 로 post 요청 , templates 파일 action 과 동일한 URI
    var sql = "INSERT INTO user SET ?" // sql 이란 변수안에 쿼리문 날리기

    db.query(sql, req.body, function(err,results,fields){  // 연결할 데이터베이스 변수명 db 로 설정해둿음 맨위에
        if (err) throw err;
        console.log(results);       // index.ejs 하고 입력창 및 form 연동
        res.redirect('/getlist')
    })
});

            // 내가 처음에 작성한 코드 지금 비교한것과는 훨씬길고 쓸데없는 변수가 더 많다 
                // app.post('/', function(req, res){   //  3000/index 로 post 요청 , templates 파일 action 과 동일한 URI
                //     var data = req.body.des // data 변수안에 요청받은 bodyparser 중에 index.ejs form 안에 des 
                //     var query = db.query('INSERT INTO user (des) VALUES (?)',[    // user 안에 des 테이블
                //         data
                //     ]);
                //     db.query(query, data, function(err,results,fields){
                //         if (err) throw err;
                //         console.log(results);
                //         res.send('입력완료')
                //     })
                // });

app.get('/getlist', function(req,res) { // form /getlist 랑 연동한 ejs 연결
    var sql = "SELECT * FROM user"; // 쿼리문 날려주고 select 문
    
    db.query(sql, function(err, results, fields){
        if (err) throw err;  // 에러 있으면 띄우고
        res.render('getlist', {users : results});  // getlist.ejs 에 render 해줄건데 , users 에 쿼리문 날리고난 results 를 담을거다 
    });
});

            // 내가 처음에 작성한 코드
            // app.get('/GetList', function(req, res){
            //         return db.query('SELECT * FROM user', (err, results, fields) => {  
            //             if(err) { 
            //                 return res.status(500).send('server error');
            //             }
            //             var list = [];   // 빈배열을 만들어 문자열말고 배열화 시키자
            //             for(var i = 0; i < results.length; i++){
            //                 list.push('id : '+  results[i].id + '  , '+'des : '+ results[i].des); // list = 반복문 을해버리면 반복문이 돌때마다 list 값이 변경됨
            //                 console.log(list)
            //             };
            //             res.send(list.join('\n'));
            //             }
            //         ); 
            //     });

app.get('/delete/:id', function(req,res){
    var sql = "DELETE FROM user WHERE id = ?"; // 삭제 쿼리문 날려주기

    db.query(sql,[req.params.id],function(err, results, fields){  // :id 값은 req.params.id 에서 얻는다
        if (err) throw err;
        console.log(results) // packet 상태메세지 출력
        res.redirect('/getlist'); //다시 조회창으로 가게  무한삭제가능
    });
});

app.post('/update/:id', function(req, res){  // getlist 에 각 데이터들마다 삭제,수정 링크를  달아주었다 id값을 이용 foreach (value) 함수 ejs 에서
    var sql = "UPDATE user SET ? WHERE id = " + req.params.id; 
    
    db.query(sql, req.body, function(err, results, fields){
        if (err) throw err;
        console.log(results); // database packet 출력
        res.redirect('/getlist');
    });
});

app.get('/update/:id', function(req,res){ // 수정링크를 타고 들어온 데이터의 id 값과 des 값을 받아서 update ejs 파일로 넘긴다
    var sql = "SELECT * FROM user WHERE id = ?";
    
    db.query(sql, [req.params.id],function(err, results, fields){
        if (err) throw err;
        console.log(results);
        res.render('update',{users : results}); // 쿼리문 날린 results 값을 users 란 key 에 담기 
    });
});