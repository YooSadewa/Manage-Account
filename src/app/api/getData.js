// pages/api/getData.js
import mysql from 'mysql2';

// Membuat koneksi ke database MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'apiauth_uib',
});

// Menggunakan Promise untuk menghandle query
const queryDatabase = (query) => {
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// API route untuk mengambil data dari tabel
export default async function handler(req, res) {
  try {
    // Misalnya, mengambil data dari tabel 'users'
    const results = await queryDatabase('SELECT * FROM users');
    res.status(200).json(results); // Mengirimkan hasil ke client
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
}
