import {
  getMovieById,
  getMovies,
  getMovieByMinimumRating,
  getMovieByMinimumYear,
} from "./db";

export const home = async (req, res) => {
  const videos = getMovies();
  const test = await getMovieById(40694);
  return res.render("home", { pageTitle: "Home", videos });
};
export const movieDetail = async (req, res) => {
  const { id } = req.params;
  const { title, synopsis, genres } = await getMovieById(id);
  return res.render("detail", { pageTitle: title, title, synopsis, genres });
};
export const filterMovie = (req, res) => {
  const { year, rating } = req.query;
  console.log(year, rating);
  if (!year && !rating) {
    const error = "Please input year or rating";
    return res.render("filter", { pageTitle: `Search`, videos: [], error });
  } else if (year && !rating) {
    const videos = getMovieByMinimumYear(year);
    const searchYear = `Year: ${year}`;
    return res.render("filter", {
      pageTitle: `Searching by ${searchYear}`,
      videos,
    });
  } else if (!year && rating) {
    const videos = getMovieByMinimumRating(rating);
    const searchRating = `Rating: ${rating}`;
    return res.render("filter", {
      pageTitle: `Searching by ${searchRating}`,
      videos,
    });
  } else if (year && rating) {
    const error = "Please input only one thing";
    return res.render("filter", { pageTitle: `Search`, videos: [], error });
  }
};
