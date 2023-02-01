import responseHelper from "../helpers/response.helper.js";
import reviewModel from "../models/review.model.js";

const create = async (req, res) => {
  try {
    const { moviedId } = req.params;

    const review = new reviewModel({
      user: req.user.id,
      moviedId,
      ...req.body,
    });

    await review.save();

    responseHelper.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch {
    responseHelper.error(res);
  }
};

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await reviewModel.findOne({
      _id: review.id,
      user: req.user.id,
    });

    if (!review) return responseHelper.notFound(res);

    await review.remove();

    responseHelper.ok(res);
  } catch {
    responseHelper.error(res);
  }
};

const getReviewsOfUser = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({
        user: req.user.id,
      })
      .sort("-createdAt");

    responseHelper.ok(res, reviews);
  } catch {
    responseHelper.error(res);
  }
};

export default { create, remove, getReviewsOfUser };
