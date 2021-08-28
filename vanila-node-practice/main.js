const http = require("http");

const server = http
    .createServer((req, res) => {
        res.write("hello world");
        res.write("hello server");
        res.end("hello jung");
    })
    .listen(8080);
server.on("listening", () => {
    console.log("8080포트에서 연결중");
});
server.on("error", (error) => {
    console.log(error);
});
