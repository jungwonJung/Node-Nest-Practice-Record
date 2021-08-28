var v1 = 'v1';
// 10000 code 가 사이에있을수도
v1 = 'jung'; // v1 낑겨넣기 
var v2 = 'v2';

var o = {
    v1:'v1',
    v2:'v2'
}  // 객체는 마치 폴더와 같다

function f1(){
    console.log(o.v1);
}

function f2(){
    console.log(o.v2);
}

f1();
f2();

// 객체는 폴더와 같다 그런데 함수는 객체라는 폴더안에 파일처럼 들어갈수가있음 파일로 들어간다는건 값이 될수있다는것
// 객체 안에 함수를 저장해보자

var q = {
    v1:'v1',
    v2:'v2',
    f1:function(){
        console.log(this.v1); // this 라는 약속된 문구로 인해 함수가 속해있는 객체의 이름 을 뜻한다 바뀌어도 알아서 척척척~~
    },
    f2:function(){
        console.log(this.v2);
    }
}
// f1,f2 객체 o 안에있는 함수 호출할때는
q.f1();
q.f2();  // o 안에있는 f1,f2 함수 호출