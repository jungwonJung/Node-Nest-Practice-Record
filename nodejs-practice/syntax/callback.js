// function a(){
//     console.log('A');  // a 라는 함수를 실행하면 A 를 출력쓰
// }
var a = function a(){  // a라는 변수안에 함수 a 를  변수 a 의 값으로도 넣을수있음 nodejs 에서는 함수도 변수의 값이 될수있음
    console.log("A");
}
// a(); //a 라는 이름의 변수든 함수든 호출

function slowfunc(callback){  // 나중에 전화해 callback 나중에 동작하길원할때 인자값을 callback 으로 받자
    callback();
}

slowfunc(a); // 오랜시간이 지나서 동작하는 slowfunc 라는 함수가 동작을하고
            // slowfunc함수의 매개변수인 callback 은 변수 a 의 값으로 지정된 함수 a를 값으로 받음
            // callback() 은 고로 변수 a 와 같다

            // 정리 : 함수 slowfunc 매개변수(parameter) callback 이
            // 13번에서 a 라는 인자값을 받으면 변수 a 의 값인 함수 a 를 매개변수 callback 값으로 받아와서
            // callback()은 고로 var a = function a 와 같다  좀빡침 이해될까말까함