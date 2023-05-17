const PORT = 8000;
const express = require("express");
require("dotenv").config();
// const access_token_key = 'secret2023';
// const uri =
//   "mongodb+srv://sahubinay:mypassword@cluster0.nd7912y.mongodb.net/?retryWrites=true&w=majority";
// const { MongoClient } = require("mongodb");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const { v4: uuidv4 } = require("uuid");
const app = express();
const cors = require("cors");
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.json("hello there");
// });

app.use("/auth",require("./routers/user/router"));
app.use("/dash",require("./routers/dashboard/router"));

app.use("*", (req, res) => {
  console.log("error 404");
  return res.status(404).send("404 not found");
});
app.listen(PORT, () => {
  console.log("Server running on port 8000");
});
