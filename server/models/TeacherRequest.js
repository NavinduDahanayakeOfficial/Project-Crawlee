import mongoose from "mongoose";
const { Schema } = mongoose;

const TeacherRequestSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  subjects: {
    type: String,
    required: true,
  },
  
  experience: {
    type: String,
    required: true,
  },
  requestedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
},{timestamps: true});

export default mongoose.model("TeacherRequest", TeacherRequestSchema);
