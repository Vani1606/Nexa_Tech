const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized. Token not provided." });
  }

  
  const jwtToken = authHeader.replace("Bearer", "").trim();

  try {
   
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

   
    const userData = await User.findOne({ email: decodedToken.email }).select("-password");

    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }

   
    req.token = jwtToken;
    req.user = userData;
    req.userID = userData._id;

    
    next();
  } catch (error) {
   
    console.error("Error in authentication middleware:", error);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;