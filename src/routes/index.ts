import { Router } from "express";
import api from "./api";
const routes = Router();

routes.get("/", (req, res) => {
  res.send("main api route");
});

routes.use("/api", api);

export default routes;
