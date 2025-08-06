function startApp() {
  gapi.load('auth2', function() {
    gapi.auth2.init({
      client_id: '692695258798-eemq3kc373ii48mqjge2atqah3uit3cj.apps.googleusercontent.com',
    });
  });
}

webix.ui({
  view: "form",
  id: "loginForm",
  container: "login-card",
  css: "loginForm",
  elements: [
    {
      id: "row",
      margin: 10,
      rows: [
        {
          view: "text",
          name: "email",
          id: "email",
          label: "Email",
          labelPosition: "top",
          required: true,
          minWidth: 280,
        },
        {
          view: "search",
          type: "password",
          name: "password",
          id: "password",
          label: "Password",
          labelPosition: "top",
          required: true,
          icon:"wxi-eye",
          minWidth: 280,
          on:{
            onSearchIconClick:function(e){
              const input = this.getInputNode();
              webix.html.removeCss(e.target, "wxi-eye-slash");
              webix.html.removeCss(e.target, "wxi-eye");
              if(input.type == "text"){           
                webix.html.addCss(e.target, "wxi-eye");
                input.type = "password";
              } else {
                webix.html.addCss(e.target, "wxi-eye-slash");
                input.type = "text";
              }
            }
          }
        },
        { view: "button", value: "Masuk", css: "btnmasuk", click: submit_form },
        {
          view: "button",
          value: "Daftar",
          css: "btndaftar",
          click: function () {
            window.location.href = "/register";
          },
        },
        {
          view: "button",
          value: "Login with Google",
          css: "btn-google",
          click: function () {
            googleSignIn();  // Fungsi untuk menangani login Google
          }
        },
      ],
    },
  ],
  rules: {
    password: webix.rules.isNotEmpty,
    email: webix.rules.isEmail,
  },
});


function submit_form() {
  const form = $$("loginForm");
  if (form.validate()) {
    var formData = form.getValues();

    axios
      .post("http://localhost:3000/api/icc/login", formData)
      .then(function (response) {
        document.cookie = `token=${response.data.data}; path=/; max-age=${
          60 * 60
        }; Secure; SameSite=Strict`;

        axios
          .get("http://localhost:3000/api/icc/login/data", {
            headers: {
              Authorization: "Bearer " + response.data.data,
            },
          })
          .then((res) => {
            const user = res.data.data;

            if (user.type === "peserta" && user.status !== "approve") {
              webix.message({
                type: "error",
                text: "Akun Anda belum disetujui oleh admin.",
              });
              return;
            }
        
            webix.message({ type: "success", text: "Login berhasil" });
            setTimeout(() => {
              window.location.href = "/home";
            }, 1300);
          })
          .catch((err) => {
            webix.message({ type: "error", text: err.response.data.data });
          });
      })
      .catch(function (error) {
        webix.message({ type: "error", text: error.response.data.data });
      });
  }
}

webix.ready(function () {
  startApp();
});

function googleSignIn() {
  gapi.auth2.getAuthInstance().signIn().then(function(googleUser) {
    var profile = googleUser.getBasicProfile();
    var userId = profile.getId();  // ID unik pengguna Google
    var fullName = profile.getName();  // Nama lengkap pengguna
    var email = profile.getEmail();  // Email pengguna
    var imageUrl = profile.getImageUrl();  // URL gambar profil pengguna

    console.log('User ID: ' + userId);
    console.log('Full Name: ' + fullName);
    console.log('Email: ' + email);
    console.log('Image URL: ' + imageUrl);

    var idToken = googleUser.getAuthResponse().id_token;

    console.log('Image URL: ' + idToken);

  });
}

