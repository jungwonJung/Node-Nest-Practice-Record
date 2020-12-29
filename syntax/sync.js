var fs = require('fs');

//readfileSync  동기적인 처리방법 

// console.log('A');
// var result = fs.readFileSync('syntax/sample.txt', 'utf8'); // utf8 을 넣어야만 사람이 읽을수있는 형태로 변환 
// console.log(result); // B 가 나오는데 sample.txt 파일의 내용 B 를 출력한다 readFileSync(경로, 형태? 찾아보장)
// console.log('C');

console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){   // 비동기식은 callback 이 필요함 function 부분 = callback
    console.log(result);
}); // callback 의 err 인자에서 error 가있으면 error 를 인자로제공하고, 2번째 매개변수는 파일의 내용을 인자로서 제공하기로 약속
// node js 의 성능을 제대로 끌어올리기위해서는 비동기식 asychronize 방식으로 작업하기를 추천쓰


console.log('C');