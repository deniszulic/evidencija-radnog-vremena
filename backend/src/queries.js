require("dotenv").config();
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "api",
  password: "admin",
  port: 5432,
});
const createUser = async (request, response) => {
  const { email, admin, datumReg, ime, prezime } = request.body;
  const { lozinka } = request.body;
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(lozinka, salt);
  pool.query(
    "INSERT INTO korisnik (email, lozinka,admin, datumReg, ime, prezime) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
    [email, hash, admin, datumReg, ime, prezime],
    (error, results) => {
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
      try {
        bcrypt
          .compare(lozinka, results.rows[0].lozinka)
          .then(function (result) {
            if (result && results.rows[0].lozinka) {
              delete results.rows[0].lozinka;
              let token = jwt.sign(
                email,
                process.env.JWT_KEY,
                { algorithm: "HS512" },
                { expiresIn: "7d" }
              );
              response.status(200).json(results.rows);
            } else {
              throw new Error("Cannot authenticate");
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  );
};
const createData = async (request, response) => {
  const {
    br_sati,
    prekovremeni,
    blagdan,
    nocni_rad,
    odsutan,
    rad_od_kuce,
    napomena,
    datum_obavljanja_pocetak,
    datum_obavljanja_kraj,
    email,
    korisnik_id,
    postavljeno,
  } = request.body;
  pool.query(
    "INSERT INTO kalendar (br_sati,prekovremeni,blagdan,nocni_rad,odsutan,rad_od_kuce,napomena,datum_obavljanja_pocetak,datum_obavljanja_kraj,email,korisnik_id,postavljeno) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id",
    [
      br_sati,
      prekovremeni,
      blagdan,
      nocni_rad,
      odsutan,
      rad_od_kuce,
      napomena,
      datum_obavljanja_pocetak,
      datum_obavljanja_kraj,
      email,
      korisnik_id,
      postavljeno,
    ],
    (error, results) => {
      try {
        response.status(200).send(results.rows[0].id.toString());
      } catch (e) {
        console.log(e);
      }
    }
  );
  const output = `
        <h1>Postavili ste</h1>
        <p>Broj sati:${br_sati}</p>
        <p>Broj prekovremenih sati:${prekovremeni}</p>
        <p>Sati za vrijeme blagdana:${blagdan}</p>
        <p>Nocni rad:${nocni_rad}</p>
        <p>Broj odsutnih sati:${odsutan}</p>
        <p>Rad ok duće? ${rad_od_kuce}</p>
        <p>Datum početka:${datum_obavljanja_pocetak}</p>
        <p>Datum kraja:${datum_obavljanja_kraj}</p>
        <p>Napomena:${napomena}</p>`;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "fe059285@gmail.com",
      pass: "fakepass666",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail({
      from: '"wHours" <fe059285@gmail.com>',
      to: `${email}`,
      subject: "Potvrda podataka ✔",
      text: "Automatski generirano",
      html: output,
    });
  } catch (e) {
    console.log(e);
  }
};
const createImage = async (request, response) => {
  const { name, data } = request.files.image;
  let id = Number(name);
  let name1 = name + "_" + Date.now();
  if (Buffer.byteLength(data) > 512000) {
    response.status(500);
  } else {
    pool.query(
      "INSERT INTO slika (name,img,kalendar_id) VALUES ($1, $2, $3) RETURNING id",
      [name1, data, id],
      (error, results) => {
        try {
          response.status(200).send(results.rows[0].id.toString());
        } catch (e) {
          console.log(e);
        }
      }
    );
  }
};
const dataById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT kalendar.id, kalendar.datum_obavljanja_pocetak, kalendar.datum_obavljanja_kraj, kalendar.br_sati, kalendar.prekovremeni, kalendar.rad_od_kuce, kalendar.odsutan, kalendar.nocni_rad, kalendar.postavljeno, kalendar.blagdan, kalendar.napomena, kalendar.zakljucano,slika.name,slika.img FROM kalendar LEFT JOIN slika ON kalendar.id=slika.kalendar_id WHERE kalendar.korisnik_id=$1 AND kalendar.zakljucano IS NOT true ORDER BY kalendar.datum_obavljanja_pocetak DESC",
    [id],
    (error, results) => {
      try {
        response.status(200).json(results.rows);
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const updatemydata = async (request, response) => {
  const id = parseInt(request.params.id);
  const {
    email,
    datum_obavljanja_pocetak,
    datum_obavljanja_kraj,
    br_sati,
    prekovremeni,
    odsutan,
    rad_od_kuce,
    nocni_rad,
    napomena,
    blagdan,
    zakljucano,
    prihvaceno_od_admina,
    razlog_admin,
  } = request.body;
  pool.query(
    "UPDATE kalendar SET datum_obavljanja_pocetak=$2,datum_obavljanja_kraj=$3,br_sati=$4,prekovremeni=$5,odsutan=$6,rad_od_kuce=$7,nocni_rad=$8,napomena=$9,blagdan=$10, zakljucano=$11, prihvaceno_od_admina=$12, razlog_admin=$13 WHERE id=$1",
    [
      id,
      datum_obavljanja_pocetak,
      datum_obavljanja_kraj,
      br_sati,
      prekovremeni,
      odsutan,
      rad_od_kuce,
      nocni_rad,
      napomena,
      blagdan,
      zakljucano,
      prihvaceno_od_admina,
      razlog_admin,
    ],
    (error, results) => {
      try {
        response.status(200).json(results.rows);
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const updatemydata1 = async (request, response) => {
  const id = parseInt(request.params.id);
  const {
    email,
    datum_obavljanja_pocetak,
    datum_obavljanja_kraj,
    br_sati,
    prekovremeni,
    odsutan,
    rad_od_kuce,
    nocni_rad,
    napomena,
    blagdan,
    zakljucano,
    prihvaceno_od_admina,
    razlog_admin,
  } = request.body;
  pool.query(
    "UPDATE kalendar SET datum_obavljanja_pocetak=$2,datum_obavljanja_kraj=$3,br_sati=$4,prekovremeni=$5,odsutan=$6,rad_od_kuce=$7,nocni_rad=$8,napomena=$9,blagdan=$10, zakljucano=$11, prihvaceno_od_admina=$12, razlog_admin=$13 WHERE id=$1",
    [
      id,
      datum_obavljanja_pocetak,
      datum_obavljanja_kraj,
      br_sati,
      prekovremeni,
      odsutan,
      rad_od_kuce,
      nocni_rad,
      napomena,
      blagdan,
      zakljucano,
      prihvaceno_od_admina,
      razlog_admin,
    ],
    (error, results) => {
      try {
        response.status(200).json(results.rows);
      } catch (e) {
        console.log(e);
      }
    }
  );
  const output = `
        <h1>Obavijest!</h1>
        <p>Admin je upravo ažurirao vaše podatke</p>`;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "fe059285@gmail.com",
      pass: "fakepass666",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail({
      from: '"wHours" <fe059285@gmail.com>',
      to: `${email}`,
      subject: "Admin update",
      text: "Automatski generirano",
      html: output,
    });
  } catch (e) {
    console.log(e);
  }
};
const lock = async (request, response) => {
  const id = parseInt(request.params.id);
  const { zakljucano } = request.body;
  pool.query(
    "UPDATE kalendar SET zakljucano=$2 WHERE id=$1",
    [id, zakljucano],
    (error, results) => {
      try {
        response.status(200).json(results.rows);
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const lockeddata = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT kalendar.id, kalendar.datum_obavljanja_pocetak, kalendar.datum_obavljanja_kraj, kalendar.br_sati, kalendar.prekovremeni, kalendar.rad_od_kuce, kalendar.odsutan, kalendar.nocni_rad, kalendar.postavljeno, kalendar.blagdan, kalendar.napomena, kalendar.zakljucano,slika.name, kalendar.prihvaceno_od_admina, kalendar.razlog_admin, slika.img FROM kalendar LEFT JOIN slika ON kalendar.id=slika.kalendar_id WHERE kalendar.korisnik_id=$1 AND kalendar.zakljucano=true ORDER BY postavljeno DESC",
    [id],
    (error, results) => {
      try {
        response.status(200).json(results.rows);
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const getalldata = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT DISTINCT ON (email) email, postavljeno, zakljucano FROM kalendar WHERE zakljucano IS NOT TRUE ORDER BY email, postavljeno DESC",
    (error, results) => {
      results.rows.sort((a, b) =>
        a.postavljeno > b.postavljeno
          ? -1
          : b.postavljeno > a.postavljeno
          ? 1
          : 0
      );

      try {
        response.status(200).json(results.rows);
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const getalldata1 = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT DISTINCT ON (email) email, postavljeno, zakljucano FROM kalendar WHERE zakljucano IS TRUE ORDER BY email, postavljeno DESC",
    (error, results) => {
      results.rows.sort((a, b) =>
        a.postavljeno > b.postavljeno
          ? -1
          : b.postavljeno > a.postavljeno
          ? 1
          : 0
      );
      try {
        response.status(200).json(results.rows);
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const getalldatabyemail = (request, response) => {
  const id = request.params.id.toString();
  pool.query(
    "SELECT kalendar.id, kalendar.datum_obavljanja_pocetak, kalendar.datum_obavljanja_kraj, kalendar.br_sati, kalendar.prekovremeni, kalendar.rad_od_kuce, kalendar.odsutan, kalendar.nocni_rad, kalendar.postavljeno, kalendar.blagdan, kalendar.napomena, kalendar.zakljucano,slika.name,slika.img FROM kalendar LEFT JOIN slika ON kalendar.id=slika.kalendar_id WHERE kalendar.email=$1 AND kalendar.zakljucano IS NOT true ORDER BY kalendar.postavljeno DESC",
    [id],
    (error, results) => {
      try {
        response.status(200).json(results.rows);
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const getalldatabyemail1 = (request, response) => {
  const id = request.params.id.toString();
  pool.query(
    "SELECT kalendar.id, kalendar.datum_obavljanja_pocetak, kalendar.datum_obavljanja_kraj, kalendar.br_sati, kalendar.prekovremeni, kalendar.rad_od_kuce, kalendar.odsutan, kalendar.nocni_rad, kalendar.postavljeno, kalendar.blagdan, kalendar.napomena, kalendar.zakljucano, kalendar.prihvaceno_od_admina, kalendar.razlog_admin, kalendar.email, slika.name,slika.img FROM kalendar LEFT JOIN slika ON kalendar.id=slika.kalendar_id WHERE kalendar.email=$1 AND kalendar.zakljucano=true ORDER BY kalendar.postavljeno DESC",
    [id],
    (error, results) => {
      try {
        response.status(200).json(results.rows);
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const getadminmydata = (request, response) => {
  const id = request.params.id.toString();
  pool.query(
    "SELECT ime, prezime, datumreg FROM korisnik WHERE id=$1",
    [id],
    (error, results) => {
      try {
        response.status(200).json(results.rows);
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const deletedata = (request, response) => {
  const id = request.params.id;
  pool.query("DELETE FROM kalendar WHERE id=$1", [id], (error, results) => {
    try {
      response.status(200).json(results.rows);
    } catch (e) {
      console.log(e);
    }
  });
};
const updateadmindata = async (request, response) => {
  const id = parseInt(request.params.id);
  const { ime, prezime } = request.body;
  pool.query(
    "UPDATE korisnik SET ime=$2, prezime=$3 WHERE id=$1",
    [id, ime, prezime],
    (error, results) => {
      try {
        response.status(200).json(results.rows);
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const updateadminpass = async (request, response) => {
  const { lozinka } = request.body;
  const id = parseInt(request.params.id);
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(lozinka, salt);
  pool.query(
    "UPDATE korisnik SET lozinka=$2 WHERE id=$1",
    [id, hash],
    (error, results) => {
      try {
        response.status(200).json(results.rows);
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const statisticdata = (request, response) => {
  const id = request.params.id.toString();
  pool.query(
    "SELECT SUM(br_sati) AS br_sati, SUM(prekovremeni) AS prekovremeni, SUM(odsutan) AS odsutan, SUM (nocni_rad) AS nocni_rad, SUM (blagdan) AS blagdan FROM kalendar WHERE korisnik_id=$1",
    [id],
    (error, results) => {
      try {
        response.status(200).json(results.rows);
      } catch (e) {
        console.log(e);
      }
    }
  );
};
const lockeduserdata = (request, response) => {
  const id = request.params.id.toString();
  pool.query(
    "SELECT zakljucano FROM kalendar WHERE zakljucano IS NOT true AND korisnik_id=$1",
    [id],
    (error, results) => {
      try {
        response.status(200).json(results.rows);
      } catch (e) {
        console.log(e);
      }
    }
  );
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
  getalldata1,
  getalldatabyemail,
  getalldatabyemail1,
  deletedata,
  getadminmydata,
  updateadmindata,
  updateadminpass,
  statisticdata,
  lockeduserdata,
  updatemydata1,
};
