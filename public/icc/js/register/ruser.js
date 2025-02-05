const step1Form = {
  view: "form",
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
                "<span>Nama Lengkap<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "fullname",
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
                "<span>Alamat di Indonesia<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "address_indo",
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
        {
          width: 100,
        },
        {
          rows: [
            {
              view: "label",
              label:
                "<span>Alamat Email<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "email",
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
                "<span>Nomor Kontak Saat Ini<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "phone",
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
                "<span>Alamat di Jepang<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "address_japan",
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
                "<span>Nama Perusahaan<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "company_name",
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
                "<span>Nama Asosiasi/TSK<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "association_name",
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
                "<span>Alamat Asosiasi<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "address_association",
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
                "<span>Riwayat Masuk Kerja ke Jepang<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "career_history",
              labelWidth: 150,
              required: true,
            },
          ],
        },
        {
          width: 690,
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
              css: "next",
              view: "button",
              value: "Selanjutnya",
              align: "center",
              click: function () {
                const currentForm = $$("multiStepForm").getChildViews()[0];

                if (currentForm.validate()) {
                  setActiveStep(1);
                } else {
                  webix.message({
                    type: "error",
                    text: "Silakan isi semua field yang wajib diisi.",
                  });
                }
              },
            },
          ],
        },
      ],
    },
  ],
};

