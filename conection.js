const mySql = require("mysql");
const db = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_universe",
});
// supaya bisa dipake difile manapun, diluar file connectionjs ini kita export module
module.exports = db;
