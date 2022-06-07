const Pool = require('pg').Pool;
const pool = new Pool({
  user: "postgres",
  password: '#', //пароль базы данных
  host: 'localhost',
  port: #, //порт
  database: "#" //название базы данных
});
module.exports = pool;
