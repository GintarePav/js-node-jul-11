const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const userController = require("../controllers/userController");

router.use(userController.protect);
router
  .route("/")
  .post(userController.restrict("admin"), serviceController.createService)
  .get(serviceController.getServices);
router
  .route("/:id")
  .get(serviceController.getServiceById)
  .patch(userController.restrict("admin"), serviceController.updateService)
  .delete(userController.restrict("admin"), serviceController.deleteService);

module.exports = router;
