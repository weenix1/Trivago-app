import express from "express";
import accomodationRouter from "./accomodation/index";

const app = express();

app.use(express.json());


 app.get("/test", (req, res) => {
  res.send({ message: "Test successful" });
}); 

app.use("/accomodation", accomodationRouter);

export { app };
