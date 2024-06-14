import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
dotenv.config();

// express app instance
const app = express();

// middlewares
app.use(express.json());

// api endpoints
app.use("/api/auth", authRouter);

// running server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
  // databse connection
  connectToMongoDB();
});
