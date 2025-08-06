var form = {
  view: "form",
  id: "laporanForm",
  margin: 40,
  padding: 50,
  elements: [
    {
      view: "template",
      template:
        "<div style='text-align: center; font-weight: bold; font-size: 30px; color: rgba(24, 29, 39, 1);'>Sampaikan Laporan Anda</div>",
      autoheight: true,
      borderless: true,
    },
    {
      id: "formres",
      margin: 10,
      rows: [
        {
          responsive: "formres",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  view: "radio",
                  name: "category",
                  label: "Jenis Laporan",
                  labelPosition: "top",
                  required: true,
                  options: [
                    { id: "pengaduan", value: "Pengaduan" },
                    { id: "aspirasi", value: "Aspirasi" },
                    { id: "informasi", value: "Permintaan Informasi" },
                  ],
                  value: "pengaduan",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      margin: 10,
      rows: [
        {
          view: "text",
          name: "title",
          id: "title",
          label: "Judul Laporan",
          labelPosition: "top",
          required: true,
          minWidth: 500,
        },
        {
          view: "textarea",
          name: "description",
          id: "description",
          label: "Isi Laporan",
          labelPosition: "top",
          required: true,
          minWidth: 500,
          height: 200,
        },
      ],
    },
    {
      rows: [
        {
          responsive: "row3",
          cols: [
            {
              width: 400,
              rows: [
                {
                  cols: [
                    {
                      rows: [
                        {
                          view: "text",
                          type: "hidden",
                          name: "attachment",
                          id: "attachment",
                        },
                        {
                          view: "label",
                          label:
                            "<span>Lampiran<span class='text-danger ms-1'> *</span></span>",
                        },
                        {
                          view: "template",
                          css: "uploadstyle",
                          autoheight: true,
                          template: `
                                      <div class="input-container" style="display: flex; align-items: center; border: 1px solid #ddd; border-radius: 5px; padding: 5px; background: #f9f9f9;">
                                          <input type="text" name="lampiranName" id="lampiranText" readonly style="flex: 1; border: none; background: transparent; color: #444; font-size: 14px;" placeholder="Upload Lampiran">
                                          <label for="lampiranUpload" style="cursor: pointer; margin-left: 10px;">
                                              <iconify-icon icon="solar:cloud-upload-outline" style="font-size: 24px; color: #888;"></iconify-icon>
                                          </label>
                                          <input type="file" id="lampiranUpload"  accept=".jpg, .jpeg, .png" style="display: none;">
                                      </div>
                                  `,
                          on: {
                            onAfterRender: function () {
                              const fileInput =
                                document.getElementById("lampiranUpload");
                              const fileText =
                                document.getElementById("lampiranText");

                              fileInput.addEventListener("change", function () {
                                if (fileInput.files.length > 0) {
                                  const file = fileInput.files[0];
                                  fileText.value = file.name;

                                  const reader = new FileReader();
                                  reader.onload = function (event) {
                                    $$("attachment").setValue(
                                      event.target.result
                                    );
                                  };
                                  reader.readAsDataURL(file);
                                }
                              });
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {},
          ],
        },
      ],
    },
    {
      margin: 10,
      rows: [
        {
          responsive: "row4",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  view: "datepicker",
                  name: "date",
                  id: "date",
                  label: "Tanggal Kejadian",
                  labelPosition: "top",
                  required: true,
                  format: "%Y-%m-%d",
                  stringResult: true,
                },
              ],
            },
            {
              margin: 10,
              rows: [
                {
                  width: 50,
                },
              ],
            },
            {
              margin: 10,
              rows: [
                {
                  view: "text",
                  name: "location",
                  id: "location",
                  label: "Lokasi Kejadian",
                  labelPosition: "top",
                  required: true,
                },
              ],
            },
            // {
            //   margin: 10,
            //   rows: [
            //     {
            //       width: 50,
            //     },
            //   ],
            // },
            // {
            //   margin: 10,
            //   rows: [
            //     {
            //       view: "combo",
            //       name: "instansi_tujuan",
            //       id: "instansi_tujuan",
            //       label: "Instansi Tujuan",
            //       labelPosition: "top",
            //       required: true,
            //       options: [
            //         { id: "1", value: "Tujuan 1" },
            //         { id: "2", value: "Tujuan 2" },
            //       ],
            //     },
            //   ],
            // },
          ],
        },
      ],
    },
    // {
    //   margin: 10,
    //   rows: [
    //     {
    //       responsive: "row5",
    //       cols: [
    //         {
    //           margin: 10,
    //           autowidth: true,
    //           rows: [
    //             {
    //               view: "combo",
    //               name: "pengirim",
    //               id: "pengirim",
    //               label: "Kirim Sebagai",
    //               labelPosition: "top",
    //               required: true,
    //               options: [
    //                 { id: "anonim", value: "Anonim" },
    //                 { id: "terbuka", value: "Terbuka" },
    //               ],
    //             },
    //           ],
    //         },
    //         {},
    //         {},
    //       ],
    //     },
    //   ],
    // },
    {
      margin: 10,
      cols: [
        {},
        {},
        {
          view: "button",
          value: "LAPOR",
          css: "btnLapor",
          width: 155,
          height: 60,
          align: "center",
          click: submit_form,
        },
      ],
    },
  ],
};

var toolbar = {
  view: "toolbar",
  css: "toolbar",
  padding: 15,
  cols: [
    {
      view: "text",
      id: "search_number",
      name: "search_number",
      placeholder: "Cari Nomor Laporan",
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
      click: searchAduanByCode,
    },
    {
      view: "button",
      value: "Riwayat",
      width: 100,
      align: "center",
      height: 50,
      click: searchRiwayatByPelaporId,
    },
  ],
};

function submit_form() {
  const form = $$("laporanForm");

  if (!form.validate()) {
    webix.message({ type: "error", text: "Harap isi semua kolom yang wajib!" });
    return;
  }

  var formData = form.getValues();
  formData.pelaporId = userId;
  
  axios
    .post(`http://localhost:3000/api/icc/aduan/tambah`, formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      webix.message({ type: "success", text: "Laporan berhasil dibuat" });
      setTimeout(() => {
        location.reload();
      }, 2000);
    })
    .catch(function (error) {
      webix.message({ type: "error", text: error.response.data.message });
    });
}

function searchAduanByCode() {
  const aduanCode = $$("search_number").getValue().trim();
  if (!aduanCode) {
    webix.message({ type: "error", text: "Masukkan nomor laporan!" });
    return;
  }

  webix.ajax()
    .headers({ Authorization: "Bearer " + token })
    .get(`http://localhost:3000/api/icc/aduan/code/${aduanCode}`)
    .then(function (response) {
      const detail = response.json().data;

      detail.category = detail.category?.toUpperCase();
      detail.date = webix.Date.dateToStr("%Y-%m-%d")(new Date(detail.date));
      detail.lampiranBase64 = detail.lampiranBase64 || "";
      detail.location = detail.location || "-";
      detail.description = detail.description || "-";

      $$("popupDetailForm").setValues(detail);
      $$("lampiranPreview").setValues({ lampiranBase64: detail.lampiranBase64 });

      $$("searchResultPopup").show();

      loadTimelineToPopup(aduanCode);
    })
    .catch(function (err) {
      console.error("Gagal memuat detail:", err);
      webix.message({ type: "error", text: "Aduan tidak ditemukan" });
    });
}

function loadTimelineToPopup(code) {
  webix.ajax()
    .headers({ Authorization: "Bearer " + token })
    .get(`http://localhost:3000/api/icc/aduan/log/${code}`)
    .then(function (response) {
      const logs = response.json().data;
      const formattedLogs = logs.map(log => ({
        id: log.id,
        value: log.status.toUpperCase(),
        details: log.description,
        date: webix.Date.dateToStr("%Y-%m-%d")(new Date(log.created_at))
      }));

      $$("popupTimeline").clearAll();
      $$("popupTimeline").parse(formattedLogs);
    })
    .catch(function (err) {
      console.error("Gagal memuat riwayat:", err);
      webix.message({ type: "error", text: "Gagal memuat riwayat log" });
    });
}

function searchRiwayatByPelaporId() {

  webix.ajax()
    .headers({ Authorization: "Bearer " + token })
    .get(`http://localhost:3000/api/icc/aduan/user/${userId}`)
    .then(function (response) {
      const data = response.json().data;
      if (!data.length) {
        webix.message("Belum ada laporan yang dibuat.");
        return;
      }

      $$("riwayatList").clearAll();
      $$("riwayatList").parse(data);
      $$("riwayatPopup").show();
    })
    .catch(function (err) {
      console.error("Data riwayat tidak ditemukan", err);
      webix.message({ type: "error", text: "Data riwayat tidak ditemukan" });
    });
}

function getStatusColor(status) {
  const s = status.toLowerCase();
  if (s === "new") return "#6c757d";
  if (s === "proses") return "#ffc107";
  if (s === "tindak lanjut") return "#dc3545";
  if (s === "done") return "#00b69b";
  return "#999";
}

function previewLampiran(base64) {
  $$("zoomTemplate").setHTML(`
    <div style="text-align:center; padding:10px;">
      <img src="${base64}" style="max-width:100%; max-height:100%;" />
    </div>
  `);
  $$("lampiranZoom").show();
}

webix.ready(function () {

  grid = webix.ui({
    container: "index-page",
    margin: 10,
    rows: [toolbar, form],
  });

  webix.ui({
    view: "window",
    id: "lampiranZoom",
    width: 800,
    height: 600,
    position: "center",
    modal: true,
    head: {
      view: "toolbar",
      cols: [
        {},
        { view: "icon", icon: "wxi-close", click: () => $$("lampiranZoom").hide() }
      ]
    },
    body: {
      view: "template",
      id: "zoomTemplate",
      template: "",
      scroll: true
    }
  });

  webix.ui({
    view: "window",
    id: "searchResultPopup",
    width: 950,
    autoheight: true,
    position: "center",
    modal: true,
    head: {
      view: "toolbar",
      cols: [
        { width: 10 },
        { view: "label", label: "Detail Laporan & Riwayat" },
        { view: "icon", icon: "wxi-close", click: () => $$("searchResultPopup").hide() }
      ]
    },
    body: {
      cols: [
        {
          view: "form",
          id: "popupDetailForm",
          width: 450,
          padding: 20,
          elements: [
            { view: "text", label: "Nomor", name: "code", readonly: true },
            { view: "text", label: "Judul", name: "title", readonly: true },
            { view: "text", label: "Kategori", name: "category", readonly: true },
            { view: "text", label: "Tanggal", name: "date", readonly: true },
            { view: "text", label: "Lokasi", name: "location", readonly: true },
            // { view: "text", label: "Pengirim", name: "pengirim", readonly: true },
            {
              view: "textarea",
              label: "Deskripsi",
              name: "description",
              readonly: true,
              height: 100,
            },
            {
              view: "template",
              id: "lampiranPreview",
              borderless: true,
              template: (obj) =>
                obj.lampiranBase64
                  ? `<div class="clickable-img" style="text-align:center">
                      <img src="${obj.lampiranBase64}"
                           style="max-width:100%;max-height:200px;border-radius:6px;cursor:pointer;" />
                     </div>`
                  : "<i style='color:#888;'>Tidak ada lampiran</i>",
              onClick: {
                "clickable-img": function () {
                  const base64 = this.getValues().lampiranBase64;
                  previewLampiran(base64);
                }
              },
              height: 220
            }
          ]
        },
        {
          view: "timeline",
          id: "popupTimeline",
          borderless: false,
          scroll: true,
          type: {
            height: "auto",
            lineColor: function (obj) {
              if (obj.value === "NEW") return "#6c757d";
              if (obj.value === "PROSES") return "rgba(255, 206, 0, 1)";
              if (obj.value === "TINDAK LANJUT") return "#dc3545";
              if (obj.value === "DONE") return "rgba(0, 182, 155, 1)";
              return "#94A1B3";
            }
          },
          scheme: {
            $init: function (obj) {
              obj.$css = obj.value;
              if (!obj.details) {
                obj.details = "-";
              }
            }
          },
          data: []
        }
      ]
    }
  });

  webix.ui({
    view: "window",
    id: "riwayatPopup",
    width: 350,
    height: 500,
    position: "center",
    modal: true,
    head: {
      view: "toolbar",
      cols: [
        { width: 10 },
        { view: "label", label: "Riwayat Laporan" },
        {
          view: "icon",
          icon: "wxi-close",
          click: () => $$("riwayatPopup").hide()
        }
      ]
    },
    body: {
      rows: [
        { height: 10 },
        {
          view: "text",
          id: "searchRiwayat",
          placeholder: "Cari...",
          on: {
            onTimedKeyPress: function () {
              const value = this.getValue().toLowerCase();
              $$("riwayatList").filter(function (obj) {
                return (
                  obj.code.toLowerCase().includes(value) ||
                  (obj.category || "").toLowerCase().includes(value)
                );
              });
            }
          }
        },
        { height: 10 },
        {
          view: "list",
          id: "riwayatList",
          css: "card-list",
          template: function (obj) {
            const statusColor = getStatusColor(obj.status);
            const date = obj.date ? new Date(obj.date).toLocaleDateString() : "-";
            const category = obj.category.toUpperCase() || "-";

            return `
              <div style="padding: 14px; margin: 8px; border-radius: 8px; border: 1px solid #ddd; background: #fafafa; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="font-weight: 600; font-size: 15px; color: #be1e2d;">${obj.code}</div>
                  <span class="copy-btn" style="cursor:pointer;" title="Salin Kode">
                    <iconify-icon icon="mdi:content-copy" style="font-size: 16px;"></iconify-icon>
                  </span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                </div>

                <div style="display: flex; justify-content: space-between; margin-top: 6px;">
                  <div style="font-size: 11px; color: #555; font-weight: bold;">${date}</div>
                  <div style="font-size: 11px; color: #555; font-weight: bold;">${category}</div>
                  <div style="color: ${statusColor}; font-weight: bold; font-size: 11px;">${obj.status.toUpperCase()}</div>
                </div>
              </div>
            `;
          },
          type: {
            height: "auto"
          },
          scroll: true,
          select: false,
          onClick: {
            "copy-btn": function (e, id, node) {
              const item = this.getItem(id);
              navigator.clipboard.writeText(item.code).then(() => {
                // webix.message("Kode berhasil disalin!");
              });
            }
          }
        }
      ]
    }
  });

  
  function previewLampiran(base64) {
    $$("zoomTemplate").setHTML(`
      <div style="text-align:center; padding:10px;">
        <img src="${base64}" style="max-width:100%; max-height:100%;" />
      </div>
    `);
    $$("lampiranZoom").show();
  }
  
  webix.event(window, "resize", function () {
    grid.adjust();
  });
});
