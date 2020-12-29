console.log(1+1); // 왼쪽의항과 오른쪽의 항을 합쳐주는 이항연산자

console.log(1==1); // true

console.log(1==2); // false

console.log(1>2); // false

console.log(1<2); // true

console.log(1===1); // true  왜 == 를 2개 쓰는지 모른다면 그냥 3개를 쓰도록하자 

console.log(1===2); // false


console.log(1=='1') // ture 동등 연산자는 두 피연산자의 자료형이 같지 않은 경우 같아지도록 변환한 후, 엄격 비교를 수행합니다. 
                    // 피연산자가 모두 객체라면, JavaScript는 내부 참조를 보고, 둘 다 메모리의 같은 객체를 바라보고 있는지 판별합니다
console.log(null  == undefined); // true

console.log(1==='1'); // false 일치 연산자는 자료형 변환 없이 두 연산자가 엄격히 같은지 판별합니다.