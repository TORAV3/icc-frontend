function loadPerusahaanDetailData() {
  axios
    .get(`http://localhost:3000/api/icc/user/perusahaan/detail/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      const data = res.data.data;
      const companyDetail = data.companyDetail;

      document.getElementById("companyNameHeader").textContent =
        companyDetail.name;
      // document.getElementById("idHeader").textContent = "ID : " + data.id;
      document.getElementById("statusHeader").textContent = data.type.toUpperCase();
      document.getElementById("avatarImage").src = res.data.data.profilePicBase64 || "/icc/images/default-avatar.png";

      $$("id").setValue(data.id);
      $$("token").setValue(token);
      $$("name").setValue(companyDetail.name);
      $$("email").setValue(data.email);
      $$("address").setValue(companyDetail.address);
      $$("picname").setValue(companyDetail.picname);
      $$("picnumber").setValue(companyDetail.picnumber);
      $$("businesssector").setValue(companyDetail.businesssector);
      $$("country").setValue(companyDetail.country);

      const avatarButton = document.querySelector("button[title='Profile Pic']");
      if (avatarButton) {
        avatarButton.addEventListener("click", function () {
          showAvatarModal(res.data.data.id);
        });
      }

      if (userId === data.id.toString()) {
        $$("updateButton").show();
      } else {
        $$("updateButton").hide();
        disableFormFields();
      }

    })
    .catch((err) => {
      console.log(err);
      webix.message({
        type: "error",
        text: err.response?.data?.data || "Error fetching data",
      });
    });
}

function disableFormFields() {
  $$("name").disable();
  $$("email").disable();
  $$("address").disable();
  $$("picname").disable();
  $$("picnumber").disable();
  $$("businesssector").disable();
  $$("country").disable();
}

function showAvatarModal(userId) {
  currentUserId = userId;
  
  if ($$("avatarModal")) {
    $$("avatarModal").show();
    return;
  }

  webix.ui({
    view: "window",
    id: "avatarModal",
    width: 300,
    position: "center",
    modal: true,
    close: true,
    on: {
      onHide: resetAvatarForm
    },
    body: {
      padding: 20,
      rows: [
        {
          view: "template",
          id: "avatarPreview",
          height: 150,
          template: "<div style='text-align:center;'>No image selected</div>"
        },
        { height: 10},
        {
          view: "text",
          id: "avatarFileName",
          label: "File",
          readonly: true
        },
        { height: 20},
        {
          cols: [
            {
              view: "template",
              css: "hide-background",
              template: `
                <button onclick="triggerFileUpload()" style="
                  background-color: #be1e2d;
                  color: white;
                  text-align: center;
                  padding: 10px 20px;
                  font-size: 13px;
                  border: none;
                  border-radius: 6px;
                  cursor: pointer;
                  width: 100%;
                ">Upload</button>
              `,
              height: 60
            },
            {
              view: "template",
              css: "hide-background",
              template: `
                <button onclick="removeAvatar()" style="
                  background-color: #be1e2d;
                  color: white;
                  text-align: center;
                  padding: 10px 20px;
                  font-size: 13px;
                  border: none;
                  border-radius: 6px;
                  cursor: pointer;
                  width: 100%;
                ">Remove</button>
              `,
              height: 45
            }
          ]
        },
        { height: 10 },
        {
          view: "template",
          css: "hide-background",
          template: `
            <div style="text-align: right;">
              <button onclick="handleAvatarSave()" style="
                background-color: #be1e2d;
                color: white;
                padding: 10px 20px;
                font-size: 13px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
              ">Save</button>
            </div>
          `,
          height: 45
        }
      ]
    }
  }).show();
}

function triggerFileUpload() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.click();

  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      $$("avatarFileName").setValue(file.name);

      const reader = new FileReader();
      reader.onload = function (event) {
        avatarBase64 = event.target.result;
        $$("avatarPreview").setHTML(
          `<div style='text-align:center;'>
            <img src="${avatarBase64}" style="max-height:130px; border-radius:8px;" />
          </div>`
        );
      };
      reader.readAsDataURL(file);
    }
  });
}

function handleAvatarSave() {
  if (!avatarBase64) {
    webix.message("No image selected");
    return;
  }

  if (!currentUserId) {
    webix.message({ type: "error", text: "User ID missing!" });
    return;
  }

  const dataToSend = {
    id: currentUserId,
    profilePic: avatarBase64
  };

  axios
    .put(`http://localhost:3000/api/icc/user/upload/avatar/${currentUserId}`, dataToSend, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => {
      webix.message({
        type: "success",
        text: "Foto Profil berhasil diperbarui."
      });
      $$("avatarModal").hide();
      resetAvatarForm();
      setTimeout(() => {
        location.reload();
      }, 3000);
    })
    .catch((error) => {
      webix.message({
        type: "error",
        text: error.response?.data?.data || "Gagal menyimpan avatar."
      });
    });
}

