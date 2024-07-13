const express = require("express");
const router = express.Router();
const repairmanController = require("../controllers/repairmanController");
const userController = require("../controllers/userController");
const likesRouter = require("../routes/likesRoutes");

router.use(userController.protect);
router
  .route("/")
  .post(userController.restrict("admin"), repairmanController.createRepairman)
  .get(repairmanController.getRepairmen);
router
  .route("/:id")
  .get(repairmanController.getRepairmanById)
  .patch(userController.restrict("admin"), repairmanController.updateRepairman)
  .delete(
    userController.restrict("admin"),
    repairmanController.deleteRepairman
  );

router.use("/:repairmanId/likes", likesRouter);

module.exports = router;
