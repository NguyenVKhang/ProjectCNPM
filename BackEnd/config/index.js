// const mongoose = require("mongoose");
// const DB_URI = process.env.DB_URI;
// mongoose.set('strictQuery', true);
// async function connect() {
//   try {
//     await mongoose.connect(DB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connect successfully!!!");
//   } catch (error) {
//     console.log("Connect fail!!!");
//   }
// }

// module.exports = { connect };
// connect mysql
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'btl_cnpm'
});



export default pool;