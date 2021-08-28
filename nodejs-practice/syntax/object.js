var members = ['jung', 'park', 'duck9']; // 배열의 literal 표현하는 방법은 [] 중괄호 
console.log(members[1]); // park

var i = 0 
while(i < members.length){ //  members.length === members의 원소의 갯수
    console.log(members[i]);
    i = i + 1;
}

// 객체의 literal 표현하는 방법은 {} 대괄호
var roles = {
    'programmer' : 'jung',
    'designer' : 'park',
    'dog' : 'duck9'
};
console.log(roles.designer); // 객체에서는 객체명 다음에 . 을찍는다 roles.designer 처럼


// 객체는 어떻게 loop 와 함께 사용할수있는가
// for 문이 존재 for 문의 첫번째 자리는 변수 그 다음 in 이라는 약속된 문구 사용 처릴할객체를 in 뒤에 넣는다
for(var name in roles){  // name 의 위치가 키 : 밸류  (객체)  중의 key 값
    console.log('object', name); // 키만 가져온다
}

for(var name in roles){  
    console.log('object', name, 'value', roles[name]); // roles 객체의 [키값] 하면 키 : 밸류 값 둘다 출력
}