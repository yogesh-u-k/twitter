import express, { urlencoded } from "express";

import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectMongodb from "./db/connectMongodb.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
console.log(process.env.MONGOURI);
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  connectMongodb();
});
