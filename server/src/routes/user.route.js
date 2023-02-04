import express from "express";
import userValidator from "../validators/user.validator.js";
import userController from "../controllers/user.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import favoriteController from "../controllers/favorite.controller.js";
import favoriteValidator from "../validators/favorite.validator.js";

const router = express.Router();

router.post("/signup", userValidator.validateSignup, userController.signup);

router.post("/signin", userValidator.validateSignin, userController.signin);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  userValidator.validateUpdatePassword,
  userController.updatePassword
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);

router.get(
  "/favorites",
  tokenMiddleware.auth,
  favoriteController.getFavoritesOfUser
);

router.post(
  "/favorites",
  tokenMiddleware.auth,
  favoriteValidator.validateAddFavorite,
  favoriteController.addFavorite
);

router.delete(
    "/favorites/:favoriteId",
    tokenMiddleware.auth,
    favoriteController.removeFavorite
)

export default router