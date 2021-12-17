import express from "express";
const router = express.Router();
import { AccomodationModel } from "./model";
import { Request, Response } from "express";

// ************ GET ************
router.get("/", async (req: Request, res: Response) => {
  try {
    const accomodations = await AccomodationModel.find().populate({
      path: "destination",
    });
    res.status(200).send(accomodations);
  } catch (error) {
    console.log(error);
  }
});

// ************ POST ************
router.post("/", async (req: Request, res: Response) => {
  try {
    const newAccomodation = await AccomodationModel.create(req.body);
    res.status(201).send(newAccomodation);
  } catch (error) {
    res.status(400).send();
  }
});

// ************ BY ID ************
router.get("/:id", async (req: Request, res: Response) => {
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
router.put("/:id", async (req: Request, res: Response) => {
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
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const deletedAccomodation = await AccomodationModel.findByIdAndDelete(id);
    if (deletedAccomodation) {
      res.status(204).send();
    } else {
      res.status(404).send("Id was not found");
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
