webix.ui({
  view: "form",
  id: "companyForm",
  container: "formContainer",
  css: "registerForm",
  elements: [
    {
      cols: [
        {
          rows: [
            {
              view: "label",
              label:
                "<span>Nama Perusahaan<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "name_company",
              labelWidth: 120,
              required: true,
            },
          ],
        },
        {
          width: 100,
        },
        {
          rows: [
            {
              view: "label",
              label:
                "<span>Nomor Telp Penanggung Jawab<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "pic_number",
              labelWidth: 150,
              required: true,
            },
          ],
        },
      ],
    },
    {
      cols: [
        {
          rows: [
            {
              view: "label",
              label:
                "<span>Email<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "email",
              labelWidth: 150,
              required: true,
            },
          ],
        },
        {
          width: 100,
        },
        {
          rows: [
            {
              view: "label",
              label:
                "<span>Password<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              type: "password",
              name: "password",
              id: "password",
              required: true,
            },
          ],
        },
      ],
    },
    {
      cols: [
        {
          rows: [
            {
              view: "label",
              label:
                "<span>Sektor Bisnis<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "business_sector",
              labelWidth: 150,
              required: true,
            },
          ],
        },
        {
          width: 100,
        },
        {
          rows: [
            {
              view: "label",
              label:
                "<span>Alamat Perusahaan<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "address_company",
              labelWidth: 150,
              required: true,
            },
          ],
        },
      ],
    },
    {
      cols: [
        {
          rows: [
            {
              view: "label",
              label:
                "<span>Negara<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "country",
              labelWidth: 150,
              required: true,
            },
          ],
        },
        {
          width: 100,
        },
        {
          rows: [
            {
              view: "label",
              label:
                "<span>Nama Penanggung Jawab<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "pic_name",
              labelWidth: 150,
              required: true,
            },
          ],
        },
      ],
    },
    {
      cols: [
        {
          width: 1100,
        },
        {
          rows: [
            {
              view: "button",
              value: "Kirim",
              css: "next",
              width: 120,
              click: register_form,
            },
          ],
        },
      ],
    },
  ],
});

function showSuccessModal() {
  webix
    .ui({
      view: "window",
      id: "successModal",
      width: 400,
      height: 300,
      position: "center",
      modal: true,
      move: false,
      css: "custom-modal",
      body: {
        rows: [
          {
            template: `<div class="modal-content">
                      <div class="icon-container">
                        <img src="/icc/images/check-circle.png" class="success-icon" />
                      </div>
                      <p>Terimakasih! Registrasi Berhasil.</p>
                    </div>`,
            css: "modal-template",
            borderless: true,
          },
          {
            cols: [
              {},
              {
                view: "button",
                value: "Ok",
                css: "ok",
                width: 300,
                click: function () {
                  $$("successModal").close();
                  setTimeout(() => {
                    window.location.href = "/login";
                  }, 1300);
                },
              },
              {},
            ],
          },
        ],
      },
    })
    .show();
}

function register_form() {
  const form = $$("companyForm");
  if (form.validate()) {
    var formData = form.getValues();
    formData.type = "perusahaan";
    axios
      .post("http://localhost:3000/api/icc/register/perusahaan", formData)
      .then(function (response) {
        showSuccessModal();
      })
      .catch(function (error) {
        console.error(error);
        webix.message({
          type: "error",
          text: error.response ? error.response.data.data : "An error occurred",
        });
      });
  } else {
    webix.message({
      type: "error",
      text: "Silakan isi semua field yang wajib diisi.",
    });
  }
}
