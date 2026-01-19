const connection = require("../src/connection/connection")
const express = require("express");

const port = 4500;
const app = express();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});