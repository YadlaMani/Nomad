import mongoose from "mongoose";
const mongoURI = process.env.MONGO_URI;
async function connectDB() {
  try {
    mongoose.connect(mongoURI).then(() => console.log("Connected!"));
  } catch (err) {
    console.log(err);
  }
}
export default connectDB;
