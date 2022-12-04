import express from "express";
import userRoutes from "./routes/userRoutes.js";
import db from "./config/db.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

try {
  await db.authenticate();
  db.sync();
  console.log("Successfully connected to database");
} catch (error) {
  console.log(error);
}

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));

app.use("/auth", userRoutes);

const port = 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
