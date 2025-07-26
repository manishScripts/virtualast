// get user detail by id gen by auth
import User from "../models/user.models.js";
export const getUserDetail = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if(!user) return res.status(400).json({message: "User not found"});

    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({message: "Error getting user detail", error: error.message});
  }
}