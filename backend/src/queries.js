import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
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
  const { email} = request.body
  //const {lozinka}=bcrypt.hash(request.body,8);
  const {lozinka}=request.body
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(lozinka, salt);
  pool.query('INSERT INTO admin (email, lozinka) VALUES ($1, $2) RETURNING id', [email, hash], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}
module.exports={
  createUser
}