import express from "express";
import dotenv from "dotenv";
import connect from "../src/models/connection.js";
import routes from "../src/routes/index.js";

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
connect();

app.listen(PORT, () =>
  console.log(`Rodando na porta ${PORT}`)
);

app.use(routes);
