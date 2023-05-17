const jwt = require("jsonwebtoken");
const access_token_key = "secretKey2023"
const verify = async (req, res, next) => {
    if(!req) next();
    const token  = req.headers.auth_token ;
    console.log(token);
      jwt.verify(token,access_token_key,(err,user)=>{
        if (err) {
          console.log("verification failed")
          return res.status(403).json({ message: "FAILED VERIFICATION!!" });
        }
        req.body.user = user;
        next();
      })
  }
  exports.verify = verify;