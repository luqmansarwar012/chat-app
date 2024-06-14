import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// API Routes
app.get("/", (req, res) => {
  //  root route
  res.send("server running");
});

app.use("/api/auth", authRouter);

// Running server
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);

  connectToMongoDB();
});
