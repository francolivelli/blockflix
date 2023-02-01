import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(400).send({ errors: err.array()[0].msg });
  }
};

export default { validate };
