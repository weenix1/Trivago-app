import mongoose from "mongoose";
import { Schema,model } from "mongoose";
export const AccomodationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    maxGuests: { type: Number, required: true },
    //city:  {type: tring}
    destination: [{ type: Schema.Types.ObjectId, ref:"destination"}],
  },
  {
    timestamps: true, // adds and manage createdAt and updatedAt fields
  }
);
