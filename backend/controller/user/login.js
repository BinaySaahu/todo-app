
const uri =
  "mongodb+srv://sahubinay:mypassword@cluster0.nd7912y.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const access_token_key = "secretKey2023"
const login = async (req, res) => {
    const client = new MongoClient(uri);
    const { email, password } = req.body;
    console.log(`login request recieved for ${email}`)
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
        const token = jwt.sign({username:user.email},access_token_key, {
          expiresIn: 60 * 24,
        });
       return res
          .status(201)
          .json({
            token,
            userId: user.user_id,
            name: user.user_name,
            tasks: user.tasks,
          });
      } else {
        return res.status(400).send("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
    }
  };
  exports.login = login;