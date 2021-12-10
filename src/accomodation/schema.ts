import mongoose from "mongoose";

export const AccomodationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    maxGuests: { type: Number, required: true },
    destinations: [
      {
        city: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true, // adds and manage createdAt and updatedAt fields
  }
);
