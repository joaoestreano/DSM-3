import { Router } from "express";
import controller from "../controllers/PeopleController.js";

const routes = Router();

routes.post("/", controller.create);
routes.get("/", controller.list);
routes.delete("/", controller.delete);
routes.put("/", controller.update);

export default routes;
