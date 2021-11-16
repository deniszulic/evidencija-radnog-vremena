require("dotenv").config();
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'admin',
  port: 5432,
})
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
  const { email,admin} = request.body
  //const {lozinka}=bcrypt.hash(request.body,8);
  const {lozinka}=request.body
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(lozinka, salt);
  pool.query('INSERT INTO korisnik (email, lozinka,admin) VALUES ($1, $2, $3) RETURNING id', [email, hash,admin], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}
const login = async (request, response) => {
  const { email,lozinka} = request.body
  pool.query('SELECT lozinka, admin, email FROM korisnik WHERE email=$1', [email], (error, results) => {
    if (error) {
      throw error
    }
    //console.log(results.rows[0].admin)
    bcrypt.compare(lozinka, results.rows[0].lozinka).then(function(result) { 
      if(result && results.rows[0].lozinka){
        delete results.rows[0].lozinka;
        console.log(results.rows)
        let token = jwt.sign(email, process.env.JWT_KEY, 
          {algorithm: "HS512"},
          {expiresIn: "7d"}
        );
        return{
          token,
          admin:results.rows[0].admin,
          email:results.rows[0].email
        }
      }
      else{
        throw new Error("Cannot authenticate");
      }
  });
    response.status(200).json(results.rows);
  })
}
module.exports={
  createUser,
  login
}