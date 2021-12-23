import express from "express";
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
const db = require('./queries')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(fileUpload());

app.post('/register', db.createUser)
app.post('/login', db.login)
app.post('/data', db.createData)
app.post('/slika', db.createImage)
app.get('/getdata/:id', db.dataById)
app.patch('/mydata/:id',db.updatemydata)
app.get("/bigoof",db.getimg)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
