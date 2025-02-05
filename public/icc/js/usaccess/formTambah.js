function loadRoleData() {
  axios
    .get(`http://localhost:3000/iso/api/role`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      const transformedData = res.data.data.map(function (item) {
        return {
          id: item.id,
          value: item.name.toUpperCase(),
        };
      });
      const role = $$("role");
      role.define("options", transformedData);
      role.refresh();
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

var form = {
  view: "form",
  id: "useraccessForm",
  margin: 40,
  elements: [
    {
      margin: 10,
      rows: [
        { type: "section", template: "Data User" },
        {
          id: "formres",
          margin: 10,
          rows: [
            {
              responsive: "formres",
              cols: [
                {
                  margin: 10,
                  rows: [
                    {
                      view: "text",
                      name: "fullname",
                      id: "fullname",
                      label: "Nama Lengkap",
                      labelPosition: "top",
                      required: true,
                      minWidth: 300,
                    },
                    {
                      view: "text",
                      name: "phone",
                      id: "phone",
                      label: "No. HP",
                      labelPosition: "top",
                      required: true,
                      minWidth: 300,
                    },
                    {
                      view: "combo",
                      label: "Role",
                      value: "",
                      labelPosition: "top",
                      options: [],
                      minWidth: 300,
                      name: "roleId",
                      id: "role",
                    },
                  ],
                },
                {
                  margin: 10,
                  rows: [
                    {
                      view: "text",
                      type: "email",
                      name: "email",
                      id: "email",
                      label: "Email",
                      labelPosition: "top",
                      required: true,
                      minWidth: 300,
                    },
                    {
                      view: "text",
                      type: "password",
                      name: "password",
                      id: "password",
                      label: "Password",
                      labelPosition: "top",
                      required: true,
                      minWidth: 300,
                    },
                  ],
                },
              ],
            },
          ],
        },
        { type: "section", template: "Hak Akses" },
        {
          id: "row1",
          margin: 10,
          rows: [
            {
              responsive: "row1",
              cols: [
                {
                  view: "switch",
                  value: 0,
                  label: "Manajemen Pengguna",
                  name: "muser",
                  id: "muser",
                  labelWidth: 160,
                  minWidth: 200,
                },
                {
                  view: "switch",
                  value: 0,
                  label: "User Access",
                  name: "usaccess",
                  id: "usaccess",
                  labelWidth: 160,
                  minWidth: 200,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      margin: 10,
      cols: [
        {},
        {
          view: "button",
          value: "Kembali",
          css: "btnKembali",
          autowidth: true,
          click: function () {
            window.location.href = "/user-access";
          },
        },
        {
          view: "button",
          value: "Simpan",
          css: "btnSimpan",
          autowidth: true,
          click: submit_form,
        },
      ],
    },
  ],
  rules: {
    fullname: webix.rules.isNotEmpty,
    email: webix.rules.isEmail,
    phone: webix.rules.isNotEmpty,
    password: webix.rules.isNotEmpty,
    roleId: webix.rules.isNotEmpty,
  },
};

function submit_form() {
  const form = $$("useraccessForm");
  if (form.validate()) {
    var formData = form.getValues();
    axios
      .post(`http://localhost:3000/iso/api/user/internal`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        form.clear();
        webix.message({ type: "success", text: response.data.data });
        setTimeout(() => {
          window.location.href = "/user-access";
        }, 1300);
      })
      .catch(function (error) {
        webix.message({ type: "error", text: error.response.data.data });
      });
  }
}

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    rows: [form],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadRoleData();
});
