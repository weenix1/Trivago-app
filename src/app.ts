import express from "express";
import accomodationRouter from "./accomodation/index";
import destinationRouter from "./destination/index";
import usersRouter from "./users";
const app = express();

app.use(express.json());

app.get("/test", (req, res) => {
  res.send({ message: "Test successful" });
});

app.use("/accomodation", accomodationRouter);
app.use("/destination", destinationRouter);
app.use("/users", usersRouter);
export { app };
