function loadUserDetailData() {
  axios
    .get(`http://localhost:3000/api/icc/user/perusahaan/detail/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      const data = res.data.data;
      const companyDetail = data.companyDetail;

      // Set header values
      document.getElementById("companyNameHeader").textContent =
        companyDetail.name_company;
      document.getElementById("idHeader").textContent = "ID: " + data.id;
      document.getElementById("statusHeader").textContent = "Perusahaan";

      // Set Webix form values
      $$("id").setValue(data.id);
      $$("token").setValue(token);
      $$("name_company").setValue(companyDetail.name_company);
      $$("email").setValue(data.email);
      $$("address_company").setValue(companyDetail.address_company);
      $$("country").setValue(companyDetail.country);
      $$("pic_name").setValue(companyDetail.pic_name);
      $$("pic_number").setValue(companyDetail.pic_number);
      $$("business_sector").setValue(companyDetail.business_sector);
    })
    .catch((err) => {
      console.log(err);
      webix.message({
        type: "error",
        text: err.response?.data?.data || "Error fetching data",
      });
    });
}

var tabcells = [
  {
    header: "Data Perusahaan",
    width: 150,
    body: {
      id: "formres",
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
                          name: "name_company",
                          id: "name_company",
                          label: "Nama Perusahaan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        {
                          width: 50,
                        },
                        {
                          view: "text",
                          name: "email",
                          id: "email",
                          label: "Alamat Email",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
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
                          name: "business_sector",
                          id: "business_sector",
                          label: "Sektor Bisnis",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        {
                          width: 50,
                        },
                        {
                          view: "text",
                          name: "country",
                          id: "country",
                          label: "Negara",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
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
                          name: "pic_name",
                          id: "pic_name",
                          label: "Nama PIC",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        {
                          width: 50,
                        },
                        {
                          view: "text",
                          name: "pic_number",
                          id: "pic_number",
                          label: "No. Telepon PIC",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
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
                          name: "address_company",
                          id: "address_company",
                          label: "Alamat Perusahaan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          height: 100,
                          readonly: true,
                        },

                        {
                          width: 600,
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

  loadUserDetailData();
});
