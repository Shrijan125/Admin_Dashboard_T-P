import mongoose, { Schema } from 'mongoose';
const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const Admin =
  mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
