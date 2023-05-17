const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://sahubinay:mypassword@cluster0.nd7912y.mongodb.net/?retryWrites=true&w=majority";

 
 const dash = async (req, res) => {
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
  }
  exports.dash = dash;