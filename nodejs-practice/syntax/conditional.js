var args = process.argv;
console.log(args[2]);
console.log('A');
console.log('B');
if(args[2] === '1'){  // args 2번째 출력로그가 1 이면 c1 을 출력
    console.log('C1');
} else {
    console.log('C2');
}
console.log('D');

//  '/usr/bin/node',
//  '/mnt/c/Users/82109/Desktop/web2-nodejs/syntax/conditional.js',
//  '1' ]

// 여기서 2번라인에 args [2] 를 추가함으로써 0,1,2 번째 출력로그인 1 을 출력하겠다
