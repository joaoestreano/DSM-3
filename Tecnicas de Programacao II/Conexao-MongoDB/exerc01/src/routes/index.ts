import { Router } from "express";
import car from "../routes/car.js";
import people from "../routes/people.js";

const routes = Router();

routes.use("/car", car);
routes.use("/people", people);

routes.use((_, res) =>
  res.json({ error: "Requisição desconhecida" })
);

export default routes;
