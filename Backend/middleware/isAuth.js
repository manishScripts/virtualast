import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(!token) return res.status(400).json({message: "Unauthorized"});
    const verifyToken = await jwt.verify(token,process.env.JWT_SECRET);

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    res.status(500).json({message: "isAuth middleware error" , error: error.message});
  }
}

