# 스텝 1
FROM node:12 AS builder
# 베이스 이미지 노드 12
# 생성할 폴더의 위치  /app 으로 프로젝트 모든파일 복사
WORKDIR /app 

COPY . .

# 네스트 프로젝트를 빌드
RUN npm install
RUN npm run build


# 베이스 이미지 노드 12 알파인버전 (가벼운버전이라고한다)
FROM node:12-alpine
WORKDIR /app
# 위에 있는 스텝 1 빌더에서 빌드 된 프로젝트를 가져온다
COPY --from=builder /app ./

# 애플리케이션실행
CMD ["npm", "run", "start:prod"]