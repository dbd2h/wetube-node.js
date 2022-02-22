import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};
export const search = (req, res) => res.send("Search");
export const watch = (req, res) => {
  return res.render("watch", { pageTitle: `Watching` });
};
export const getEdit = (req, res) => {
  return res.render("edit", { pageTitle: `Editing` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`../${id}`);
};
export const deleteVideo = (req, res) => res.send("Delete Video");
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: " Upload Video" });
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: " Upload Video",
      errorMessage: error._message,
    });
  }
};
