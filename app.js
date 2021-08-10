const path = require("path");
const http = require("http");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config({ path: path.join(__dirname, "/.env") });

if (process.env.NODE_ENV === "prod") {
  dotenv.config({ path: path.join(__dirname, "/.env.prod") });
} else if (process.env.NODE_ENV === "dev") {
  dotenv.config({ path: path.join(__dirname, "/.env.dev") });
} else {
  throw new Error("process.env.NODE_ENV를 설정하지 않았습니다!");
}

const port = process.env.PORT;
const app = express();
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`NODE SERVER - RUNNING ON ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
