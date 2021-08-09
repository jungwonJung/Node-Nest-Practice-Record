const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(8000);
console.log(`${PORT} 에서 동작중`);
