const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  checkToken,
  checkInternal,
  checkLogin,
} = require("./middlewares/checkToken");
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

//root
app.get('/', (rq,rs)=>{ rs.redirect("/home")});

//home
app.get("/home", checkLogin, (req, res) => {
  res.render("contents/home/index");
});

//login
app.get("/login", (req, res) => {
  res.render("contents/login/login");
});

//register
app.get("/register", (req, res) => {
  res.render("contents/register/register");
});

//dashboard
app.get("/dashboard/admin", checkToken, (req, res) => {
  res.render("contents/dashboard/admin");
});

app.get("/dashboard/perusahaan", checkToken, (req, res) => {
  res.render("contents/dashboard/perusahaan");
});

app.get("/dashboard/mitra", checkToken, (req, res) => {
  res.render("contents/dashboard/mitra");
});

app.get("/dashboard/peserta", checkToken, (req, res) => {
  res.render("contents/dashboard/peserta");
});

//peserta register
app.get("/user/form/newcomer", (req, res) => {
  res.render("contents/register/newcomer");
});

app.get("/user/form/exjepang", (req, res) => {
  res.render("contents/register/exjepang");
});

app.get("/user/form/magang", (req, res) => {
  res.render("contents/register/magang");
});

app.get("/user/form/pmi", (req, res) => {
  res.render("contents/register/pmi");
});

//perusahaan register
app.get("/company/form/langsung", (req, res) => {
  res.render("contents/register/langsung");
});

app.get("/company/form/tsk", (req, res) => {
  res.render("contents/register/tsk");
});

app.get("/company/form/kumiai", (req, res) => {
  res.render("contents/register/kumiai");
});

app.get("/company/form/p3mi", checkToken, checkInternal, (req, res) => {
  res.render("contents/register/p3mi");
});

app.get("/company/form/so", checkToken, checkInternal, (req, res) => {
  res.render("contents/register/so");
});


//profil peserta
app.get("/profil/peserta/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/profil/peserta", { id });
});

app.get(
  "/profil/peserta/detail/:id",
  checkToken,
  (req, res) => {
    const id = req.params.id;
    res.render("contents/profil/peserta", { id });
  }
);

app.get("/profil/tsk/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/profil/tsk", { id });
});

app.get("/profil/detail/tsk/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/profil/tsk", { id });
});

app.get("/profil/kumiai/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/profil/kumiai", { id });
});

app.get("/profil/detail/kumiai/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/profil/kumiai", { id });
});

app.get("/profil/langsung/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/profil/langsung", { id });
});

app.get("/profil/detail/langsung/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/profil/langsung", { id });
});

app.get("/profil/so/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/profil/so", { id });
});

app.get("/profil/detail/so/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/profil/so", { id });
});

app.get("/profil/p3mi/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/profil/p3mi", { id });
});

app.get("/profil/detail/p3mi/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/profil/p3mi", { id });
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
app.get("/faq", checkLogin, (req, res) => {
  res.render("contents/faq/index");
});

app.get("/manajemen/faq", checkToken, checkInternal, (req, res) => {
  res.render("contents/mfaq/index");
});
app.get("/manajemen/faq/tambah", checkToken, checkInternal, (req, res) => {
  res.render("contents/mfaq/formTambah");
});
app.get("/manajemen/faq/edit/:id", checkToken, checkInternal, (req, res) => {
  const id = req.params.id;
  res.render("contents/mfaq/formEdit", { id });
});

//charity
app.get("/charity", checkLogin, (req, res) => {
  res.render("contents/charity/index");
});

app.get("/charity/detail/:id", checkLogin, (req, res) => {
  const id = req.params.id;
  res.render("contents/charity/detail", { id });
});

app.get("/manajemen/charity", checkToken, checkInternal, (req, res) => {
  res.render("contents/mcharity/index");
});

app.get("/manajemen/charity/tambah", checkToken, checkInternal, (req, res) => {
  res.render("contents/mcharity/formTambah");
});

app.get(
  "/manajemen/charity/edit/:id",
  checkToken,
  checkInternal,
  (req, res) => {
    const id = req.params.id;
    res.render("contents/mcharity/formEdit", { id });
  }
);

//artikel
app.get("/artikel", checkLogin, (req, res) => {
  res.render("contents/artikel/index");
});

