// array 는 [ 로 시작해서 ] 로 끝나야한다
var arr = ['A', 'B', 12, true];  // 문자, 숫자 ,boolean 이든 상관없을무
console.log(arr[3]);
arr[2] = 9
console.log(arr);
arr.push(false);
console.log(arr);

// //true
// [ 'A', 'B', 9, true ]
// [ 'A', 'B', 9, true, false ]