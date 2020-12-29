const { setupMaster } = require("cluster");

console.log(Math.round(1.6)); //2

console.log(Math.round(1.4)); // 1   round = 반올림을 하는 함수

function sum(first, second){  // 인자를 함수안으로 전달해주는 first, second = 매개변수 parameter
    console.log('a');
    return first+second; // return 을 만나면 함수가 종료됨 
    console.log('b');  // return 있어서 실행불가 
}


console.log(sum(2, 4)); // 2,4 는 인자 argument
// 8번라인에 return 을 하였기에 sum(2,4) 를 console.log 찍었을때 return first+second 한 인자의값을 출력