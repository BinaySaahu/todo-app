const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const uri =
  "mongodb+srv://sahubinay:mypassword@cluster0.nd7912y.mongodb.net/?retryWrites=true&w=majority";

const register = async (req, res) => {
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
       return res.status(409).send("User already exists,Please login");
      } else {
        const sanitizedEmail = email.toLowerCase();
  
        const data = {
          user_id: generateduserId,
          user_name: name,
          email: sanitizedEmail,
          hashed_password: hashedPassword,
          tasks: [],
        };
        const insertedUser = await users.insertOne(data);
  
        const token = jwt.sign(insertedUser, sanitizedEmail, {
          expiresIn: 60 * 24,
        });
        return res.status(201).json({ token, userId: data.user_id });
      }
    } catch (err) {
      console.log(err);
    }
  };
  exports.register = register;