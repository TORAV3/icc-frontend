function loadRoleData() {
  axios
    .get(`http://localhost:3000/api/icc/role`, {
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

function loadUserDetailData() {
  axios
    .get(`http://localhost:3000/api/icc/user/internal/detail/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      $$("email").setValue(res.data.data.email);
      $$("role").setValue(res.data.data.roleId);
      $$("muser").setValue(res.data.data.access.muser);
      $$("usaccess").setValue(res.data.data.access.usaccess);
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
      id: "formres",
      rows: [
        {
          responsive: "formres",
          cols: [
            {
              margin: 10,
              rows: [
                { type: "section", template: "Data User" },
                {
                  id: "row1",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row1",
                      cols: [
                        {
                          view: "text",
                          name: "email",
                          id: "email",
                          label: "Email",
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
                  ],
                },
                { type: "section", template: "Hak Akses" },
                {
                  id: "row3",
                  rows: [
                    {
                      responsive: "row3",
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
    email: webix.rules.isEmail,
    roleId: webix.rules.isNotEmpty,
  },
};

function submit_form() {
  const form = $$("useraccessForm");
  if (form.validate()) {
    var formData = form.getValues();
    axios
      .put(`http://localhost:3000/api/icc/user/internal/edit/${id}`, formData, {
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
  loadUserDetailData();
});
