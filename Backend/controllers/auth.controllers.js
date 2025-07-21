import user from "../models/user.models.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existemail = await user.findOne({ email });
    if (existemail) {
      return res.status(400).json({ message: "email already exists !" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long !" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newuser = await user.create({
      name,
      email,
      password: hashpassword,
    });
    const token = await genToken(newuser._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    });

    return res.status(201).json({
      _id: newuser._id,
      name: newuser.name,
      email: newuser.email,
      token,
    });
  } catch (error) {
    console.error("Error in signUp:", error ,error.stack);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login function
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await user.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: "email not exists !" });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password !" });
    }

    const token = await genToken(foundUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    });

    return res.status(200).json({
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      token,
    });
  } catch (error) {
    console.error("Error in Login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Logout function
export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in Logout:", error);
    return res.status(500).json({ message: "Logout error" });
  }
};
