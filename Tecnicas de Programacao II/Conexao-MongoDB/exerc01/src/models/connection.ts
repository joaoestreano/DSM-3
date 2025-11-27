import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/bdexer01";

export default function connect() {
  mongoose.connection.on("connected", () => console.log("connected"));
  mongoose.connection.on("open", () => console.log("open"));
  mongoose.connection.on("disconnected", () => console.log("disconnected"));

  mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    })
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((e) =>
      console.error("Erro ao conectar ao MongoDB:", e.message)
    );

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
}
