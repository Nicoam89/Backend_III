const express = require("express");
const adoptionRouter = require("./routes/adoption.router.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/adoptions", adoptionRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server running"
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found"
  });
});

module.exports = app;