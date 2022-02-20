export const join = (req, res) => res.send("Join");
export const login = (req, res) => res.send("Login");
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See");
export const logout = (req, res) => res.send("Logout");
