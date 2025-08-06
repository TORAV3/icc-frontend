function showPanicPopup() {
  if ($$("panicPopupWindow")) {
    $$("panicPopupWindow").show();
    return;
  }

  webix
    .ui({
      view: "window",
      id: "panicPopupWindow",
      width: 340,
      autoheight: true,
      close: true,
      position: "center",
      css: "panic-popup",
      body: {
        rows: [
          {
            template:
              "<span style='color: rgba(190, 30, 45, 1); font-weight: bold; font-size: 22px;'>Hallo?</span><br><p style='font-size: 26px;'>Apa yang terjadi?</p><p style='font-size: 14px';>Tekan tombol di bawah ini, bantuan akan segera menghubungi Anda.</p>",
            height: 150,
            borderless: true,
          },
          {
            height: 20,
          },
          {
            template:
              "<div style='text-align:center;'><img src='/icc/images/panic.png' style='width:120px;'></div>",
            height: 130,
            margin: 20,
            borderless: true,
          },
          {
            height: 25,
          },
          {
            rows: [
              createButton("Bencana Alam"),
              { height: 15 },
              createButton("Bullying"),
              { height: 15 },
              createButton("Kecelakaan Kerja"),
              { height: 15 },
              createButton("Lainnya"),
            ],
          },
          {
            height: 50,
          },
        ],
      },
    })
    .show();
}

function showPanicPopupAdmin() {
  if ($$("panicPopupWindowAdmin")) {
    $$("panicPopupWindowAdmin").show();
    return;
  }

  webix
    .ui({
      view: "window",
      id: "panicPopupWindowAdmin",
      width: 340,
      autoheight: true,
      close: true,
      position: "center",
      css: "panic-popup",
      body: {
        rows: [
          {
            template:
              "<span style='color: rgba(190, 30, 45, 1); font-weight: bold; font-size: 25px;'>Panic Button Detected !</span><br><p style='font-size: 20px;'>Ada yang butuh bantuan</p>",
            height: 100,
            borderless: true,
          },
          {
            template:
              "<div style='text-align:center;'><img src='/icc/images/panic.png' style='width:120px;'></div>",
            height: 130,
            margin: 20,
            borderless: true,
          },

          {
            height: 25,
          },
          {
            cols: [
              { width: 30 },
              {
                view: "button",
                label: "Detail Info",
                css: "panic-btn",
                position: "center",
                align: "center",
                height: 50,
                margin: 20,
                click: function () {
                  window.location.href = "/manajemen/panic";
                },
              },
              { width: 30 },
            ],
          },
          {
            height: 30,
          },
        ],
      },
    })
    .show();
}

function createButton(category) {
  return {
    cols: [
      { width: 30 },
      {
        view: "button",
        label: category,
        css: "panic-btn",
        position: "center",
        align: "center",
        height: 50,
        margin: 20,
        click: function () {
          sendPanicData(category);
        },
      },
      { width: 30 },
    ],
  };
}

function sendPanicData(category) {
  let userId = null;

  if (
    typeof userData !== "undefined" &&
    userData &&
    userData.type === "peserta"
  ) {
    userId = userData.id;
  }
  const formData = {
    category: category,
    date: new Date().toISOString(),
    user_id: userId,
  };

  axios
    .post(`http://deviso.vdc.id:3003/api/icc/panic/tambah`, formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      webix.message({ type: "success", text: "Laporan terkirim!" });
    })
    .catch(function (error) {
      webix.message({ type: "error", text: "Gagal mengirim laporan." });
    });
}

function checkPanicData() {
  axios
    .get("http://deviso.vdc.id:3003/api/icc/panic", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      const pendingReports = response.data.data.filter(
        (report) => report.status === "pending"
      );

      // If there are pending reports, show the panic popup
      if (pendingReports.length > 0) {
        showPanicPopupAdmin();
      }
    })
    .catch(function (error) {
      webix.message({ type: "error", text: "Gagal mengambil data laporan." });
    });
}

webix.ready(function () {
  if (
    typeof userData !== "undefined" &&
    userData &&
    userData.type === "internal"
  ) {
    checkPanicData();
  }
});
