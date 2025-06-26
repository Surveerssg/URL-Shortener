const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();

  //For handling JSON response instead of cookies
  // const userUid = req.headers["authorization"];
  // if (!userUid) return res.redirect("/login");
  // const token = userUid.split("Bearer ")[1];
  // const user = getUser(token);

  // if (!user) return res.redirect("/login");
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();

  //For handling JSON response instead of cookies
  // const userUid = req.headers["authorization"];
  // const token = userUid.split("Bearer ")[1];
  // const user = getUser(token);
  // req.user = user;
  // next();
}

function checkAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).send('Forbidden: Admins only');
  }
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
  checkAdmin,
};