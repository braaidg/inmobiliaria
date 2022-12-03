import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use("/", userRoutes);

const port = 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
