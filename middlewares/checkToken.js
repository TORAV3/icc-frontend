const axios = require("axios");

const checkLogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.locals.userData = null;
      res.locals.token = null;
      // res.locals.url = req.originalUrl;
      return next();
    }

    const response = await axios.get(
      "http://localhost:3000/api/icc/login/data",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    req.userData = response.data.data;

    res.locals.userData = response.data.data;
    
    res.locals.userId = response.data.data.userId;

    // res.locals.user1 = "admin"
    // res.locals.user2 = "mitra"
    // res.locals.user3 = "peserta"
    // res.locals.user4 = "perusahaan"

    // console.log("User data: ", response.data.data);

    res.locals.token = token;
    // res.locals.url = req.originalUrl;

    return next();
  } catch (error) {
    console.error("Login check failed:", error.response?.status, error.message);

    if (error.response?.status === 401 || error.response?.status === 404) {
      res.locals.userData = null;
      res.locals.token = null;
      return next();
    }

    return res.redirect("/error");
  }
};

const checkToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  axios
    .get("http://localhost:3000/api/icc/login/data", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      console.log(response);
      
      req.userData = response.data.data;

      res.locals.userData = response.data.data;
      res.locals.token = req.token;
      // res.locals.url = req.originalUrl;

      next();
    })
    .catch((err) => {
      if (err.status === 404 || err.status === 401) {
        return res.redirect("/login");
      } else {
        return res.redirect("/error");
      }
    });
};

const checkInternal = (req, res, next) => {
  if (req.userData.type !== "internal") {
    return res.redirect("/home");
  }

  next();
};

module.exports = { checkToken, checkInternal, checkLogin };
