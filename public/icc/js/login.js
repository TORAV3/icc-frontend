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
          view: "text",
          type: "password",
          name: "password",
          id: "password",
          label: "Password",
          labelPosition: "top",
          required: true,
          minWidth: 280,
        },
        // {
        //   view: "checkbox",
        //   labelRight: "Simpan Password",
        //   labelWidth: 0,
        //   value: 0,
        // },
        { view: "button", value: "Masuk", css: "btnmasuk", click: submit_form },
        {
          view: "button",
          value: "Daftar",
          css: "btndaftar",
          click: function () {
            window.location.href = "/register";
          },
        },
        // {
        //   template: `<hr/>`,
        //   borderless: true,
        //   height: 10,
        // },
        // {
        //   view: "button",
        //   value: "Daftar sebagai Perusahaan",
        //   css: "btndaftar",
        //   click: function () {
        //     window.location.href = "/company/form";
        //   },
        // },
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
        form.clear();

        axios
          .get("http://localhost:3000/api/icc/login/data", {
            headers: {
              Authorization: "Bearer " + response.data.data,
            },
          })
          .then((res) => {
            webix.message({ type: "success", text: "Login berhasil" });
            setTimeout(() => {
              window.location.href = "/dashboard";
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
