import mongoose, { Schema } from 'mongoose';

export interface StatsFormProps {
  _id: string;
  year: string;
  noofcompaniesvisited: string;
  placementpercentage: string;
  lowestpackage: string;
  lowestpackageunit: string;
  medianpackage: string;
  medianpackageunit: string;
  averagepackage: string;
  averagepackageunit: string;
  highestpackageoncampus: string;
  highestpackageoncampusunit: string;
  highestpackageoffcampus: string;
  highestpackageoffcampusunit: string;
}

const BTechModel: Schema<StatsFormProps> = new Schema({
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
    default:''
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
  highestpackageoffcampus: {
    type: String,
    default:''
  },
  highestpackageoffcampusunit: {
    type: String,
    default: 'lpa',
  },
  noofcompaniesvisited: {
    type: String,
    default:''
  },
  placementpercentage: {
    type: String,
    required: true,
  },
});

export const Btech =
  (mongoose.models.Btech as mongoose.Model<StatsFormProps>) ||
  mongoose.model<StatsFormProps>('Btech', BTechModel);
