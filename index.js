const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./conection");
const response = require("./response");

// kalo res kan, ngirim keluar, kalo req itu ngambil yang dari luar kedalam
// jadi req ini apa apa yang dikirim dari postman

// yang artinya kita ngambil format dari front end  yang ngirim kekita sebuah request berupa post method, kita ubah jadi json format
app.use(bodyParser.json());
// app.get("/", (req, res) => {
//   db.query("SELECT * FROM mahasiswa", (err, result) => {
//     // hasil data dari mysql
//     response(200, result, "get all data  from mahasiswa", res);
//   });
// });

// app.get("/hello", (req, res) => {
//   console.log({ urlParams: req.query });
//   res.send("Hallo Halaman utama");
// });

// app.get("/find", (req, res) => {
//   const sql = `SELECT nama FROM mahasiswa WHERE nim = "${req.query.nim}"`;
//   db.query(sql, (err, result) => {
//     response(200, result, "get first data from mahasiswa", res);
//   });
//   // res.send("Ini adalah halaman mahasiswa");
// });

// app.post("/login", (req, res) => {
//   console.log({ requestFromOutside: req.body });
//   res.send("Berhasil Login!!");
// });

// app.put("/username", (req, res) => {
//   console.log({ updateData: req.body });
//   res.send("update berhasil");
// });

app.get("/", (req, res) => {
  response(200, "API v1 ready to go", "Ini Message", res);
});

app.get("/mahasiswa", (req, res) => {
  db.query("SELECT * FROM mahasiswa", (error, result) => {
    if (error) throw error;
    response(200, result, "GET ALL DATA FROM MAHASISWA", res);
  });
});

app.get("/mahasiswa/:nim", (req, res) => {
  const urlParams = req.params.nim;
  db.query(
    `SELECT * FROM mahasiswa WHERE nim="${urlParams}"`,
    (error, result) => {
      if (error) throw error;
      response(200, result, "GET FIRST ROW DATA", res);
    }
  );
});

app.post("/mahasiswa", (req, res) => {
  const { nim, nama, alamat, kelas } = req.body;
  const sql = `INSERT INTO mahasiswa (nim, nama, alamat, kelas) VALUES (${nim},'${nama}','${alamat}', '${kelas}') `;
  db.query(sql, (error, result) => {
    if (error) response(500, "Invalid", "error", res);
    // memfix ? klo ini ada isinya maka eksekusi ke hal selanjutnya
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        id: result.inserId,
      };
      response(200, data, "Berhasil Menambahkan Data!", res);
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  const { nim, nama, kelas, alamat } = req.body;
  const sql = `UPDATE mahasiswa SET nama = '${nama}', kelas='${kelas}', alamat  = '${alamat}' WHERE nim = ${nim}`;
  db.query(sql, (error, result) => {
    if (error) response(500, "invalid Data", "Error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        message: result.message,
      };
      response(200, data, "Update Data Succesfuly", res);
    } else {
      response(404, "Mohon Maaf", "error", res);
    }
  });
});

app.delete("/mahasiswa", (req, res) => {
  const { nim } = req.body;
  const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`;
  db.query(sql, (error, result) => {
    if (error) response(500, "invalid", "error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
      };
      response(200, data, "DELETE DATA SUCCESFULLY", res);
    } else {
      response(404, "Mohon Maaf", "error", res);
    }
  });
});
// app.get("/mahasiswa", (req, res) => {
//   console.log(`${req.query.nim}`);
//   res.send(`${req.query.nim}`);
// });

// app.get("/mahasiswa/:nim", (req, res) => {
//   const paramsUrl = req.params.nim;
//   console.log({ paramsUrl: paramsUrl });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
