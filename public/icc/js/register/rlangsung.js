var formlangsung = {
  view: "form",
  id: "langsungForm",
  css: "registerForm",
  elements: [
    { type: "section", template: "Data Akun (アカウント情報)" },
    {
      cols: [
        {
          rows: [
            {
              view: "label",
              label:
                "<span>Email (メール)<span class='text-danger ms-1'> *</span></span>",
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
                "<span>Password (パスワード)<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "search",
              type: "password",
              name: "password",
              id: "password",
              required: true,
              icon:"wxi-eye",
              on:{
                onSearchIconClick:function(e){
                  const input = this.getInputNode();
                  webix.html.removeCss(e.target, "wxi-eye-slash");
                  webix.html.removeCss(e.target, "wxi-eye");
                  if(input.type == "text"){           
                    webix.html.addCss(e.target, "wxi-eye");
                    input.type = "password";
                  } else {
                    webix.html.addCss(e.target, "wxi-eye-slash");
                    input.type = "text";
                  }
                }
              },
            },
          ],
        },
      ],
    },
    { type: "section", template: "Data Perusahaan (企業情報)" },
    {
      cols: [
        {
          rows: [
            {
              view: "label",
              label:
                "<span>Nama Perusahaan (会社名)<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "name",
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
                "<span>Alamat Perusahaan (会社住所)<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "textarea",
              name: "address",
              labelWidth: 150,
              required: true,
              height: 150,
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
                "<span>Nama Penanggung Jawab (責任者名)<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "picname",
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
                "<span>Nomor Telp Penanggung Jawab (責任者電話番号)<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "picnumber",
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
                "<span>Negara (国)<span class='text-danger ms-1'> *</span></span>",
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
                "<span>Sektor Bisnis (ビジネスセクター)<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "businesssector",
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
              value: "Kirim (送信)",
              css: "next",
              width: 120,
              click: register_form,
            },
          ],
        },
      ],
    },
  ],
  rules: {
    email: webix.rules.isEmail,
  },
};

webix.ready(function () {
  grid = webix.ui({
    container: "formContainer",
    rows: [formlangsung],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });
});

function showSuccessModal() {
  webix
    .ui({
      view: "window",
      id: "successModal",
      width: 400,
      height: 350,
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
                      <p>Terimakasih! Registrasi Berhasil. (ありがとうございました！登録が完了しました。)</p>
                    </div>`,
            css: "modal-template",
            borderless: true,
          },
          {
            cols: [
              {},
              {
                view: "button",
                value: "OK",
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
  const form = $$("langsungForm");
  if (form.validate()) {
    var formData = form.getValues();
    formData.type = "langsung";

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
      text: "Silakan isi semua field yang wajib diisi. (すべての必須項目を入力してください。)",
    });
  }
}
