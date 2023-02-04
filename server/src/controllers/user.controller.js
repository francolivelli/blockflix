import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHelper from "../helpers/response.helper.js";

const signUp = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    const checkUser = await userModel.findOne({ username });

    if (checkUser)
      return responseHelper.badRequest(res, "This username already exists");

    const user = new userModel();

    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHelper.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHelper.error(res);
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select("username password salt id displayName");

    if (!user) return responseHelper.badRequest(res, "User does not exist");

    if (!user.validPassword(password))
      return responseHelper.badRequest(res, "Wrong password");

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHelper.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHelper.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await userModel
      .findById(req.user.id)
      .select("password id salt");

    if (!user) return responseHelper.unauthorized(res);

    if (!user.validPassword(password))
      return responseHelper.badRequest(res, "Wrong password");

    user.setPassword(newPassword);

    await user.save();

    responseHelper.ok(res);
  } catch {
    responseHelper.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) return responseHelper.notFound(res);

    responseHelper.ok(res, user);
  } catch {
    responseHelper.error(res);
  }
};

export default {
  signUp,
  signIn,
  getInfo,
  updatePassword,
};
