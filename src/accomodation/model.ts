import { AccomodationSchema } from "./schema";
import mongoose from "mongoose";

export const AccomodationModel = mongoose.model(
  "accomodation",
  AccomodationSchema
);
