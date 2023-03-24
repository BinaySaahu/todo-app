const PORT = 8000;
const express = require("express");
const uri =
  "mongodb+srv://sahubinay:mypassword@cluster0.nd7912y.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.listen(PORT, () => {
  console.log("Server running on port 8000");
});

app.get("/", (req, res) => {
  res.json("hello there");
});

app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const { name, email, password } = req.body;
  const generateduserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(409).send("User already exists,Please login");
      return;
    } else {
      const sanitizedEmail = email.toLowerCase();

      const data = {
        user_id: generateduserId,
        user_name: name,
        email: sanitizedEmail,
        hashed_password: hashedPassword,
        tasks:[]
      };
      const insertedUser = await users.insertOne(data);

      const token = jwt.sign(insertedUser, sanitizedEmail, {
        expiresIn: 60 * 24,
      });
      res.status(201).json({ token, userId: data.user_id });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const user = await users.findOne({ email });
    const correctPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );
    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });
      res.status(201).json({ token, userId: user.user_id,name:user.user_name });
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

app.put("/dashboard", async (req, res) => {
  const client = new MongoClient(uri);
  const { newItem, userid } = req.body;
  console.log(userid);
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userid };
    const updateDocument = {
      $push: {
        tasks: newItem,
      },
    };
    console.log(updateDocument);
    const insertedUser = await users.updateOne(query, updateDocument);
  } finally {
    await client.close();
  }
});

app.get("/view", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.json(user);
  } finally {
    await client.close();
  }
});
app.put("/view", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.body.userId;
  const item = req.body.item;
  console.log(item);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    // const query = {user_id:userId};
    await users.updateOne({ user_id: userId }, { $pull: { tasks: item } });
  } finally {
    await client.close();
  }
});
