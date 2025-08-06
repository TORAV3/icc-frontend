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
            height: 120,
            borderless: true,
          },
          {
            height: 20,
          },
          {
            template:
              "<div style='text-align:center;'><img src='/icc/images/panic-old2.png' style='width:80px;'></div>",
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
              "<div style='text-align:center;'><img src='/icc/images/panic-old2.png' style='width:120px;'></div>",
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
                  window.location.href = "/manajemen/aduan";
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
  const buttonId = `btn_${category.replace(/\s+/g, "_").toLowerCase()}`;

  return {
    cols: [
      { width: 30 },
      {
        id: buttonId,
        view: "button",
        label: category,
        css: "panic-btn",
        position: "center",
        align: "center",
        height: 50,
        margin: 20,
        click: function () {
          if (category === "Lainnya") {
            // Ganti button dengan input text
            const parent = this.getParentView();
            const index = parent.index(this);

            parent.removeView(this);

            parent.addView({
              id: "lainnyaInput",
              view: "text",
              placeholder: "Masukkan detail",
              height: 50,
              on: {
                onEnter: () => {
                  sendPanicData("Lainnya");
                },
              },
            }, index);
          } else {
            sendPanicData(category);
            $$("panicPopupWindow").close();
          }
        },
      },
      { width: 30 },
    ],
  };
}

function sendPanicData(category) {
  let userId = null;

  if (typeof userData !== "undefined" && userData?.type === "peserta") {
    userId = userData.id;
  }

  if (!navigator.geolocation) {
    webix.message({ type: "error", text: "Geolocation tidak didukung" });
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      let finalTitle = category;

      if (category === "Lainnya") {
        const inputValue = $$("lainnyaInput")?.getValue()?.trim();
        if (!inputValue) {
          webix.message({ type: "error", text: "Silakan isi keterangan aduan terlebih dahulu" });
          return;
        }
        finalTitle = inputValue;
      }

      const formData = {
        title: finalTitle,
        category: "panic button",
        pelaporId: userId,
        date: new Date().toISOString(),
        lat: lat,
        long: lng,
      };

      axios
        .post(`http://localhost:3000/api/icc/aduan/tambah`, formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(function () {
          webix.message({ type: "success", text: "Laporan terkirim!" });
          $$("panicPopupWindow").close();
        })
    },
    function (error) {
      webix.message({
        type: "error",
        text: "Gagal mendapatkan lokasi: " + error.message,
      });
    }
  );
}

function checkPanicData() {
  axios
    .get("http://localhost:3000/api/icc/aduan", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      const matchingReports = response.data.data.filter((report) => {
        const category = (report.category || "").toLowerCase();
        const status = (report.status || "").toLowerCase();
        return category === "panic button" && status === "new";
      });

      if (matchingReports.length > 0) {
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
