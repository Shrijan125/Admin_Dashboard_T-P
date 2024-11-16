import mongoose, { Schema } from 'mongoose';

export interface RecruitersProps {
  _id: string;
  company: string;
  url: string;
}

const RecruitersSchema: Schema<RecruitersProps> = new Schema<RecruitersProps>({
  company: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

export const Recruiter =
  (mongoose.models.Recruiter as mongoose.Model<RecruitersProps>) ||
  mongoose.model<RecruitersProps>('Recruiter', RecruitersSchema);
