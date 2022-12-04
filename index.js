import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import db from "./config/db.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(csrf({ cookie: true }));

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

const port = process.env.BACKEND_PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
