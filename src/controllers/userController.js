export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = (req, res) => {
  console.log(req.body);
  return res.render("join");
};
export const login = (req, res) => res.send("Login");
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See");
export const logout = (req, res) => res.send("Logout");
