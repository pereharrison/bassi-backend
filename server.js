import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db-config/connectDB.js";
import cors from "cors";

import overviewRoute from "./routes/overview-route.js";
import transactionRouter from "./routes/transaction.route.js";
import authenticateRouter from "./routes/authentication.route.js";
import chatWithAI from "./controllers/googleAI.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
connectDB();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server Running Bruh",
  });
});

app.post("/ai", chatWithAI)

app.use("/overview", overviewRoute);
// app.use("/transaction", transactionRouter);
app.use("/user", authenticateRouter);

app.listen(PORT, () => {
  console.log("Server runnig bruh");
});
