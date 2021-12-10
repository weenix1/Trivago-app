import mongoose from "mongoose";

export const DestinationSchema = new mongoose.Schema(
  {
    city: { type: String, required: true }
},
  {
    timestamps: true, // adds and manage createdAt and updatedAt fields
  }
);