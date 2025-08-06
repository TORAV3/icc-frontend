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
      .post("http://deviso.vdc.id:3003/api/icc/login", formData)
      .then(function (response) {
        document.cookie = `token=${response.data.data}; path=/; max-age=${
          60 * 60
        }; SameSite=Lax`;
        form.clear();

        axios
          .get("http://deviso.vdc.id:3003/api/icc/login/data", {
            headers: {
              Authorization: "Bearer " + response.data.data,
            },
          })
          .then((res) => {
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
