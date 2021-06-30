# 미션해결중

### 사용자

회원가입 = 이메일 , 비밀번호, 이름, 전화번호  
비밀번호는 세가지 종류 이상의 문자구성 최소 8자리  
검증되지않을시 에러 리턴
동일한 이메일 존재시에도 에러 리턴  
  

로그인  
이메일, 비밀번호로 진행  
성공시 JWT 토큰 발급
swagger Authorization 으로 인증가능  
회원가입과 동일한 방식의 비밀번호 검증  

---

### 상품

상품리스트  
가격순  평점순  최신순
상품 등록 및 삭제
(상품 디테일 조회는 개인적으로 추가)

---

### 추가사항

api 문서화

---

## 설치방법

-   npm

```
$ npm i -g @nestjs/cli
```

---

## git 으로 설치

-   git

```
$ git clone 
$ npm install
$ cd mall
$ npm run start
```

---

## 사용방법

-   run project

```
$ cd mall
$ npm run start
```  

## DB연결방법
ormconfig.json  
파일을 생성하여  
```
{
    "type": "예시",
    "host": "로컬호스트",
    "port": "포트번호",
    "username": "루트",
    "password": "비밀번호",
    "database": "nest-mall",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "logging": true,
    "synchronize": true
}
```  
형식으로 연결할 DB 의 정보를 기입한다  

## DB Schema 정리 
```
User
userEmail = 이메일
userName = 이름
userPassword = 비밀번호
userPhone = 전화번호
```

```
productImage = 상품이미지
productFreeDelivery = 무료배송여부
productTitle = 상품제목
discountPer = 할인율
productPrice = 상품원래가격
productDiscountPrice = 할인된가격
productScore = 상품평점
isDeleted = 삭제여부(softdelete)
createdAt = 등록일자
updatedAt = 수정일자
```

## 사용 모듈
- bcrypt
- dotenv
- jsonwebtoken
- swagger-jsdoc
- swagger-ui-express  

## 정보

My Portfolio – [@노션](https://www.notion.so/Hello-I-m-Louis-6ec5e3f6bde04aa89dd19509654ef465)  
My Email – wjdros1501@gmail.com  
My Blog– [@블로그](https://ganzicoder.tistory.com/)  
My Github–[https://github.com/JUNGganzi/](https://github.com/JUNGganzi)
