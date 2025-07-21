import mongoose from "mongoose";
const connectdb  = async()=>{
  try{
    await mongoose.connect(process.env.MOONGO_URI)
    console.log("MongoDB connected successfully");
  }catch(error){
    console.error("Error connecting to MongoDB:", error)
  }
}

export default connectdb;
// This code connects to a MongoDB database using Mongoose.