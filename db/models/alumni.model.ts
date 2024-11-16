import mongoose, { Schema } from 'mongoose';

export interface AlumniProp {
  _id: string;
  name: string;
  year: string;
  company: string;
  role: string;
  image: string;
}

const AlumniModel: Schema<AlumniProp> = new Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const Alumni =
  (mongoose.models.Alumni as mongoose.Model<AlumniProp>) ||
  mongoose.model('Alumni', AlumniModel);
