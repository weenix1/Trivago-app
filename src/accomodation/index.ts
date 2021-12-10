import express from "express";
const router = express.Router();
import { AccomodationModel } from "./model";

// ************ GET ************
router.get("/", async (req, res) => {
  try {
    const accomodations = await AccomodationModel.find().populate({path:"destination"});
    res.send(accomodations);
  } catch (error) {
    console.log(error);
  }
});

// ************ POST ************
router.post("/", async (req, res) => {
  try {
    const newAccomodation = await AccomodationModel.create(req.body);
    res.send(newAccomodation);
  } catch (error) {
    console.log(error);
  }
});

// ************ BY ID ************
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newAccomodation = await AccomodationModel.findById(id);
    if (newAccomodation) {
      res.status(200).send(newAccomodation);
    } else {
      res.status(404).send("No accomodation found");
    }
  } catch (error) {
    console.log(error);
  }
});

// ************ PUT ************
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAccomodation = await AccomodationModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (updatedAccomodation) {
      res.status(200).send(updatedAccomodation);
    } else {
      res.status(404).send("Id was not found");
    }
  } catch (error) {
    console.log(error);
  }
});

// ************ DELETE ************
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedAccomodation = await AccomodationModel.findByIdAndDelete(id);
    if (deletedAccomodation) {
      res.status(200).send(deletedAccomodation);
    } else {
      res.status(404).send("Id was not found");
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
