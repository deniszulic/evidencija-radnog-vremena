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
app.get('/locked/:id', db.lockeddata)
app.patch('/mydata/:id',db.updatemydata)
app.patch('/lock/:id', db.lock)
app.get('/alldata', db.getalldata)
app.get('/alldata1', db.getalldata1)
app.get('/alldatabyemail/:id', db.getalldatabyemail)
app.get('/alldatabyemail1/:id', db.getalldatabyemail1)
app.delete('/delete/:id', db.deletedata)
//app.get("/bigoof",db.getimg)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
