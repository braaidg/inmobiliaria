import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));

app.use("/auth", userRoutes);

const port = 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
