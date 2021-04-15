import mongoose, { Document, Model } from 'mongoose';

export interface Customer {
  _id?: string;
  name: string;
  gender: string;
  dt_birthday: Date;
  age: number;
  city_id: string;
}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    dt_birthday: { type: Date, required: true },
    age: { type: Number, required: true },
    city_id: { type: String, required: true },
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

interface CustomerModel extends Omit<Customer, '_id'>, Document {}
export const Customer: Model<CustomerModel> = mongoose.model(
  'Customer',
  schema
);
