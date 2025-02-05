const express = require("express");
const path = require("path");
// const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { checkToken, checkInternal } = require("./middlewares/checkToken");
require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());

// function authMiddleware(req, res, next) {
//   const token = req.cookies.token; // Get the token from cookies

//   if (!token) {
//     return res.redirect("/login"); // Redirect if no token
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWTSECRET);
//     req.user = decoded; // Attach user data to the request
//     next(); // Proceed to the next middleware or route handler
//   } catch (err) {
//     return res.redirect("/login"); // Redirect if the token is invalid
//   }
// }

app.set("view engine", "pug");

app.get("/login", (req, res) => {
  res.render("contents/login/login");
});

app.get("/register", (req, res) => {
  res.render("contents/register/register");
});

app.get("/dashboard", checkToken, (req, res) => {
  res.render("contents/dashboard");
});

//user
app.get("/user/form", (req, res) => {
  res.render("contents/register/userform");
});

app.get("/company/form", (req, res) => {
  res.render("contents/register/companyform");
});

app.get("/profil/user/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/profil/user", { id });
});

app.get(
  "/manajemen-peserta/detail/:id",
  checkToken,
  checkInternal,
  (req, res) => {
    const id = req.params.id;
    res.render("contents/profil/user", { id });
  }
);

app.get("/profil/perusahaan/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/profil/perusahaan", { id });
});

app.get(
  "/manajemen-perusahaan/detail/:id",
  checkToken,
  checkInternal,
  (req, res) => {
    const id = req.params.id;
    res.render("contents/profil/perusahaan", { id });
  }
);

//faq
app.get("/faq", checkToken, (req, res) => {
  res.render("contents/faq/faq");
});

app.get("/manajemen/faq", checkToken, checkInternal, (req, res) => {
  res.render("contents/faq/index");
});
app.get("/manajemen/faq/tambah", checkToken, checkInternal, (req, res) => {
  res.render("contents/faq/formTambah");
});

app.get("/manajemen/faq/edit/:id", checkToken, checkInternal, (req, res) => {
  const id = req.params.id;
  res.render("contents/faq/formEdit", { id });
});

//pedulisesama
app.get("/pedulisesama", checkToken, (req, res) => {
  res.render("contents/pedulisesama/pedulisesama");
});

app.get("/pedulisesama/detail/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/pedulisesama/detail", { id });
});

app.get("/manajemen/pedulisesama", checkToken, checkInternal, (req, res) => {
  res.render("contents/pedulisesama/index");
});
app.get(
  "/manajemen/pedulisesama/tambah",
  checkToken,
  checkInternal,
  (req, res) => {
    res.render("contents/pedulisesama/formTambah");
  }
);

app.get(
  "/manajemen/pedulisesama/edit/:id",
  checkToken,
  checkInternal,
  (req, res) => {
    const id = req.params.id;
    res.render("contents/pedulisesama/formEdit", { id });
  }
);

//artikel
app.get("/artikel", checkToken, (req, res) => {
  res.render("contents/artikel/artikel");
});

app.get("/manajemen/artikel", checkToken, checkInternal, (req, res) => {
  res.render("contents/artikel/index");
});
app.get("/manajemen/artikel/tambah", checkToken, checkInternal, (req, res) => {
  res.render("contents/artikel/formTambah");
});

app.get(
  "/manajemen/artikel/edit/:id",
  checkToken,
  checkInternal,
  (req, res) => {
    const id = req.params.id;
    res.render("contents/artikel/formEdit", { id });
  }
);

//user akses
app.get("/user-access", checkToken, checkInternal, (req, res) => {
  res.render("contents/usaccess/index");
});

app.get("/user-access/tambah", checkToken, checkInternal, (req, res) => {
  res.render("contents/usaccess/formTambah");
});

app.get("/user-access/edit/:id", checkToken, checkInternal, (req, res) => {
  const id = req.params.id;
  res.render("contents/usaccess/form", { id });
});

// manajemen peserta
app.get("/manajemen/peserta", checkToken, checkInternal, (req, res) => {
  res.render("contents/muser/index");
});

// manajemen perusahaan
app.get("/manajemen/perusahaan", checkToken, checkInternal, (req, res) => {
  res.render("contents/mcompany/index");
});

app.get("/monitoring", checkToken, (req, res) => {
  res.render("contents/monitoring/index");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