function resetAvatarForm() {
  avatarBase64 = "";
  if ($$("avatarFileName")) $$("avatarFileName").setValue("");
  if ($$("avatarPreview")) $$("avatarPreview").setHTML("<div style='text-align:center;'>No image selected</div>");
}

function removeAvatar() {
  if (!currentUserId) {
    webix.message({ type: "error", text: "User ID missing!" });
    return;
  }

  axios
    .delete(`http://localhost:3000/api/icc/user/avatar/${currentUserId}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(() => {
      webix.message({
        type: "success",
        text: "Foto Profil berhasil dihapus."
      });
      $$("avatarModal").hide();
      resetAvatarForm();
      setTimeout(() => {
        location.reload();
      }, 3000);
    })
    .catch((error) => {
      webix.message({
        type: "error",
        text: error.response?.data?.data || "Gagal menghapus avatar."
      });
    });
}

var tabcells = [
  {
    header: "Data Perusahaan",
    width: 150,
    body: {
      view: "form",
      id: "formres",
      css: "formres",
      rows: [
        {
          view: "text",
          name: "id",
          id: "id",
          hidden: true,
        },
        {
          view: "text",
          name: "token",
          id: "token",
          hidden: true,
        },
        { height: 20 },
        {
          responsive: "formres",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  id: "row1",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row1",
                      cols: [
                        {
                          view: "text",
                          name: "name",
                          id: "name",
                          label: "Nama Perusahaan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                        
                        {
                          view: "text",
                          name: "email",
                          id: "email",
                          label: "Email",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row2",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row2",
                      cols: [
                        {
                          view: "text",
                          name: "picname",
                          id: "picname",
                          label: "Nama Penanggung Jawab",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                        
                        {
                          view: "text",
                          name: "picnumber",
                          id: "picnumber",
                          label: "Nomor Telp. Penanggung Jawab",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row3",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row3",
                      cols: [
                        {
                          view: "text",
                          name: "country",
                          id: "country",
                          label: "Negara",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                        },
                        
                        {
                          view: "text",
                          name: "businesssector",
                          id: "businesssector",
                          label: "Sektor Bisnis",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                        },
                      ], 
                    },
                  ],
                },
                {
                  id: "row4",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row4",
                      cols: [
                        {
                          view: "textarea",
                          name: "address",
                          id: "address",
                          label: "Alamat Perusahaan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          height: 100,
                        },
                      ],
                      
                    },
                  ],
                },

                {
                  id: "row5",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row5",
                      cols: [
                        {
                          rows: [
                            {
                              view: "button",
                              value: "Update",
                              id: "updateButton",
                              css: "update",
                              click: update_form,
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
      ],
    },
  },
];

var tab = {
  view: "tabview",
  css: "tabstyle",
  cells: tabcells,
  multiview: { fitBiggest: true },
};

var form = {
  view: "form",
  id: "userForm",
  margin: 40,
  elements: [tab],
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    rows: [form],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadPerusahaanDetailData();
});

function update_form() {
  const form = $$("formres");
  if (form.validate()) {
    var formData = form.getValues();

    axios
      .put(`http://localhost:3000/api/icc/user/perusahaan/edit/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        webix.message({ type: "success", text: response.data.data });
        setTimeout(() => {
          location.reload();
        }, 1300);
      })
      .catch(function (error) {
        webix.message({ type: "error", text: error.response.data.data });
      });

    console.log(formData);
  } else {
    webix.message({
      type: "error",
      text: "Silakan isi semua field yang wajib diisi.",
    });
  }
}

