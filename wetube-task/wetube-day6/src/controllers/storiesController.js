export const home = (req, res) => res.render("home", { pageTitle: "Home" });
export const trending = (req, res) =>
  res.render("trending", { pageTitle: "Trending" });
export const newStories = (req, res) =>
  res.render("newstories", { pageTitle: "New Stories" });
export const seeStory = (req, res) =>
  res.render("seestory", { pageTitle: `See Story:${req.params.id}` });
export const editStory = (req, res) =>
  res.render("editstory", { pageTitle: `Edit Story:${req.params.id}` });
export const deleteStory = (req, res) =>
  res.render("deletestory", { pageTitle: `Delete Story:${req.params.id}` });