app.get("/artikel/detail/:id", checkLogin, (req, res) => {
  const id = req.params.id;
  res.render("contents/artikel/detail", { id });
});

app.get("/manajemen/artikel", checkToken, checkInternal, (req, res) => {
  res.render("contents/martikel/index");
});
app.get("/manajemen/artikel/tambah", checkToken, checkInternal, (req, res) => {
  res.render("contents/martikel/formTambah");
});

app.get(
  "/manajemen/artikel/edit/:id",
  checkToken,
  checkInternal,
  (req, res) => {
    const id = req.params.id;
    res.render("contents/martikel/formEdit", { id });
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
  res.render("contents/usaccess/formEdit", { id });
});


// manajemen peserta
app.get("/manajemen/peserta", checkToken, checkInternal, (req, res) => {
  res.render("contents/muser/index");
});

// manajemen perusahaan
app.get("/manajemen/perusahaan", checkToken, checkInternal, (req, res) => {
  res.render("contents/mcompany/index");
});


//dashboard monitoring
app.get("/monitoring", checkToken, (req, res) => {
  res.render("contents/monitoring/index");
});

app.get("/monitoring/so", checkToken, (req, res) => {
  res.render("contents/monitoringp/index");
});

app.get("/monitoring/p3mi", checkToken, (req, res) => {
  res.render("contents/monitoringp/index");
});

//kelasonline
app.get("/kelasonline", checkToken, (req, res) => {
  res.render("contents/kelasonline/index");
});

//aduan
app.get("/manajemen/aduan", checkToken, checkInternal, (req, res) => {
  res.render("contents/maduan/index");
});

app.get("/aduan", checkToken, (req, res) => {
  res.render("contents/aduan/index");
});

//teman
app.get("/teman", checkToken, (req, res) => {
  res.render("contents/teman/index");
});

//pesertaiso
app.get("/pesertaiso", checkToken, (req, res) => {
  res.render("contents/pesertaiso/index");
});

//komunitas
app.get("/komunitas", checkToken, (req, res) => {
  res.render("contents/komunitas/index");
});

app.get("/dkomunitas", checkToken, (req, res) => {
  res.render("contents/komunitas/dIndex");
});

app.get("/komunitas/tambah", checkToken, (req, res) => {
  res.render("contents/komunitas/formTambah");
});

app.get("/manajemen/komunitas", checkToken, checkInternal, (req, res) => {
  res.render("contents/mkomunitas/index");
});

//panic
app.get("/manajemen/panic", checkToken, checkInternal, (req, res) => {
  res.render("contents/mpanic/index");
});

//komunitas
app.get("/komunitas/detail/:id", checkLogin, (req, res) => {
  const id = req.params.id;
  res.render("contents/komunitas/detail", { id });
});

//komunitas thread
app.get("/komunitas/thread/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/komunitas/listThread", { id });
});

app.get("/komunitas/thread/detail/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/komunitas/detailThread", { id });
});

app.get("/komunitas/thread/tambah/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/komunitas/formThread", { id });
});

//list perusahaan
app.get("/list/perusahaan", checkToken, (req, res) => {
  res.render("contents/lcompany/index");
});

//lowongankerja
app.get("/manajemen/loker", checkToken, checkInternal, (req, res) => {
  res.render("contents/mjob/index");
});

app.get("/loker/perusahaan", checkToken, (req, res) => {
  res.render("contents/mjob/perusahaan");
});

app.get("/manajemen/loker/tambah", checkToken, checkInternal, (req, res) => {
  res.render("contents/mjob/formTambahAdmin");
});

app.get("/loker/tambah", checkToken, (req, res) => {
  res.render("contents/mjob/formTambah");
});

app.get("/manajemen/loker/edit/:id", checkToken, checkInternal, (req, res) => {
  const id = req.params.id;
  res.render("contents/mjob/formEditAdmin", { id });
});

app.get("/loker/edit/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/mjob/formEdit", { id });
});

app.get("/manajemen/loker/pelamar/:id", checkToken, (req, res) => {
  const id = req.params.id;
  res.render("contents/mjob/pelamar", { id });
});

app.get("/lowongankerja", checkToken, (req, res) => {
  res.render("contents/job/index");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
