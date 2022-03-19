export const join = (req, res) => res.render("join", { pageTitle: "Join" });
export const login = (req, res) => res.render("login", { pageTitle: "Login" });
export const seeUsers = (req, res) =>
  res.render("seeusers", { pageTitle: "See Users" });
export const seeUser = (req, res) =>
  res.render("seeuser", { pageTitle: `See User:${req.params.id}` });
export const editProfile = (req, res) =>
  res.render("editprofile", { pageTitle: "Edit Profile" });
