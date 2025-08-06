function getContactResponsiveLayout() {
  const isMobile = window.innerWidth < 768;

  return {
    id: "mainContact",
    container: "contact-page",
    rows: [
      {
        cols: isMobile
          ? [
              {
                view: "form",
                id: "contactForm",
                css: "layout-contact mobile-form",
                width: 350,
                elements: [
                  {
                    view: "label",
                    label: "<h4>Hubungi Kami</h4><p>",
                    align: "left",
                    height: 48,
                  },
                  {
                    view: "label",
                    label:
                      "<p>Tim kami siap menerima pesan dan masukan dari Anda.</p><p>",
                    align: "left",
                  },
                  { height: 10 },
                  {
                    view: "text",
                    label: "Nama Lengkap",
                    labelPosition: "top",
                    name: "pengirim",
                    required: true,
                  },
                  { height: 10 },
                  {
                    view: "text",
                    label: "Subjek Pesan / Judul Pesan",
                    labelPosition: "top",
                    name: "title",
                    required: true,
                  },
                  { height: 10 },
                  {
                    view: "textarea",
                    label: "Isi Pesan / Masukan",
                    height: 100,
                    name: "description",
                    labelPosition: "top",
                    required: true,
                  },
                  { height: 10 },
                  {
                    view: "template",
                    id: "captchaBox",
                    css: "captcha",
                    template: `<div id="recaptcha-container"></div>`,
                    height: 90,
                    on: {
                      onAfterRender: function () {
                        if (typeof grecaptcha !== "undefined") {
                          grecaptcha.render("recaptcha-container", {
                            sitekey: "6LfaejkrAAAAAANu-lf8f4H1HWSZ1F9CEwthzomi",
                          });
                        } else {
                          console.warn("reCAPTCHA not loaded yet");
                        }
                      },
                    },
                  },
                  { height: 10 },
                  {
                    view: "button",
                    value: "Kirim Pesan",
                    css: "send_contact",
                    height: 50,
                    click: submit_form,
                  },
                ],
                padding: 20,
              },
            ]
          : [
              {
                view: "form",
                id: "contactForm",
                css: "layout-contact",
                width: 600,
                elements: [
                  {
                    view: "label",
                    label: "<h4>Hubungi Kami</h4><p>",
                    align: "left",
                    height: 48,
                  },
                  {
                    view: "label",
                    label:
                      "<p>Tim kami siap menerima pesan dan masukan dari Anda.</p><p>",
                    align: "left",
                  },
                  { height: 10 },
                  {
                    view: "text",
                    label: "Nama Lengkap",
                    labelPosition: "top",
                    name: "pengirim",
                    required: true,
                  },
                  { height: 10 },
                  {
                    view: "text",
                    label: "Subjek Pesan / Judul Pesan",
                    labelPosition: "top",
                    name: "title",
                    required: true,
                  },
                  { height: 10 },
                  {
                    view: "textarea",
                    label: "Isi Pesan / Masukan",
                    height: 100,
                    name: "description",
                    labelPosition: "top",
                    required: true,
                  },
                  { height: 10 },
                  {
                    view: "template",
                    id: "captchaBox",
                    css: "captcha",
                    template: `<div id="recaptcha-container"></div>`,
                    height: 90,
                    on: {
                      onAfterRender: function () {
                        if (typeof grecaptcha !== "undefined") {
                          grecaptcha.render("recaptcha-container", {
                            sitekey: "6LfaejkrAAAAAANu-lf8f4H1HWSZ1F9CEwthzomi",
                          });
                        } else {
                          console.warn("reCAPTCHA not loaded yet");
                        }
                      },
                    },
                  },
                  { height: 10 },
                  {
                    view: "button",
                    value: "Kirim Pesan",
                    css: "send_contact",
                    height: 50,
                    click: submit_form,
                  },
                ],
                padding: 20,
              },
              {
                css: "layout-contact",
                template:
                  "<img src='/icc/images/payung.png' style='width:70%; height:auto;'>",
                height: 720,
              },
            ],
      },
    ],
  };
}

function submit_form() {
  const response = grecaptcha.getResponse();

  if (!response) {
    webix.message({
      type: "error",
      text: "Mohon selesaikan captcha terlebih dahulu.",
    });
    return;
  }

  const form = $$("contactForm");

  if (!form.validate()) {
    webix.message({ type: "error", text: "Harap isi semua kolom yang wajib!" });
    return;
  }

  var formData = form.getValues();
  formData.jenis = "saran";
  formData.status = "done";
  formData.lokasi = "web";
  formData.tanggal = new Date().toISOString().slice(0, 10);

  axios
    .post(`http://localhost:3000/api/icc/aduan/tambah`, formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      webix.message({ type: "success", text: "Saran telah dikirim" });
      grecaptcha.reset();
      setTimeout(() => {
        location.reload();
      }, 2000);
    })
    .catch(function (error) {
      webix.message({ type: "error", text: error.response.data.message });
    });
}

function showLoadingOverlayContact() {
  const overlay = document.getElementById("loadingOverlayCharity");
  if (overlay) overlay.style.display = "flex";
}

function hideLoadingOverlayContact() {
  const overlay = document.getElementById("loadingOverlayContact");
  if (overlay) overlay.style.display = "none";
}

webix.ready(function () {
  showLoadingOverlayContact();

  webix.ui(
    getContactResponsiveLayout(),
    document.getElementById("contact-page")
  );

  setTimeout(() => {
    hideLoadingOverlayContact();
  }, 300);

  webix.event(window, "resize", function () {
    const old = $$("mainContact");
    if (old) {
      old.destructor();
    }
    webix.ui(
      getContactResponsiveLayout(),
      document.getElementById("contact-page")
    );
  });
});