import mysql, { QueryError } from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tscrud",
});

connection.connect((err: QueryError | null) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }

  console.log("Database connected successfully");
});

export default connection;
