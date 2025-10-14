import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import denialRoutes from "./routes/denialRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AR Mastery Backend Running 🚀");
});

app.use("/api/denials", denialRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
