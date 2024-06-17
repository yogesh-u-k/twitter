import express from "express";

import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectMongodb from "./db/connectMongodb.js";

dotenv.config();

const app = express();
console.log(process.env.MONGOURI);
app.use("api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("server is ready");
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}` );
  connectMongodb();
});
