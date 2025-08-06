webix.ui({
  view: "form",
  id: "joForm",
  container: "formContainer",
  css: "registerForm",
  elements: [
    { type: "section", template: "Data Training Order" },
    {
      cols: [
        {
          rows: [
            {
              view: "label",
              label:
                "<span>Pilih AO/TSK<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "combo",
              name: "ptsk",
              labelWidth: 150,
              required: true,
              options: [
                { id: "1", value: "TSK Tokyo" },
                { id: "2", value: "AO Osaka" },
              ],
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
                "<span>Pilih Perusahaan<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "combo",
              name: "pperusahaan",
              labelWidth: 150,
              required: true,
              options: [
                { id: "1", value: "VDCI" },
                { id: "2", value: "Rexus" },
              ],
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
                "<span>Pilih SO/P3MI<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "combo",
              name: "ppmitra",
              labelWidth: 150,
              required: true,
              options: [
                { id: "1", value: "SO Lenovo" },
                { id: "2", value: "P3MI Asus" },
              ],
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
                "<span>Jenis Kerja<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "combo",
              name: "jkerja",
              labelWidth: 150,
              required: true,
              options: [
                { id: "1", value: "Full-time" },
                { id: "2", value: "Part-time" },
              ],
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
              view: "text",
              type: "hidden",
              name: "jo",
              id: "jo",
  
              height: 0,
            },
            {
              view: "label",
              label:
                "<span>Upload Training Order<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "template",
              css: "uploadstyle",
              template: `
                          <div class="input-container">
                                <input type="text" name="joFilename" class="form-control" readonly id="joText">
                                <label for="joUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                <input type="file" id="joUpload" accept="application/pdf">
                          </div>
                        `,
              autoheight: true,
              on: {
                onAfterRender: function () {
                  const joInput = document.getElementById("joUpload");
                  const joText = document.getElementById("joText");
  
                  joInput.addEventListener("change", function () {
                    if (joInput.files.length > 0) {
                      const file = joInput.files[0];
                      joText.value = file.name;
  
                      const reader = new FileReader();
                      reader.onload = function (event) {
                        $$("jo").setValue(event.target.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  });
                },
              },
            },
          ],
        },
        {
          width: 660,
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
  const form = $$("joForm");
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
