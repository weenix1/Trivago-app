import { DestinationSchema } from "./schema";
import mongoose from "mongoose";

export const DestinationModel = mongoose.model(
  "destination",
  DestinationSchema
);
