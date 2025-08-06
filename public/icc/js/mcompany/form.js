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

      document.getElementById("companyNameHeader").textContent =
        companyDetail.name;
      // document.getElementById("idHeader").textContent = "ID : " + data.id;
      document.getElementById("statusHeader").textContent = data.type.toUpperCase();

      $$("id").setValue(data.id);
      $$("token").setValue(token);
      $$("name").setValue(companyDetail.name);
      $$("email").setValue(data.email);
      $$("address").setValue(companyDetail.address);
      $$("country").setValue(companyDetail.country);
      $$("picname").setValue(companyDetail.picname);
      $$("picnumber").setValue(companyDetail.picnumber);
      $$("noizin").setValue(companyDetail.noizin);
      $$("notelp").setValue(companyDetail.notelp);
      $$("businesssector").setValue(companyDetail.businesssector);
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
    header: "Data Profil Perusahaan",
    width: 200,
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
                          name: "name",
                          id: "name",
                          label: "Nama Perusahaan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
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
                          label: "No. Izin Perusahaan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                        {
                          width: 50,
                        },
                        {
                          view: "text",
                          name: "notelp",
                          id: "notelp",
                          label: "No. Telp Perusahaan",
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
                          name: "businesssector",
                          id: "businesssector",
                          label: "Sektor Bisnis",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
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
                          view: "text",
                          name: "picname",
                          id: "picname",
                          label: "Nama PIC",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                        {
                          width: 50,
                        },
                        {
                          view: "text",
                          name: "picnumber",
                          id: "picnumber",
                          label: "No. Telp PIC",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
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
                          view: "textarea",
                          name: "address",
                          id: "address",
                          label: "Alamat Perusahaan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          height: 100,
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

  let tipe = type;

  console.log(tipe);
  

  loadUserDetailData();
});
