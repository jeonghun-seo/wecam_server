require("dotenv").config();
const express =require("express");
const connectDb = require("./config/db");
const Post = require("./models/Post");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

connectDb();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use("/", require("./routes/main"));

app.use(express.static(path.join(__dirname, 'react-project/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});