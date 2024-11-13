const mongoose = require("mongoose");

const textFileSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    unique: true,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});
export default mongoose.models.TextFile ||
  mongoose.model("TextFile", textFileSchema);
