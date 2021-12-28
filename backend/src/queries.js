require("dotenv").config();
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "api",
  password: "admin",
  port: 5432,
});
/*const createUser = async (request, response) => {
  const { email,lozinka,ime,prezime,admin_id } = request.body
  //const {lozinka}=bcrypt.hash(request.body.lozinka,8);
  pool.query('INSERT INTO korisnik (email, lozinka,ime,prezime) VALUES ($1, $2,$3,$4,$5) RETURNING id', [email, lozinka,ime,prezime,admin_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}*/
const createUser = async (request, response) => {
  const { email, admin, datumReg, ime, prezime } = request.body;
  //const {lozinka}=bcrypt.hash(request.body,8);
  const { lozinka } = request.body;
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(lozinka, salt);
  pool.query(
    "INSERT INTO korisnik (email, lozinka,admin, datumReg, ime, prezime) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
    [email, hash, admin, datumReg, ime, prezime],
    (error, results) => {
      /*if (error) {
      throw error
    }*/

      //u slucaju da se crasha moze nastavit
      try {
        response.status(201).send(`User added with ID: ${results.rows[0].id}`);
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const login = async (request, response) => {
  const { email, lozinka } = request.body;
  pool.query(
    "SELECT lozinka, admin, email, id, ime, prezime FROM korisnik WHERE email=$1",
    [email],
    (error, results) => {
      /*if (error) {
        throw error;
      }*/
      //console.log(results.rows[0].admin)
      try{
      bcrypt.compare(lozinka, results.rows[0].lozinka).then(function (result) {
        if (result && results.rows[0].lozinka) {
          delete results.rows[0].lozinka;
          console.log(results.rows);
          let token = jwt.sign(
            email,
            process.env.JWT_KEY,
            { algorithm: "HS512" },
            { expiresIn: "7d" }
          );
          /*return {
            token,
            admin: results.rows[0].admin,
            email: results.rows[0].email,
            id:results.rows[0].id
          };*/
		  response.status(200).json(results.rows);
        } else {
          throw new Error("Cannot authenticate");
        }
      });
      //response.status(200).json(results.rows);
      }catch(error){
        console.log(error);
      }
    }
  );
};
const createData = async (request, response) => {
  const { br_sati,prekovremeni,blagdan,nocni_rad,odsutan,rad_od_kuce,napomena,datum_obavljanja_pocetak,datum_obavljanja_kraj,email,korisnik_id,postavljeno } = request.body;
  //console.log(request.body)
 // console.log(request.files)
  pool.query(
    "INSERT INTO kalendar (br_sati,prekovremeni,blagdan,nocni_rad,odsutan,rad_od_kuce,napomena,datum_obavljanja_pocetak,datum_obavljanja_kraj,email,korisnik_id,postavljeno) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id",
    [br_sati,prekovremeni,blagdan,nocni_rad,odsutan,rad_od_kuce,napomena,datum_obavljanja_pocetak,datum_obavljanja_kraj,email,korisnik_id,postavljeno],
    (error, results) => {
      try {
        //response.status(201).send(`ID: ${results.rows[0].id}`);
        //response.sendStatus(201).send(results.rows[0].id)
        //console.log(results.rows[0].id)
        response.status(200).send((results.rows[0].id).toString());
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const createImage = async (request, response) => {
  const{name,data}=request.files.image
  let id=Number(name)
  let name1=name+"_"+Date.now()
  console.log(name)
  console.log(data)
  pool.query(
    "INSERT INTO slika (name,img,kalendar_id) VALUES ($1, $2, $3) RETURNING id",
    [name1,data,id],
    (error, results) => {
      try {
        response.status(200).send((results.rows[0].id).toString());
       //response.sendStatus(200);
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const dataById = (request, response) => {
  const id = parseInt(request.params.id)
  //console.log(id)

  pool.query('SELECT kalendar.id, kalendar.datum_obavljanja_pocetak, kalendar.datum_obavljanja_kraj, kalendar.br_sati, kalendar.prekovremeni, kalendar.rad_od_kuce, kalendar.odsutan, kalendar.nocni_rad, kalendar.postavljeno, kalendar.blagdan, kalendar.napomena, kalendar.zakljucano,slika.name,slika.img FROM kalendar LEFT JOIN slika ON kalendar.id=slika.kalendar_id WHERE kalendar.korisnik_id=$1 AND kalendar.zakljucano IS NOT true ORDER BY postavljeno DESC', [id], (error, results) => {
    /*if (error) {
      throw error
    }*/
    try{
      response.status(200).json(results.rows)
    }catch(e){
      console.log(e)
    }
  })
};
const updatemydata = async (request, response) => {
  const id = parseInt(request.params.id)
  const { datum_obavljanja_pocetak,datum_obavljanja_kraj,br_sati,prekovremeni,odsutan,rad_od_kuce,nocni_rad,napomena,blagdan } = request.body
  //console.log(br_sati)
  pool.query('UPDATE kalendar SET datum_obavljanja_pocetak=$2,datum_obavljanja_kraj=$3,br_sati=$4,prekovremeni=$5,odsutan=$6,rad_od_kuce=$7,nocni_rad=$8,napomena=$9,blagdan=$10 WHERE id=$1',[id,datum_obavljanja_pocetak,datum_obavljanja_kraj,br_sati,prekovremeni,odsutan,rad_od_kuce,nocni_rad,napomena,blagdan], (error, results) => {
    /*if (error) {
      throw error
    }*/
    try{
      response.status(200).json(results.rows)
    }catch(e){
      console.log(e)
    }
  })
}
/*const getimg=async(req,res)=>{
  pool.query('SELECT slika.img FROM slika WHERE slika.name=$1',["1"], (error, results) => {
    try{
let a=res.status(200).json(results.rows[0].img)
var jsonObj = JSON.parse(a);
var jsonStr = JSON.stringify(jsonObj);
const buf = Buffer.from(jsonStr)
console.log(buf)

//res.status(200).arrayBuffer(results.rows[0].img)
//res.end(results.rows[0].img)
//res.end(img.img)
    }catch(e){
      console.log(e);
    }
  })
}*/
const lock = async (request, response) => {
  const id = parseInt(request.params.id)
  const { zakljucano } = request.body
  pool.query('UPDATE kalendar SET zakljucano=$2 WHERE id=$1',[id, zakljucano], (error, results) => {
    try{
      response.status(200).json(results.rows)
    }catch(e){
      console.log(e)
    }
  })
}
const lockeddata = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT kalendar.id, kalendar.datum_obavljanja_pocetak, kalendar.datum_obavljanja_kraj, kalendar.br_sati, kalendar.prekovremeni, kalendar.rad_od_kuce, kalendar.odsutan, kalendar.nocni_rad, kalendar.postavljeno, kalendar.blagdan, kalendar.napomena, kalendar.zakljucano,slika.name,slika.img FROM kalendar LEFT JOIN slika ON kalendar.id=slika.kalendar_id WHERE kalendar.korisnik_id=$1 AND kalendar.zakljucano=true ORDER BY postavljeno DESC', [id], (error, results) => {
    /*if (error) {
      throw error
    }*/
    try{
      response.status(200).json(results.rows)
    }catch(e){
      console.log(e)
    }
  })
};
const getalldata = (request, response) => {
  const id = parseInt(request.params.id)
  //console.log(id)

  pool.query('SELECT DISTINCT email FROM kalendar', (error, results) => {
    /*if (error) {
      throw error
    }*/
    try{
      response.status(200).json(results.rows)
    }catch(e){
      console.log(e)
    }
  })
};
const getalldatabyemail = (request, response) => {
  const id = request.params.id.toString()
  //console.log(id)
  //console.log(id)

  pool.query('SELECT * FROM kalendar WHERE email=$1', [id], (error, results) => {
    /*if (error) {
      throw error
    }*/
    try{
      response.status(200).json(results.rows)
      //console.log(results.rows)
    }catch(e){
      console.log(e)
    }
  })
};
module.exports = {
  createUser,
  login,
  createData,
  createImage,
  dataById,
  updatemydata,
  lock,
  lockeddata,
  getalldata,
  getalldatabyemail
};
