function loadPerusahaanData(type = "all") {
  $$("cardView").showProgress({ type: "icon" });

  axios
    .get(`http://localhost:3000/api/icc/user/sop3mi?type=${type}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      const data = res.data.data;
      const transformedData = Array.isArray(data)
        ? data.map((item) => ({
            id: item.id,
            email: item.email,
            status: item.activeStatus,
            type: item.type.toUpperCase(),
            name_company: item.companyDetail.name,
            address_company: item.companyDetail.address,
          }))
        : [];

      $$("cardView").clearAll();

      if (transformedData.length > 0) {
        $$("cardView").parse(transformedData);
      } else {
        $$("cardView").define("templateBody", "Maaf, data tidak ditemukan");
        $$("cardView").refresh();
      }
    })
    .catch((err) => {
      console.error("Error loading company data:", err);
      webix.message({ type: "error", text: "Gagal memuat data perusahaan." });
    })
    .finally(function () {
      $$("cardView").hideProgress();
    });
}


function countPerusahaanData() {
  axios
    .get(`http://localhost:3000/api/icc/user/sop3mi/count`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data && res.data.data) {
        if ($$("statsTotal")) {
          $$("statsTotal").parse({ total: res.data.data.total || 0 });
        }
        if ($$("statsSO")) {
          $$("statsSO").parse({ so: res.data.data.so || 0 });
        }
        if ($$("statsP3MI")) {
          $$("statsP3MI").parse({ p3mi: res.data.data.p3mi || 0 });
        }
      } else {
        console.error("Invalid API response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}

var statusCombo = {
  view: "combo",
  value: "all",
  label: "Jenis",
  labelPosition: "top",
  options: [
    { id: "all", value: "All" },
    { id: "so", value: "SO" },
    { id: "p3mi", value: "P3MI" },
  ],
  width: 100,
  name: "status",
  align: "left",
  on: {
    onChange: function (newValue) {
      loadPerusahaanData(newValue);
    },
  },
};

var searchForm = {
  maxWidth: 230,
  minWidth: 160,
  view: "text",
  id: "textSearch",
  placeholder: "Ketik disini untuk mencari data",
  align: "right",
  on: {
    onTimedKeyPress: function () {
      const value = this.getValue().toLowerCase();
      $$("cardView").filter(function (obj) {
        for (let key in obj) {
          if (obj[key] && obj[key].toString().toLowerCase().includes(value)) {
            return true;
          }
        }
        return false;
      });
    },
  },
};

var toolbar = {
  view: "toolbar",
  css: "toolbar",
  padding: 15,
  cols: [statusCombo, {}, searchForm],
};

var stats = {
  view: "layout",
  margin: 10,
  cols: [
    {
      id: "statsTotal",
      template: function (obj) {
        return `
          <div class='card draft'>
            <div class='card-content'>
              <div class='text'>
                <div class='title'>Total</div>
                <div class='value'>${obj.total || 0}</div>
              </div>
              <div class='icon_stats-total'>
                <iconify-icon icon='solar:case-minimalistic-outline'></iconify-icon>
              </div>
            </div>
          </div>`;
      },
      autoheight: true,
      css: "stats",
      data: { total: 0 },
    },
    {
      id: "statsSO",
      template: function (obj) {
        return `
          <div class='card draft'>
            <div class='card-content'>
              <div class='text'>
                <div class='title'>SO</div>
                <div class='value'>${obj.so || 0}</div>
              </div>
              <div class='icon_stats-approve'>
                <iconify-icon icon='solar:case-minimalistic-outline'></iconify-icon>
              </div>
            </div>
          </div>`;
      },
      autoheight: true,
      css: "stats",
      data: { so: 0 },
    },
    {
      id: "statsP3MI",
      template: function (obj) {
        return `
          <div class='card draft'>
            <div class='card-content'>
              <div class='text'>
                <div class='title'>P3MI</div>
                <div class='value'>${obj.p3mi || 0}</div>
              </div>
              <div class='icon_stats-reject'>
                <iconify-icon icon='solar:case-minimalistic-outline'></iconify-icon>
              </div>
            </div>
          </div>`;
      },
      autoheight: true,
      css: "stats",
      data: { p3mi: 0 },
    },
    {},
  ],
};

var perusahaanCardView = {
  view: "dataview",
  id: "cardView",
  css: "dataview-mitra",
  autoheight: true,
  xCount: 4,
  type: {
    height: 200,
    width: 300,
    template: function (obj) {
      return `
        <div class="job-card" style="padding: 16px; border: 1px solid #eee; border-radius: 12px; background: #fff; display: flex; flex-direction: column; gap: 12px; font-family: sans-serif;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 16px; font-weight: 600; color: #333;">${obj.name_company}</div>
            <span style="background: #be1e2d; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: bold; color: white;">
              ${obj.type}
            </span>
          </div>
          <div style="font-size: 12px; color: #555;">✉️ ${obj.email}</div>
          <div style="font-size: 12px; color: #555;">📍 ${obj.address_company}</div>
        </div>`;
    },
  },
  on: {
    onItemClick: function (id) {
      const item = this.getItem(id);
      const jenis = item.type.toLowerCase();
      window.location.href = `/profil/detail/${jenis}/${item.id}`;
    },
  },
};


webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 10,
    rows: [stats, toolbar, perusahaanCardView],
  });

  webix.extend($$("cardView"), webix.ProgressBar);

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadPerusahaanData();
  countPerusahaanData();
});
