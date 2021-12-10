import express from "express";
import { AccomodationModel } from "../accomodation/model";
const destinationRouter = express.Router();
import { DestinationModel } from "./model";

destinationRouter.get("/", async (req, res) => {
    try {
      const destinations = await DestinationModel.find();
      res.send(destinations);
    } catch (error) {
      console.log(error);
    }
  });

  // ************ POST ************
  destinationRouter.post("/", async (req, res) => {
    try {
      const newDestination = await DestinationModel.create(req.body);
      res.send(newDestination);
    } catch (error) {
      console.log(error);
    }
  });

// ************ BY ID ************
destinationRouter.get("/:city", async (req, res) => {
    try {
      const id = req.params.city;
      const accomodations = await AccomodationModel.find()
      const uniqCities = [... new Set(accomodations.map(acc => acc.city))]
      
      res.send(uniqCities)
    } catch (error) {
      console.log(error);
    }
  });

  export default destinationRouter