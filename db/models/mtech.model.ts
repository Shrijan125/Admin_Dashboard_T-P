import mongoose, { Schema } from 'mongoose';
import { StatsFormProps } from './btech.model';

const MTechModel: Schema<StatsFormProps> = new Schema({
  year: {
    type: String,
    required: true,
    unique: true,
  },
  lowestpackage: {
    type: String,
    required: true,
  },
  lowestpackageunit: {
    type: String,
    default: 'lpa',
  },
  medianpackage: {
    type: String,
  },
  medianpackageunit: {
    type: String,
    default: 'lpa',
  },
  averagepackage: {
    type: String,
    required: true,
  },
  averagepackageunit: {
    type: String,
    default: 'lpa',
  },
  highestpackageoncampus: {
    type: String,
    required: true,
  },
  highestpackageoncampusunit: {
    type: String,
    default: 'lpa',
  },
  highestpackageoffcampusunit: {
    type: String,
    default: 'lpa',
  },
  highestpackageoffcampus: {
    type: String,
    default: '',
  },
  noofcompaniesvisited: {
    type: String,
    default: '',
  },
  placementpercentage: {
    type: String,
    required: true,
  },
});

export const Mtech =
  (mongoose.models.Mtech as mongoose.Model<StatsFormProps>) ||
  mongoose.model<StatsFormProps>('Mtech', MTechModel);
