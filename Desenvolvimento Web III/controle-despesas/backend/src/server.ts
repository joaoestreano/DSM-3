import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/expense_control";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => {
    console.error("Erro ao conectar MongoDB:", err);
    process.exit(1);
  });

app.use("/api/expenses", expenseRoutes);

app.get("/", (_req, res) => {
  res.send("Expense API is running");
});

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
