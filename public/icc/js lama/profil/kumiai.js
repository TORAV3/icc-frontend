function loadPerusahaanDetailData() {
  axios
    .get(`http://deviso.vdc.id:3003/api/icc/user/perusahaan/detail/${id}`, {
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

      $$("id").setValue(data.id);
      $$("token").setValue(token);
      $$("name").setValue(companyDetail.name);
      $$("email").setValue(data.email);
      $$("address").setValue(companyDetail.address);
      $$("picname").setValue(companyDetail.picname);
      $$("noizin").setValue(companyDetail.noizin);
      $$("notelp").setValue(companyDetail.notelp);

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
  $$("noizin").disable();
  $$("notelp").disable();
}

var tabcells = [
  {
    header: "Data KUMIAI",
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
                          label: "Nama KUMIAI (KUMIAI名)",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                        {
                          view: "text",
                          name: "email",
                          id: "email",
                          label: "Email (メール)",
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
                          name: "noizin",
                          id: "noizin",
                          label: "No. Izin KUMIAI (KUMIAIの許可証番号)",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                        {
                          view: "text",
                          name: "notelp",
                          id: "notelp",
                          label: "Nomor Telp. (電話番号)",
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
                          name: "picname",
                          id: "picname",
                          label: "Penanggung Jawab (責任者)",
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
                          label: "Alamat KUMIAI (KUMIAIの住所)",
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
                              id: "updateButton",
                              value: "Update (送信)",
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
      .put(`http://deviso.vdc.id:3003/api/icc/user/perusahaan/edit/${id}`, formData, {
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

