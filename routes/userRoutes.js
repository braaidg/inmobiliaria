import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hola mundo");
});

router.get("/about-us", (req, res) => {
  res.send("About us ");
});

export default router;
