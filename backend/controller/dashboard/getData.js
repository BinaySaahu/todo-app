const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://sahubinay:mypassword@cluster0.nd7912y.mongodb.net/?retryWrites=true&w=majority";

async function getdata(req, res) {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const database = client.db("app-data");
      const users = database.collection("users");
      var result = await users.findOne({ email: req.body.user.username });
      console.log(req.body.user.username);
      console.log(result);
      if (result) {
        var data = {};
        data.email = result.email;
        data.name = result.user_name;
        data.tasks = result.tasks;
        res.status(200).json(data);
      }
    } catch (err) {
      res.status(err.errcode).json(err.msg);
      console.log(err);
    }
  }
  
  exports.getdata = getdata;
  