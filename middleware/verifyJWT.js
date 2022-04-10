const jwt = require("jsonwebtoken");
//

// JWTが正しいか確認
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  //   req.headers.authorization || req.headers.Authorization; //req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  console.log(authHeader); // Bearer token
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // invalid token
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
