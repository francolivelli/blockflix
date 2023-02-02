import { check } from "express-validator";
import requestHelper from "../helpers/request.helper.js";

const validateCreate = [
  check("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId cannot be empty"),
  check("content")
    .exists()
    .withMessage("content is required")
    .isLength({ min: 1 })
    .withMessage("content cannot be empty"),
  check("mediaType")
    .exists()
    .withMessage("mediaType is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("mediaType invalid"),
  check("mediaTitle").exists().withMessage("mediaTitle is required"),
  check("mediaPoster").exists().withMessage("mediaPoster is required"),
  (req, res, next) => {
    requestHelper.validate(req, res, next);
  },
];

export default { validateCreate };
