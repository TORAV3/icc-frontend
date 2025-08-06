function loadData() {
  axios
    .get(`http://deviso.vdc.id:3003/api/icc/member-iso`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      const data = res.data.data;

      const formattedData = data.map((item) => {

        var topicsHtml = `
        <div class="d-flex flex-wrap align-items-center gap-2" style='margin-top: 28px; margin-bottom: 6px'>
            ${item.memberSkill
              .map(
                (skill) => `
                <span class="badge fw-normal text-sm rounded-pill bg-primary-600 px-20 py-9 radius-4 text-white">${skill.topic}</span>
              `
              )
              .join("")}
        </div>`;

        return {
          id: item.memberData.memberId,
          email: item.memberData.email,
          fullname: item.memberData.fullname,
          birthdate: item.memberData.birthdate,
          birthplace: item.memberData.birthplace,
          city: item.memberData.city,
          lastedu: item.memberData.lastedu,
          program_type: item.memberData.program_type.toUpperCase(),
          phone: item.memberData.phone,
          mynumber: item.memberData.mynumber,
          religion: item.memberData.religion,
          address: item.memberData.address,
          companyName: item.memberData.companyName,
          companyAddress: item.memberData.companyAddress,
          companyCity: item.memberData.companyCity,
          photo: item.memberData.pasFotoBase64,
          background: item.memberData.background,
          goals: item.memberData.goals.substring(0, 50),
          goalsdesc: item.memberData.goals,
          skill: topicsHtml,
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
    .get(`http://deviso.vdc.id:3003/api/icc/member-iso/byid/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      const item = res.data.data;
      console.log(item);

      if (item) {

        var topicsHtml = `
        <div class="d-flex flex-wrap align-items-center gap-2" style='margin-top: 28px; margin-bottom: 6px'>
            ${item.memberSkill
              .map(
                (skill) => `
                <span class="badge fw-normal text-sm rounded-pill bg-primary-600 px-20 py-9 radius-4 text-white">${skill.topic}</span>
              `
              )
              .join("")}
        </div>`;

        const formattedItem = {
          id: item.memberData.memberId,
          email: item.memberData.email,
          fullname: item.memberData.fullname,
          birthdate: item.memberData.birthdate,
          birthplace: item.memberData.birthplace,
          city: item.memberData.city,
          lastedu: item.memberData.lastedu,
          program_type: item.memberData.program_type.toUpperCase(),
          phone: item.memberData.phone,
          mynumber: item.memberData.mynumber,
          religion: item.memberData.religion,
          address: item.memberData.address,
          companyName: item.memberData.companyName,
          companyAddress: item.memberData.companyAddress,
          companyCity: item.memberData.companyCity,
          photo: item.memberData.pasFotoBase64,
          background: item.memberData.background,
          goals: item.memberData.goals.substring(0, 50),
          goalsdesc: item.memberData.goals,
          skill: topicsHtml,
        };

        webix.message({
          type: "success",
          text: "Peserta ditemukan!",
        });

        showPopup(formattedItem);
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
        height: 220,
        width: 300,
      },
      template: `
        <div class="card" style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); width: 100%; max-width: 400px; display: flex; align-items: center;">
          <div style="display: flex; align-items: center; width: 100%; justify-content: flex-start;">

            <div style="width: 80px; height: 80px; margin-right: 16px; border-radius: 50%; overflow: hidden; background-color: #f2f2f2;">
              <img src="#photo#" alt="#fullname#" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            
            <div style="flex-grow: 1; width: 150px;">
              <div style="font-weight: bold; font-size: 10px; color: #333;">#id#</div>
              <div style="font-weight: bold; font-size: 18px; color: #333;">#fullname#</div>
              <div style="font-size: 10px; color: #be1e2d; font-weight: bold;">#city#</div>
              <p style="font-size: 13px; color: #777; margin-top: 8px;">#goals#</p>
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
  height: 600,
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
        <div style="font-size: 14px; color: #be1e2d; font-weight: bold;">#city#</div>
        <p style="font-size: 14px; color: #777;">#program_type#</p>
      </div>
      <div style="margin-top: 10px; text-align: center;">
        <button class="btn-preview" type="button" title="Preview CV" id="previewCVButton">
          <iconify-icon icon="solar:file-favourite-outline" width="20" height="20"></iconify-icon>
        </button>
      </div>
      <div style="text-align: left; font-weight: bold;">Goals</div>
      <p style="font-size: 14px; color: #777; text-align: left;">#goals#</p>
      <div style="text-align: left; font-weight: bold;">Skill</div>
      #skill#
    `,
  },
};

function showPopup(item) {

  $$("detailWindow").show();

  $$("detailTemplate").setValues({
    fullname: item.fullname,
    city: item.city,
    program_type: item.program_type,
    goals: item.goalsdesc,
    skill: item.skill,
    photo: item.photo || '/icc/images/frame2.png',
  });

  const previewButton = document.querySelector("button[title='Preview CV']");
  if (previewButton) {
    previewButton.addEventListener("click", function () {
      previewCV(item);
    });
  }
}

function previewCV(item) {

  let avatarSrc = item.photo;

  let cvContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.8; padding: 20px; max-width: 800px; margin: auto;">
      <!-- Header Section: Avatar and Name -->
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <!-- Avatar -->
        <div style="flex: 2;">
          <img src="${avatarSrc}" alt="Avatar" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover;">
        </div>
        <!-- Name and Title -->
        <div style="flex: 3; padding-left: 20px;">
          <p style="margin: 0; font-size: 1.5rem; font-weight: bold; color: #2c3e50;">${item.fullname}</p>
          <p style="margin: 0; color: #7f8c8d;">${item.program_type}</p>
        </div>
      </div>

      <hr>
      <br>

      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <p style="flex: 1; font-weight: bold;">ID Member</p>
          <p style="flex: 2; text-align: right;">${item.id}</p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <p style="flex: 1; font-weight: bold;">My Number</p>
          <p style="flex: 2; text-align: right;">${item.mynumber || '-'}</p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <p style="flex: 1; font-weight: bold;">Email</p>
          <p style="flex: 2; text-align: right;">${item.email || 'Email belum diisi'}</p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <p style="flex: 1; font-weight: bold;">No. HP</p>
          <p style="flex: 2; text-align: right;">${item.phone}</p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <p style="flex: 1; font-weight: bold;">Tempat Lahir</p>
          <p style="flex: 2; text-align: right;">${item.birthplace}</p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <p style="flex: 1; font-weight: bold;">Tanggal Lahir</p>
          <p style="flex: 2; text-align: right;">${item.birthdate}</p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <p style="flex: 1; font-weight: bold;">Agama</p>
          <p style="flex: 2; text-align: right;">${item.religion.toUpperCase()}</p>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <p style="flex: 1; font-weight: bold;">Pendidikan Terakhir</p>
          <p style="flex: 2; text-align: right;">${item.lastedu.toUpperCase()}</p>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <p style="flex: 1; font-weight: bold;">Alamat</p>
          <p style="flex: 2; text-align: right;">${item.address}</p>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <p style="flex: 1; font-weight: bold;">Kota/Kabupaten</p>
          <p style="flex: 2; text-align: right;">${item.city}</p>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <p style="flex: 1; font-weight: bold;">Perusahaan</p>
          <p style="flex: 2; text-align: right;">${item.companyName || '-'}</p>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <p style="flex: 1; font-weight: bold;">Alamat Perusahaan</p>
          <p style="flex: 2; text-align: right;">${item.companyAddress || '-'}</p>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <p style="flex: 1; font-weight: bold;">Kota/Prefektur Perusahaan</p>
          <p style="flex: 2; text-align: right;">${item.companyCity || '-'}</p>
        </div>
      </div>
    </div>
  `;

  if ($$("cvPreviewWindow")) {
    $$("cvPreviewWindow").close();
  }

  const previewWindow = webix.ui({
    view: "window",
    id: "cvPreviewWindow",
    width: 600,
    height: 600,
    head: "Preview CV",
    body: {
      view: "template",
      template: cvContent,
      autoheight: true,
      autowidth: true,
      scroll: true,
    },
    position: "center",
    modal: true,
    close: true,
  });

  previewWindow.show();
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
