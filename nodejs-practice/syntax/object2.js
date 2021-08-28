// array, object  데이터를 보기좋게 정리하는 도구

function f1(){
    console.log(1+1);
    console.log(1+2);
}

var f = function(){
    console.log(1+1);
    console.log(1+2);
}
console.log(f); // F 의 TYPE 출력   
 f();     // f 변수 안에있는 함수 출력
        // function 은 데이터 처리구문이면서 동시에 값이 될수있다 ex) 변수 의 값   var ?? = function(){}

var a = [f]; // 배열의 원소로서 함수가 존재할수있다 a 라는변수는 f함수의배열   ....[f] === var a
a[0]();

var o = {
    func:f
}
o.func();