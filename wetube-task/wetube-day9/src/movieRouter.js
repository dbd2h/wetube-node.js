import express from "express";
import {
  home,
  movieDetail,
  getAddMovie,
  postAddMovie,
} from "./movieController";

const movieRouter = express.Router();

movieRouter.get("/", home);
movieRouter.route("/add").get(getAddMovie).post(postAddMovie);
movieRouter.get("/:id", movieDetail);

export default movieRouter;
