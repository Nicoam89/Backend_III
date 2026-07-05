const { Router } = require("express");
const adoptionsController = require("../controllers/adoptions.controller.js");

const createAdoptionRouter = (controller = adoptionsController) => {
  const router = Router();

  router.get("/", controller.getAllAdoptions);
  router.get("/:aid", controller.getAdoption);
  router.post("/:uid/:pid", controller.createAdoption);

  return router;
};

module.exports = createAdoptionRouter();
module.exports.createAdoptionRouter = createAdoptionRouter;