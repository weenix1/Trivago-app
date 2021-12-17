import mongoose from "mongoose";

export interface destination {
  city: string;
}

const { Schema, model } = mongoose;

export const DestinationSchema = new Schema<destination>(
  {
    city: { type: String, required: true },
  },
  {
    timestamps: true, // adds and manage createdAt and updatedAt fields
  }
);
