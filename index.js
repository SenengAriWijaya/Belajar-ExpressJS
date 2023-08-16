const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())


app.get("/", (req, res) => {
  response(200, "API v1 ready to go", "SUCCESS", res)
})

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM mahasiswa"
  db.query(sql, (err, fields) => {
    if(err) throw err
    response(200, fields, "mahasiswa get list", res)
  })
})

app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
  db.query(sql, (err, fields) => {
    if(err) throw err
    response(200, fields, "get detail mahasiswa", res)
  })
})


app.post("/mahasiswa", (req, res) => {
  // membuat req dari form di bagian front end
  const {nim, namaLengkap, kelas, alamat} = req.body

  const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, '${namaLengkap}', '${kelas}', '${alamat}')`

  db.query(sql, (err, fields) => {
    if(err) response(500, "invalid", "error", res)
    if(fields?.affectedRows){
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId
      }
      response(200, data, "Data Added Successfuly", res)
    }
  })
})
app.put("/mahasiswa", (req, res) => {
  // data yang di input dari front end
  const { nim, namaLengkap, kelas, alamat } = req.body
  const sql = `UPDATE mahasiswa SET nama_lengkap = '${namaLengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = ${nim}`

  db.query(sql, (err, fields) => {
    // untuk melakukan cek apakah API berhasil atau tidak 
    // console.log(fields)
    if(err) response(500, "Invalid", "error", res)
    if(fields?.affectedRows){
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message
      }
      response(200, data, "Update Data Successfuly", res)
    }else{
      response(404, "User not found", "error", res)
    }
   
  })

  
})
app.delete("/mahasiswa", (req, res) => {
  const { nim } = req.body
  const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`
  db.query(sql, (err, fields) => {
    if(err) response(500, "Invalid", "error", res)
    if(fields?.affectedRows){
      const data = {
        isDeleted: fields.affectedRows,
      }
      response(200, data, "Deleted Data Successfuly", res)
    }else{
      response(404, "User not found", "error", res)
    }
  })
})

// app.get('/', (req, res) => {
//   const sql = "SELECT * FROM mahasiswa"
//   db.query(sql, (error, result) => {
//     // hasil data dari mysql
//     response(200, result, "get all data from mahasiswa", res)

//   })
// })


// app.get('/find', (req, res) => {
//   const sql = `SELECT nama_lengkap FROM mahasiswa WHERE nim = ${req.query.nim}`
//   db.query(sql, (error, result) => {
//     response(200, result, "find mahasiswa name", res)
//   })

// })

// // querry dibawah menampilkan semua data yang di input. jika ingin menampilkan data alamat saja bisa menggunakan querry.alamat
// app.get('/hello', (req, res) => {
//   console.log({urlParam: req.query})
//   res.send('Hello World Lalala')
// })

// app.post('/login', (req, res) => {
//   // kalau ingin troubleshoting menggunakan console wajib menggunakan kurung kurawal lalu kita bikin key nya apa 
//   console.log({ RequestFromOutSide: req.body })
//   res.send('Login berhasil')
// })

// app.put('/username', (req, res) => {
//   console.log({updateData: req.body})
//   res.send('Update berhasil')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})