import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import releaseRoutes from "./routes/release.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/releases", releaseRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
