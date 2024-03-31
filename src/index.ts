import express from "express";
import routes from "./routes";

const log = require("debug")("http");
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  log(`Server is running on port ${PORT}`);
});

app.use("/", routes);

export default app;
