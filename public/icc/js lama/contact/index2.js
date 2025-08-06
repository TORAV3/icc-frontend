const layoutcontact = {
  cols: [
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
        },
        {
          view: "label",
          label: "<p>Tim kami siap menerima pesan dan masukan dari Anda.</p><p>",
          align: "left",
        },
        { height: 10 },
        {
          view: "text",
          label: "Nama Lengkap",
          labelPosition: "top",
          name: "pengirim",
        },
        { height: 10 },
        {
          view: "text",
          label: "Subjek Pesan / Judul Pesan",
          labelPosition: "top",
          name: "title",
        },
        { height: 10 },
        {
          view: "textarea",
          label: "Isi Pesan / Masukan",
          height: 100,
          name: "description",
          labelPosition: "top",
        },
        { height: 10 },
        {
          view: "checkbox",
          label: "Saya setuju dengan <a href='#'>kebijakan privasi</a>",
          name: "privacy",
          labelWidth: 260,
          width: 400,
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
};

function submit_form() {
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
      setTimeout(() => {
        location.reload();
      }, 2000);
    })
    .catch(function (error) {
      webix.message({ type: "error", text: error.response.data.message });
    });
}

webix.ready(function () {
  webix.ui({
    container: "contact-page",
    rows: [layoutcontact],
  });
});
