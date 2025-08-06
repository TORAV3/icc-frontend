function loadData() {
  axios
    .get(`http://deviso.vdc.id:3003/api/icc/user/peserta`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      const data = res.data.data;

      const formattedData = data.map((item) => {
        return {
          id: item.id,
          fullname: item.userDetail.fullname,
          firstname: item.userDetail.fullname.split(" ")[0],
          type: item.type.toUpperCase(),
          code: item.userDetail.code,
          program_type: item.userDetail.programType.toUpperCase(),
          email: item.email,
          photo: "/icc/images/frame2.png",
        };
      });

      $$("pesertaDataView").parse(formattedData);
    })
    .catch((err) => {
      console.log(err);
      webix.message({
        type: "error",
        text: err.response?.data?.data || "Error fetching data",
      });
    });
}

function searchPeserta(id) {
  axios
    .get(`http://deviso.vdc.id:3003/api/icc/user/peserta/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      const item = res.data.data;

      if (item && item.userDetail) {
        const userDetail = item.userDetail;
        const mappedItem = {
          id: item.id,
          fullname: userDetail.fullname,
          code: userDetail.code,
          type: item.type.toUpperCase(),
          program_type: userDetail.programType.toUpperCase(),
          email: item.email,
          photo: "/icc/images/frame2.png",
        };

        showPopup(mappedItem);
      } else {
        webix.message({
          type: "error",
          text: "Peserta tidak ditemukan!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      webix.message({
        type: "error",
        text: "Peserta tidak ditemukan!",
      });
    });
}

var layoutPeserta = {
  type: "wide",
  css: "dataview-peserta",
  rows: [
    {
      view: "dataview",
      id: "pesertaDataView",
      css: "dataview",
      autoheight: true,
      xCount: 4,
      type: {
        height: 160,
        width: 300,
      },
      template: `
        <div class="card" style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); width: 100%; max-width: 400px; display: flex; align-items: center;">
          <div style="display: flex; align-items: center; width: 100%; justify-content: flex-start;">

            <div style="width: 80px; height: 80px; margin-right: 16px; border-radius: 50%; overflow: hidden; background-color: #f2f2f2;">
              <img src="#photo#" alt="#fullname#" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            
            <div style="flex-grow: 1; width: 150px;">
              <div style="font-weight: bold; font-size: 10px; color: #333;">#code#</div>
              <div style="font-weight: bold; font-size: 18px; color: #333;">#firstname#</div>
              <div style="font-size: 10px; color: #be1e2d; font-weight: bold;">#type#</div>
              <p style="font-size: 13px; color: #777; margin-top: 8px;">#email#</p>
            </div>
          </div>
        </div>
      `,

      on: {
        onItemClick: function (id) {
          this.select(id);

          let item = this.getSelectedItem();
          if (item) {
            showPopup(item);
          }
        },
      },
    },
  ],
};

var popup = {
  view: "window",
  id: "detailWindow",
  modal: true,
  position: "center",
  head: {
    view: "toolbar",
    cols: [
      { width: 10 },
      { view: "label", label: "Detail Peserta" },
      {
        view: "icon",
        icon: "wxi-close",
        click: function () {
          $$("detailWindow").hide();
        },
      },
    ],
  },
  width: 400,
  height: 320,
  body: {
    view: "template",
    id: "detailTemplate",
    template: `
      <div style="display: flex; justify-content: center; margin-bottom: 16px;">
        <div style="width: 100px; height: 100px; border-radius: 50%; overflow: hidden; background-color: #f2f2f2;">
          <img src="#photo#" alt="#fullname#" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>
      <div style="text-align: center;">
        <div style="font-weight: bold; font-size: 22px; color: #333;">#fullname#</div>
        <div style="font-size: 14px; color: #be1e2d; font-weight: bold;">#type#</div>
        <p style="font-size: 14px; color: #777;">#program_type#</p>
        <p style="font-size: 14px; color: #777;">#email#</p>
      </div>
    `,
  },
};

function showPopup(item) {
  $$("detailWindow").show();

  $$("detailTemplate").setValues({
    fullname: item.fullname,
    type: item.type,
    program_type: item.program_type,
    email: item.email,
    photo: item.photo || "default.jpg",
  });
}

var toolbar = {
  view: "toolbar",
  css: "toolbar",
  padding: 15,
  cols: [
    {
      view: "text",
      id: "search_number",
      name: "search_number",
      placeholder: "Cari ID Peserta",
      width: 400,
    },
    {
      width: 20,
    },
    {
      view: "button",
      value: "Search",
      width: 100,
      align: "center",
      height: 50,
      click: function () {
        const id = $$("search_number").getValue();

        if (id) {
          searchPeserta(id);
        } else {
          webix.message({
            type: "error",
            text: "Masukkan ID Peserta!",
          });
        }
      },
    },
  ],
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 20,
    rows: [toolbar, layoutPeserta],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  webix.ui(popup);

  loadData();
});
