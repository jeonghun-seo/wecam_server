// require("dotenv").config();
// const express =require("express");
// const expressLayouts = require("express-ejs-layouts");
// const connectDb = require("./config/db");
// const Post = require("./models/Post");
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT || 3000;

// connectDb();

// app.use(expressLayouts);
// app.set("view engine", "ejs");
// app.set("views", "./views");

// app.use(express.static("public"));

// //미들웨어 설정
// app.use(bodyParser.json());


// app.use("/", require("./routes/main"));

// app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
// });

const express = require('express');
const path = require('path');
const app = express();

app.listen(3000, function () {
  console.log('listening on 3000')
}); 

app.use(express.static(path.join(__dirname, 'react-project/build')));

app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});