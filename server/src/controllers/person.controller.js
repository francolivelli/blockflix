import responseHelper from "../helpers/response.helper.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;

    const person = await tmdbApi.personDetail({ personId });

    responseHelper.ok(res, person);
  } catch {
    responseHelper.error(res);
  }
};

const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;

    const medias = await tmdbApi.personMedias({ personId });

    responseHelper.ok(res, medias);
  } catch {
    responseHelper.error(res);
  }
};

export default { personDetail, personMedias };
