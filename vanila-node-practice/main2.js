const http = require("http");
const fs = require("fs").promises;

const server = http
    .createServer(async (req, res) => {
        try {
            console.log(req.url, req.headers.cookie);
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.writeHead(200, { "Set-Cookie": "mycookie=jung" });
            const data = await fs.readFile("./main2.html");
            res.end(data);
        } catch (err) {
            console.error(err);
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            res.end(err.message);
        }
    })
    .listen(8080);
server.on("listening", () => {
    console.log("8080포트에서 연결중");
});
server.on("error", (error) => {
    console.log(error);
});
