require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3000; 
//env파일에 포트가 지정되어 있다면 그 포트를 사용하고 지정되어있지 않다면 3000번 포트 사용

app.use("/", require("./routes/main"));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});