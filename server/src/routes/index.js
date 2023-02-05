import express from "express";
import userRoute from "./user.route.js";
import mediaRoute from "./media.route.js";
import personRoute from "./person.route.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/:mediaType", mediaRoute);
router.use("/person", personRoute);

export default router;
