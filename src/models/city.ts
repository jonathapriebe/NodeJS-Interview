import mongoose, { Document, Model } from 'mongoose';

export interface City {
  _id?: string;
  name: string;
  state: string;
}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    state: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

interface CityModel extends Omit<City, '_id'>, Document {}
export const City: Model<CityModel> = mongoose.model('City', schema);
