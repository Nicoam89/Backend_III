const express = require("express");

const createTestApp = (router) => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/adoptions", router);

  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
      status: "error",
      message: err.message || "Internal server error"
    });
  });

  return app;
};

module.exports = createTestApp;