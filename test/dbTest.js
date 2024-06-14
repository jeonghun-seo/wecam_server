// dbTest.js
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 10010;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb://172.17.0.3:27017:27017/";
let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  db = client.db("mydb");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

// 데이터 삽입
app.post('/addData', (req, res) => {
  const { access_token, timestamp, sensor_id, avg_ppm } = req.body;
  
  if (!access_token || !timestamp || !sensor_id || !avg_ppm) {
    return res.status(400).send('All fields are required');
  }

  const message_dict = { access_token, timestamp, sensor_id, avg_ppm };

  db.collection("sensorData").insertOne(message_dict, (err, result) => {
    if (err) throw err;
    res.send('Data inserted');
  });
});

// 최근 하나의 데이터 조회

module.exports = connectDb;