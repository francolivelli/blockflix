import responseHelper from "../helpers/response.helper.js";
import favoriteModel from "../models/favorite.model.js";

const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });

    if (isFavorite) return responseHelper.ok(res, isFavorite);

    const favorite = new favoriteModel({
      ...req.body,
      user: req.user.id,
    });

    await favorite.save();

    responseHelper.created(res, favorite);
  } catch {
    responseHelper.error(res);
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      _id: favoriteId,
    });

    if (!favorite) return responseHelper.notFound(res);

    await favorite.remove();

    responseHelper.ok(res);
  } catch {
    responseHelper.error(res);
  }
};

const getFavoritesOfUser = async (req, res) => {
  try {
    const favorites = await favoriteModel
      .find({ user: req.user.id })
      .sort("-createdAt");

    responseHelper.ok(res, favorites);
  } catch {
    responseHelper.error(res);
  }
};

export default { addFavorite, removeFavorite, getFavoritesOfUser };