const step2Form = {
  view: "form",
  container: "formContainer",
  css: "registerForm",
  elements: [
    {
      cols: [
        {
          rows: [
            {
              view: "label",
              label: "Pernah di tolak pengajuan surat izin tinggal",
            },
            {
              view: "combo",
              name: "rejected",
              labelWidth: 120,
              options: [
                { id: "1", value: "PERNAH" },
                { id: "0", value: "TIDAK PERNAH" },
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
              cols: [
                {
                  rows: [
                    {
                      view: "text",
                      type: "hidden",
                      name: "upload_file",
                      id: "upload_file",

                      height: 0,
                    },
                    {
                      view: "label",
                      label:
                        "<span>Upload Berkas (Untuk Peserta Non ISO Jepang/LPPR)<span class='text-danger ms-1'> *</span></span>",
                    },
                    {
                      view: "template",
                      css: "uploadstyle",
                      template: `
                            <div class="input-container">
                                  <input type="text" name="uploadfileName" class="form-control" readonly id="uploadfileText">
                                  <label for="uploadfileUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                  <input type="file" id="uploadfileUpload" accept="application/pdf">
                            </div>
                          `,
                      autoheight: true,
                      on: {
                        onAfterRender: function () {
                          const fileInput =
                            document.getElementById("uploadfileUpload");
                          const fileText =
                            document.getElementById("uploadfileText");

                          fileInput.addEventListener("change", function () {
                            if (fileInput.files.length > 0) {
                              const file = fileInput.files[0];
                              fileText.value = file.name;

                              const reader = new FileReader();
                              reader.onload = function (event) {
                                $$("upload_file").setValue(event.target.result);
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
      ],
    },
    {
      cols: [
        {
          rows: [
            {
              view: "label",
              label: "Apabila pernah, berapa kali dan kapan",
            },
            {
              view: "text",
              name: "rejected_detail",
              labelWidth: 150,
            },
          ],
        },
        {
          width: 100,
        },
        {
          rows: [
            {
              cols: [
                {
                  rows: [
                    {
                      view: "text",
                      type: "hidden",
                      name: "ktp",
                      id: "ktp",
                      required: true,
                      height: 0,
                    },
                    {
                      view: "label",
                      label:
                        "<span>KTP Indonesia<span class='text-danger ms-1'> *</span></span>",
                    },
                    {
                      view: "template",
                      css: "uploadstyle",
                      template: `
                            <div class="input-container">
                                  <input type="text" name="ktpName" class="form-control" readonly id="ktpText">
                                  <label for="ktpUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                  <input type="file" id="ktpUpload" accept="application/pdf">
                            </div>
                          `,
                      autoheight: true,
                      on: {
                        onAfterRender: function () {
                          const fileInput =
                            document.getElementById("ktpUpload");
                          const fileText = document.getElementById("ktpText");

                          fileInput.addEventListener("change", function () {
                            if (fileInput.files.length > 0) {
                              const file = fileInput.files[0];
                              fileText.value = file.name;

                              const reader = new FileReader();
                              reader.onload = function (event) {
                                $$("ktp").setValue(event.target.result);
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
      ],
    },
    {
      cols: [
        {
          rows: [
            {
              view: "label",
              label:
                "<span>Bidang Kerja saat ini<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "work_field",
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
              cols: [
                {
                  rows: [
                    {
                      view: "text",
                      type: "hidden",
                      name: "zairyoukado",
                      id: "zairyoukado",
                      required: true,
                      height: 0,
                    },
                    {
                      view: "label",
                      label:
                        "<span>Zairyoukado (2 halaman file PDF, depan dan belakang)<span class='text-danger ms-1'> *</span></span>",
                    },
                    {
                      view: "template",
                      css: "uploadstyle",
                      template: `
                            <div class="input-container">
                                  <input type="text" name="zairyoukadoName" class="form-control" readonly id="zairyoukadoText">
                                  <label for="zairyoukadoUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                  <input type="file" id="zairyoukadoUpload" accept="application/pdf">
                            </div>
                          `,
                      autoheight: true,
                      on: {
                        onAfterRender: function () {
                          const fileInput =
                            document.getElementById("zairyoukadoUpload");
                          const fileText =
                            document.getElementById("zairyoukadoText");

                          fileInput.addEventListener("change", function () {
                            if (fileInput.files.length > 0) {
                              const file = fileInput.files[0];
                              fileText.value = file.name;

                              const reader = new FileReader();
                              reader.onload = function (event) {
                                $$("zairyoukado").setValue(event.target.result);
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
      ],
    },
    {
      cols: [
        {
          rows: [
            {
              view: "label",
              label:
                "<span>Bidang Kerja yang Minati<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "interest_field",
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
              cols: [
                {
                  rows: [
                    {
                      view: "text",
                      type: "hidden",
                      name: "ijazah",
                      id: "ijazah",
                      required: true,
                      height: 0,
                    },
                    {
                      view: "label",
                      label:
                        "<span>Ijazah Terakhir<span class='text-danger ms-1'> *</span></span>",
                    },
                    {
                      view: "template",
                      css: "uploadstyle",
                      template: `
                            <div class="input-container">
                                  <input type="text" name="ijazahName" class="form-control" readonly id="ijazahText">
                                  <label for="ijazahUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                  <input type="file" id="ijazahUpload" accept="application/pdf">
                            </div>
                          `,
                      autoheight: true,
                      on: {
                        onAfterRender: function () {
                          const fileInput =
                            document.getElementById("ijazahUpload");
                          const fileText =
                            document.getElementById("ijazahText");

                          fileInput.addEventListener("change", function () {
                            if (fileInput.files.length > 0) {
                              const file = fileInput.files[0];
                              fileText.value = file.name;

                              const reader = new FileReader();
                              reader.onload = function (event) {
                                $$("ijazah").setValue(event.target.result);
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
      ],
    },
    {
      cols: [
        {
          rows: [
            {
              view: "label",
              label:
                "<span>Masa Kontrak (Dari Kapan sampai Kapan)<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "contract_period",
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
              cols: [
                {
                  rows: [
                    {
                      view: "text",
                      type: "hidden",
                      name: "certificate",
                      id: "certificate",
                      required: true,
                      height: 0,
                    },
                    {
                      view: "label",
                      label:
                        "<span>Sertifikat 3 kyuu/jftest/hyoukachosho/JLPT(diatas N5)<span class='text-danger ms-1'> *</span></span>",
                    },
                    {
                      view: "template",
                      css: "uploadstyle",
                      template: `
                            <div class="input-container">
                                  <input type="text" name="certificateName" class="form-control" readonly id="certificateText">
                                  <label for="certificateUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                  <input type="file" id="certificateUpload" accept="application/pdf">
                            </div>
                          `,
                      autoheight: true,
                      on: {
                        onAfterRender: function () {
                          const fileInput =
                            document.getElementById("certificateUpload");
                          const fileText =
                            document.getElementById("certificateText");

                          fileInput.addEventListener("change", function () {
                            if (fileInput.files.length > 0) {
                              const file = fileInput.files[0];
                              fileText.value = file.name;

                              const reader = new FileReader();
                              reader.onload = function (event) {
                                $$("certificate").setValue(event.target.result);
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
      ],
    },
    {
      cols: [
        {
          width: 900,
        },
        {
          view: "button",
          value: "Kembali",
          css: "back",
          align: "left",
          click: function () {
            setActiveStep(0);
          },
        },
        {
          width: 10,
        },
        {
          rows: [
            {
              css: "next",
              view: "button",
              value: "Selanjutnya",
              align: "center",
              click: function () {
                const currentForm = $$("multiStepForm").getChildViews()[1];

                if (currentForm.validate()) {
                  setActiveStep(2);
                } else {
                  webix.message({
                    type: "error",
                    text: "Silakan isi semua field yang wajib diisi.",
                  });
                }
              },
            },
          ],
        },
      ],
    },
  ],
};

const step3Form = {
  view: "form",
  container: "formContainer",
  css: "registerForm",
  elements: [
    {
      cols: [
        {
          rows: [
            {
              view: "text",
              type: "hidden",
              name: "certificate_field",
              id: "certificate_field",

              height: 0,
            },
            {
              view: "label",
              label: "Sertifikat Skill Bidang",
            },
            {
              view: "template",
              css: "uploadstyle",
              template: `
                    <div class="input-container">
                          <input type="text" name="certificatefieldName" class="form-control" readonly id="certificatefieldText">
                          <label for="certificatefieldUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                          <input type="file" id="certificatefieldUpload" accept="application/pdf">
                    </div>
                  `,
              autoheight: true,
              on: {
                onAfterRender: function () {
                  const fileInput = document.getElementById(
                    "certificatefieldUpload"
                  );
                  const fileText = document.getElementById(
                    "certificatefieldText"
                  );

                  fileInput.addEventListener("change", function () {
                    if (fileInput.files.length > 0) {
                      const file = fileInput.files[0];
                      fileText.value = file.name;

                      const reader = new FileReader();
                      reader.onload = function (event) {
                        $$("certificate_field").setValue(event.target.result);
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
          width: 100,
        },
        {
          rows: [
            {
              view: "label",
              label:
                "<span>My Number<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "text",
              name: "my_number",
              labelWidth: 150,
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
              name: "cv",
              id: "cv",
              required: true,
              height: 0,
            },
            {
              view: "label",
              label:
                "<span>CV Lama<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "template",
              css: "uploadstyle",
              template: `
                    <div class="input-container">
                          <input type="text" name="cvName" class="form-control" readonly id="cvText">
                          <label for="cvUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                          <input type="file" id="cvUpload" accept="application/pdf">
                    </div>
                  `,
              autoheight: true,
              on: {
                onAfterRender: function () {
                  const fileInput = document.getElementById("cvUpload");
                  const fileText = document.getElementById("cvText");

                  fileInput.addEventListener("change", function () {
                    if (fileInput.files.length > 0) {
                      const file = fileInput.files[0];
                      fileText.value = file.name;

                      const reader = new FileReader();
                      reader.onload = function (event) {
                        $$("cv").setValue(event.target.result);
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
          width: 100,
        },
        {
          rows: [
            {
              view: "text",
              type: "hidden",
              name: "photograph",
              id: "photograph",
              required: true,
              height: 0,
            },
            {
              view: "label",
              label:
                "<span>Pas foto terbaru 3 bulan terakhir (Background Putih uk 3x4)<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "template",
              css: "uploadstyle",
              template: `
                    <div class="input-container">
                          <input type="text" name="photographName" class="form-control" readonly id="photographText">
                          <label for="photographUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                          <input type="file" id="photographUpload" accept="application/pdf">
                    </div>
                  `,
              autoheight: true,
              on: {
                onAfterRender: function () {
                  const fileInput = document.getElementById("photographUpload");
                  const fileText = document.getElementById("photographText");

                  fileInput.addEventListener("change", function () {
                    if (fileInput.files.length > 0) {
                      const file = fileInput.files[0];
                      fileText.value = file.name;

                      const reader = new FileReader();
                      reader.onload = function (event) {
                        $$("photograph").setValue(event.target.result);
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
    {
      cols: [
        {
          rows: [
            {
              view: "text",
              type: "hidden",
              name: "immigration_passport",
              id: "immigration_passport",

              height: 0,
            },
            {
              view: "label",
              label: "Bagian Paspor yg ada cap imigrasinya *",
            },
            {
              view: "template",
              css: "uploadstyle",
              template: `
                    <div class="input-container">
                          <input type="text" name="immigrationpassportName" class="form-control" readonly id="immigrationpassportText">
                          <label for="immigrationpassportUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                          <input type="file" id="immigrationpassportUpload" accept="application/pdf">
                    </div>
                  `,
              autoheight: true,
              on: {
                onAfterRender: function () {
                  const fileInput = document.getElementById(
                    "immigrationpassportUpload"
                  );
                  const fileText = document.getElementById(
                    "immigrationpassportText"
                  );

                  fileInput.addEventListener("change", function () {
                    if (fileInput.files.length > 0) {
                      const file = fileInput.files[0];
                      fileText.value = file.name;

                      const reader = new FileReader();
                      reader.onload = function (event) {
                        $$("immigration_passport").setValue(
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
        {
          width: 690,
        },
      ],
    },
    {
      cols: [
        {
          cols: [
            {
              rows: [
                {
                  view: "text",
                  type: "hidden",
                  name: "latest_passport",
                  id: "latest_passport",
                  required: true,

                  height: 0,
                },
                {
                  view: "label",
                  label:
                    "<span>Bagian Paspor yg ada cap imigrasinya<span class='text-danger ms-1'> *</span></span>",
                },
                {
                  view: "template",
                  css: "uploadstyle",
                  template: `
                        <div class="input-container">
                              <input type="text" name="latestpassportName" class="form-control" readonly id="latestpassportText">
                              <label for="latestpassportUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                              <input type="file" id="latestpassportUpload" accept="application/pdf">
                        </div>
                      `,
                  autoheight: true,
                  on: {
                    onAfterRender: function () {
                      const fileInput = document.getElementById(
                        "latestpassportUpload"
                      );
                      const fileText =
                        document.getElementById("latestpassportText");

                      fileInput.addEventListener("change", function () {
                        if (fileInput.files.length > 0) {
                          const file = fileInput.files[0];
                          fileText.value = file.name;

                          const reader = new FileReader();
                          reader.onload = function (event) {
                            $$("latest_passport").setValue(event.target.result);
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
        {
          width: 690,
        },
      ],
    },
    {
      cols: [
        {
          width: 900,
        },
        {
          view: "button",
          value: "Kembali",
          css: "back",
          align: "left",
          click: function () {
            setActiveStep(1);
          },
        },
        {
          width: 10,
        },
        {
          rows: [
            {
              css: "next",
              view: "button",
              value: "Submit",
              align: "center",
              click: function () {
                const currentForm = $$("multiStepForm").getChildViews()[2];

                if (currentForm.validate()) {
                  saveForm;
                } else {
                  webix.message({
                    type: "error",
                    text: "Silakan isi semua field yang wajib diisi.",
                  });
                }
              },
            },
          ],
        },
      ],
    },
  ],
};

webix.ready(function () {
  grid = webix.ui({
    id: "multiStepForm",
    container: "formContainer",
    view: "multiview",
    cells: [step1Form, step2Form, step3Form],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });
});

function setActiveStep(stepIndex) {
  const multiview = $$("multiStepForm");
  const steps = multiview.getChildViews();

  if (steps && stepIndex >= 0 && stepIndex < steps.length) {
    multiview.setValue(steps[stepIndex].config.id);
  } else {
    console.error("Invalid step index or steps are undefined.");
  }
}

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
                      <span>Dokumen anda akan kami review, Untuk selanjutnya mengikuti ke tahap berikutnya.<span>
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

function saveForm() {
  const formValues = {};
  $$("multiStepForm")
    .getChildViews()
    .forEach((form) => {
      if (form.getValues) {
        Object.assign(formValues, form.getValues());
      }
    });

  formValues.type = "peserta";

  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has("pmi")) {
    formValues.program_type = "pmi";
  } else if (urlParams.has("magang")) {
    formValues.program_type = "magang";
  }

  console.log(formValues);

  axios
    .post("http://localhost:3000/api/icc/register/peserta", formValues)
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
}
