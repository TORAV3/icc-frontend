const step1Form = {
  view: "form",
  container: "formContainer",
  css: "registerForm",
  id: "step1Form",
  elements: [
    { type: "section", template: "Data Akun " },
    {
      id: "formres",
      rows: [
        {
          responsive: "formres",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  id: "row1",
                  margin: 10,
                  rows: [
                    {
                      view: "text",
                      type: "hidden",
                      name: "userId",
                      id: "userId",
                      height: 0,
                    },
                    {
                      responsive: "row1",
                      cols: [
                        {
                          view: "text",
                          name: "email",
                          id: "email",
                          label: "Email",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                        },
                        { width: 80 },
                        {
                          view: "search",
                          type: "password",
                          name: "password",
                          id: "password",
                          required: true,
                          label: "Password",
                          labelPosition: "top",
                          minWidth: 300,
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
                { type: "section", template: "Data Diri " },
                {
                  id: "row2",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row2",
                      cols: [
                        {
                          view: "text",
                          name: "fullname",
                          id: "fullname",
                          label: "Nama Lengkap",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                        },
                        { width: 80 },
                        {
                          view: "text",
                          name: "nik",
                          id: "nik",
                          label: "No. NIK",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row3",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row3",
                      cols: [
                        {
                          view: "text",
                          name: "phone",
                          id: "phone",
                          label: "No. HP",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                        },
                        { width: 80 },
                        {
                          view: "combo",
                          label: "Jenis Kelamin",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "p", value: "Perempuan" },
                            { id: "l", value: "Laki-Laki" },
                          ],
                          minWidth: 300,
                          name: "gender",
                          id: "gender",
                          required: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row4",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row4",
                      cols: [
                        {
                          view: "text",
                          type: "number",
                          id: "height",
                          name: "height",
                          label: "Tinggi Badan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                        },
                        { width: 80 },
                        {
                          view: "text",
                          type: "number",
                          name: "weight",
                          id: "weight",
                          label: "Berat Badan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row5",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row5",
                      cols: [
                        {
                          view: "text",
                          name: "birthplace",
                          id: "birthplace",
                          label: "Tempat Lahir",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                        },
                        { width: 80 },
                        {
                          view: "datepicker",
                          name: "birthdate",
                          id: "birthdate",
                          label: "Tanggal Lahir",
                          labelPosition: "top",
                          minWidth: 300,
                          required: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row6",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row6",
                      cols: [
                        {
                          view: "combo",
                          label: "Agama",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "islam", value: "Islam" },
                            { id: "katolik", value: "Katolik" },
                            { id: "protestan", value: "Protestan" },
                            { id: "hindu", value: "Hindu" },
                            { id: "buddha", value: "Buddha" },
                            { id: "konghucu", value: "Konghucu" },
                          ],
                          minWidth: 300,
                          name: "religion",
                          id: "religion",
                          required: true,
                        },
                        { width: 80 },
                        {
                          view: "combo",
                          label: "Pendidikan Terakhir",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "sd", value: "SD" },
                            { id: "smp", value: "SMP" },
                            { id: "sma", value: "SMA" },
                            { id: "d3", value: "D3" },
                            { id: "s1", value: "S1" },
                            { id: "s2", value: "S2" },
                            { id: "s3", value: "S3" },
                          ],
                          minWidth: 300,
                          name: "lastedu",
                          id: "lastedu",
                          required: true,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row7",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row7",
                      cols: [
                        {
                          view: "combo",
                          label: "Pernah mengikuti pelatihan sebelumnya?",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "0", value: "Tidak" },
                            { id: "1", value: "Ya" },
                          ],
                          minWidth: 300,
                          name: "trainbef",
                          id: "trainbef",
                          required: true,
                        },
                        { width: 80 },
                        {
                          view: "text",
                          name: "city",
                          id: "city",
                          label: "Kota/Kabupaten",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row8",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row8",
                      cols: [
                        {
                          view: "textarea",
                          id: "address",
                          name: "address",
                          height: 120,
                          label: "Alamat",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                        },
                        { minWidth: 300 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    { height: 18 },
    {
      margin: 10,
      cols: [
        {},
        {
          view: "button",
          value: "Selanjutnya",
          css: "next",
          autowidth: true,
          click: goStep2Form,
        },
      ],
    },
  ],
  rules: {
    fullname: webix.rules.isNotEmpty,
    email: webix.rules.isEmail,
    phone: webix.rules.isNotEmpty,
    nik: webix.rules.isNotEmpty,
    trainbef: webix.rules.isNotEmpty,
    gender: webix.rules.isNotEmpty,
    height: webix.rules.isNotEmpty,
    weight: webix.rules.isNotEmpty,
    birthplace: webix.rules.isNotEmpty,
    birthdate: webix.rules.isNotEmpty,
    lastedu: webix.rules.isNotEmpty,
    program: webix.rules.isNotEmpty,
    city: webix.rules.isNotEmpty,
    address: webix.rules.isNotEmpty,
  },
};

function goStep2Form() {
  // const form = $$("step1Form");
  // if (form.validate()) {
  // }
  setActiveStep(1);
}

const step2Form = {
  view: "form",
  container: "formContainer",
  css: "registerForm",
  id: "step2Form",
  elements: [
    { type: "section", template: "Data Keluarga " },
    {
      id: "formres3",
      margin: 10,
      css: "marystyle",
      rows: [
        {
          responsive: "formres3",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  view: "text",
                  name: "dadName",
                  id: "dadName",
                  label: "Nama Ayah",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "dadPhone",
                  id: "dadPhone",
                  label: "No. HP Ayah",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                },
                {
                  view: "textarea",
                  id: "dadAddress",
                  name: "dadAddress",
                  height: 120,
                  label: "Alamat Ayah",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                },
              ],
            },
            { width: 50 },
            {
              margin: 10,
              rows: [
                {
                  view: "text",
                  name: "momName",
                  id: "momName",
                  label: "Nama Ibu",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "momPhone",
                  id: "momPhone",
                  label: "No. HP Ibu",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                },
                {
                  view: "textarea",
                  id: "momAddress",
                  name: "momAddress",
                  height: 120,
                  label: "Alamat Ibu",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                },
              ],
            },
            { width: 50 },
            {
              margin: 10,
              rows: [
                {
                  view: "text",
                  name: "kinsmanName",
                  id: "kinsmanName",
                  label: "Nama Kerabat",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                },
                {
                  view: "text",
                  name: "kinsmanPhone",
                  id: "kinsmanPhone",
                  label: "No. HP Kerabat",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                },
                {
                  view: "textarea",
                  id: "kinsmanAddress",
                  name: "kinsmanAddress",
                  height: 120,
                  label: "Alamat Kerabat",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                },
              ],
            },
          ],
        },
      ],
    },
    { height: 18 },
    {
      margin: 10,
      cols: [
        {},
        {
          view: "button",
          value: "Kembali",
          css: "back",
          autowidth: true,
          click: function () {
            setActiveStep(0);
          },
        },
        {
          view: "button",
          value: "Selanjutnya",
          css: "next",
          autowidth: true,
          click: goStep3Form,
        },
      ],
    },
  ],
  rules: {
    dadName: webix.rules.isNotEmpty,
    dadPhone: webix.rules.isNotEmpty,
    dadAddress: webix.rules.isNotEmpty,
    momName: webix.rules.isNotEmpty,
    momPhone: webix.rules.isNotEmpty,
    momAddress: webix.rules.isNotEmpty,
    kinsmanName: webix.rules.isNotEmpty,
    kinsmanPhone: webix.rules.isNotEmpty,
    kinsmanAddress: webix.rules.isNotEmpty,
  },
};

function goStep3Form() {
  // const form = $$("step2Form");
  // if (form.validate()) {
  // }
  setActiveStep(2);
}

const step3Form = {
  view: "form",
  container: "formContainer",
  id: "step3Form",
  css: "registerForm",
  elements: [
    { type: "section", template: "Data Pendukung " },
    {
      id: "formres2",
      rows: [
        {
          responsive: "formres2",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  id: "row9",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row9",
                      cols: [
                        {
                          minWidth: 300,
                          rows: [
                            {
                              view: "text",
                              type: "hidden",
                              name: "pasFoto",
                              id: "pasFoto",

                              height: 0,
                            },
                            {
                              view: "label",
                              label:
                                "<span>Unggah Pas Foto 3x4<span class='text-danger ms-1'> *</span></span>",
                            },
                            {
                              view: "template",
                              css: "uploadstyle",
                              template: `
                                      <div class="input-container">
                                            <input type="text" name="pasFotoFilename" class="form-control" readonly id="pasFotoText">
                                            <label for="pasFotoUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                            <input type="file" id="pasFotoUpload" accept="image/*">
                                      </div>
                                    `,
                              autoheight: true,
                              on: {
                                onAfterRender: function () {
                                  const pasFotoInput =
                                    document.getElementById("pasFotoUpload");
                                  const pasFotoText =
                                    document.getElementById("pasFotoText");

                                  pasFotoInput.addEventListener(
                                    "change",
                                    function () {
                                      if (pasFotoInput.files.length > 0) {
                                        const file = pasFotoInput.files[0];
                                        pasFotoText.value = file.name;

                                        const reader = new FileReader();
                                        reader.onload = function (event) {
                                          $$("pasFoto").setValue(
                                            event.target.result
                                          );
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }
                                  );
                                },
                              },
                            },
                          ],
                        },
                        { width: 70 },
                        {
                          minWidth: 300,
                          rows: [
                            {
                              view: "text",
                              type: "hidden",
                              name: "fullBodyFoto",
                              id: "fullBodyFoto",

                              height: 0,
                            },
                            {
                              view: "label",
                              label:
                                "<span>Unggah Foto Full Body<span class='text-danger ms-1'> *</span></span>",
                            },
                            {
                              view: "template",
                              css: "uploadstyle",
                              template: `
                                    <div class="input-container">
                                          <input type="text" name="fullBodyFilename" class="form-control" readonly id="fullBodyFotoText">
                                          <label for="fullBodyFotoUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                          <input type="file" id="fullBodyFotoUpload" accept="image/*">
                                    </div>
                                  `,
                              autoheight: true,
                              on: {
                                onAfterRender: function () {
                                  const fullBodyFotoInput =
                                    document.getElementById(
                                      "fullBodyFotoUpload"
                                    );
                                  const fullBodyFotoText =
                                    document.getElementById("fullBodyFotoText");

                                  fullBodyFotoInput.addEventListener(
                                    "change",
                                    function () {
                                      if (fullBodyFotoInput.files.length > 0) {
                                        const file = fullBodyFotoInput.files[0];
                                        fullBodyFotoText.value = file.name;

                                        const reader = new FileReader();
                                        reader.onload = function (event) {
                                          $$("fullBodyFoto").setValue(
                                            event.target.result
                                          );
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }
                                  );
                                },
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row10",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row10",
                      cols: [
                        {
                          minWidth: 300,
                          rows: [
                            {
                              view: "text",
                              type: "hidden",
                              name: "ktp",
                              id: "ktp",

                              height: 0,
                            },
                            {
                              view: "label",
                              label:
                                "<span>Unggah Kartu Tanda Penduduk<span class='text-danger ms-1'> *</span></span>",
                            },
                            {
                              view: "template",
                              css: "uploadstyle",
                              template: `
                                      <div class="input-container">
                                            <input type="text" name="ktpFilename" class="form-control" readonly id="ktpText">
                                            <label for="ktpUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                            <input type="file" id="ktpUpload" accept="application/pdf">
                                      </div>
                                    `,
                              autoheight: true,
                              on: {
                                onAfterRender: function () {
                                  const ktpInput =
                                    document.getElementById("ktpUpload");
                                  const ktpText =
                                    document.getElementById("ktpText");

                                  ktpInput.addEventListener(
                                    "change",
                                    function () {
                                      if (ktpInput.files.length > 0) {
                                        const file = ktpInput.files[0];
                                        ktpText.value = file.name;

                                        const reader = new FileReader();
                                        reader.onload = function (event) {
                                          $$("ktp").setValue(
                                            event.target.result
                                          );
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }
                                  );
                                },
                              },
                            },
                          ],
                        },
                        { width: 70 },
                        {
                          minWidth: 300,
                          rows: [
                            {
                              view: "text",
                              type: "hidden",
                              name: "kk",
                              id: "kk",

                              height: 0,
                            },
                            {
                              view: "label",
                              label:
                                "<span>Unggah Kartu Keluarga<span class='text-danger ms-1'> *</span></span>",
                            },
                            {
                              view: "template",
                              css: "uploadstyle",
                              template: `
                                    <div class="input-container">
                                          <input type="text" name="kkFilename" class="form-control" readonly id="kkText">
                                          <label for="kkUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                          <input type="file" id="kkUpload" accept="application/pdf">
                                    </div>
                                  `,
                              autoheight: true,
                              on: {
                                onAfterRender: function () {
                                  const kkInput =
                                    document.getElementById("kkUpload");
                                  const kkText =
                                    document.getElementById("kkText");

                                  kkInput.addEventListener(
                                    "change",
                                    function () {
                                      if (kkInput.files.length > 0) {
                                        const file = kkInput.files[0];
                                        kkText.value = file.name;

                                        const reader = new FileReader();
                                        reader.onload = function (event) {
                                          $$("kk").setValue(
                                            event.target.result
                                          );
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }
                                  );
                                },
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row11",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row11",
                      cols: [
                        {
                          minWidth: 300,
                          rows: [
                            {
                              view: "text",
                              type: "hidden",
                              name: "akta",
                              id: "akta",

                              height: 0,
                            },
                            {
                              view: "label",
                              label:
                                "<span>Unggah Akta Kelahiran<span class='text-danger ms-1'> *</span></span>",
                            },
                            {
                              view: "template",
                              css: "uploadstyle",
                              template: `
                                      <div class="input-container">
                                            <input type="text" name="aktaFilename" class="form-control" readonly id="aktaText">
                                            <label for="aktaUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                            <input type="file" id="aktaUpload" accept="application/pdf">
                                      </div>
                                    `,
                              autoheight: true,
                              on: {
                                onAfterRender: function () {
                                  const aktaInput =
                                    document.getElementById("aktaUpload");
                                  const aktaText =
                                    document.getElementById("aktaText");

                                  aktaInput.addEventListener(
                                    "change",
                                    function () {
                                      if (aktaInput.files.length > 0) {
                                        const file = aktaInput.files[0];
                                        aktaText.value = file.name;

                                        const reader = new FileReader();
                                        reader.onload = function (event) {
                                          $$("akta").setValue(
                                            event.target.result
                                          );
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }
                                  );
                                },
                              },
                            },
                          ],
                        },
                        { width: 70 },
                        {
                          minWidth: 300,
                          rows: [
                            {
                              view: "text",
                              type: "hidden",
                              name: "ijazah",
                              id: "ijazah",

                              height: 0,
                            },
                            {
                              view: "label",
                              label:
                                "<span>Unggah Ijazah Terakhir<span class='text-danger ms-1'> *</span></span>",
                            },
                            {
                              view: "template",
                              css: "uploadstyle",
                              template: `
                                    <div class="input-container">
                                          <input type="text" name="ijazahFilename" class="form-control" readonly id="ijazahText">
                                          <label for="ijazahUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                          <input type="file" id="ijazahUpload" accept="application/pdf">
                                    </div>
                                  `,
                              autoheight: true,
                              on: {
                                onAfterRender: function () {
                                  const ijazahInput =
                                    document.getElementById("ijazahUpload");
                                  const ijazahText =
                                    document.getElementById("ijazahText");

                                  ijazahInput.addEventListener(
                                    "change",
                                    function () {
                                      if (ijazahInput.files.length > 0) {
                                        const file = ijazahInput.files[0];
                                        ijazahText.value = file.name;

                                        const reader = new FileReader();
                                        reader.onload = function (event) {
                                          $$("ijazah").setValue(
                                            event.target.result
                                          );
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }
                                  );
                                },
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row12",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row12",
                      cols: [
                        {
                          minWidth: 300,
                          rows: [
                            {
                              view: "text",
                              type: "hidden",
                              name: "sks",
                              id: "sks",

                              height: 0,
                            },
                            {
                              view: "label",
                              label:
                                "<span>Unggah Surat Keterangan Sehat<span class='text-danger ms-1'> *</span></span>",
                            },
                            {
                              view: "template",
                              css: "uploadstyle",
                              template: `
                                      <div class="input-container">
                                            <input type="text" name="sksFilename" class="form-control" readonly id="sksText">
                                            <label for="sksUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                            <input type="file" id="sksUpload" accept="application/pdf">
                                      </div>
                                    `,
                              autoheight: true,
                              on: {
                                onAfterRender: function () {
                                  const sksInput =
                                    document.getElementById("sksUpload");
                                  const sksText =
                                    document.getElementById("sksText");

                                  sksInput.addEventListener(
                                    "change",
                                    function () {
                                      if (sksInput.files.length > 0) {
                                        const file = sksInput.files[0];
                                        sksText.value = file.name;

                                        const reader = new FileReader();
                                        reader.onload = function (event) {
                                          $$("sks").setValue(
                                            event.target.result
                                          );
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }
                                  );
                                },
                              },
                            },
                          ],
                        },
                        { width: 70 },
                        {
                          minWidth: 300,
                          rows: [
                            {
                              view: "text",
                              type: "hidden",
                              name: "vaksin",
                              id: "vaksin",

                              height: 0,
                            },
                            {
                              view: "label",
                              label: "<span>Unggah Sertifikat Vaksin</span>",
                            },
                            {
                              view: "template",
                              css: "uploadstyle",
                              template: `
                                    <div class="input-container">
                                          <input type="text" name="vaksinFilename" class="form-control" readonly id="vaksinText">
                                          <label for="vaksinUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                          <input type="file" id="vaksinUpload" accept="application/pdf">
                                    </div>
                                  `,
                              autoheight: true,
                              on: {
                                onAfterRender: function () {
                                  const vaksinInput =
                                    document.getElementById("vaksinUpload");
                                  const vaksinText =
                                    document.getElementById("vaksinText");

                                  vaksinInput.addEventListener(
                                    "change",
                                    function () {
                                      if (vaksinInput.files.length > 0) {
                                        const file = vaksinInput.files[0];
                                        vaksinText.value = file.name;

                                        const reader = new FileReader();
                                        reader.onload = function (event) {
                                          $$("vaksin").setValue(
                                            event.target.result
                                          );
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }
                                  );
                                },
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row13",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row13",
                      cols: [
                        {
                          minWidth: 300,
                          rows: [
                            {
                              view: "text",
                              type: "hidden",
                              name: "sertifikat",
                              id: "sertifikat",

                              height: 0,
                            },
                            {
                              view: "label",
                              label:
                                "<span>Unggah Sertifikat Skill<span class='text-danger ms-1'> *</span></span>",
                            },
                            {
                              view: "template",
                              css: "uploadstyle",
                              template: `
                                      <div class="input-container">
                                            <input type="text" name="sertifikatFilename" class="form-control" readonly id="sertifikatText">
                                            <label for="sertifikatUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                            <input type="file" id="sertifikatUpload" accept="application/pdf">
                                      </div>
                                    `,
                              autoheight: true,
                              on: {
                                onAfterRender: function () {
                                  const sertifikatInput =
                                    document.getElementById("sertifikatUpload");
                                  const sertifikatText =
                                    document.getElementById("sertifikatText");

                                  sertifikatInput.addEventListener(
                                    "change",
                                    function () {
                                      if (sertifikatInput.files.length > 0) {
                                        const file = sertifikatInput.files[0];
                                        sertifikatText.value = file.name;

                                        const reader = new FileReader();
                                        reader.onload = function (event) {
                                          $$("sertifikat").setValue(
                                            event.target.result
                                          );
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }
                                  );
                                },
                              },
                            },
                          ],
                        },
                        { width: 70 },
                        {
                          minWidth: 300,
                          rows: [
                            {
                              view: "text",
                              type: "hidden",
                              name: "paspor",
                              id: "paspor",

                              height: 0,
                            },
                            {
                              view: "label",
                              label:
                                "<span>Unggah Paspor<span class='text-danger ms-1'> *</span></span>",
                            },
                            {
                              view: "template",
                              css: "uploadstyle",
                              template: `
                                        <div class="input-container">
                                              <input type="text" name="pasporFilename" class="form-control" readonly id="pasporText">
                                              <label for="pasporUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                              <input type="file" id="pasporUpload" accept="application/pdf">
                                        </div>
                                      `,
                              autoheight: true,
                              on: {
                                onAfterRender: function () {
                                  const pasporInput =
                                    document.getElementById("pasporUpload");
                                  const pasporText =
                                    document.getElementById("pasporText");

                                  pasporInput.addEventListener(
                                    "change",
                                    function () {
                                      if (pasporInput.files.length > 0) {
                                        const file = pasporInput.files[0];
                                        pasporText.value = file.name;

                                        const reader = new FileReader();
                                        reader.onload = function (event) {
                                          $$("paspor").setValue(
                                            event.target.result
                                          );
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }
                                  );
                                },
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row14",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row13",
                      cols: [
                        {
                          minWidth: 300,
                          rows: [
                            {
                              view: "text",
                              type: "hidden",
                              name: "senmonkyuu",
                              id: "senmonkyuu",

                              height: 0,
                            },
                            {
                              view: "label",
                              label:
                                "<span>Unggah Senmonkyuu<span class='text-danger ms-1'> *</span></span>",
                            },
                            {
                              view: "template",
                              css: "uploadstyle",
                              template: `
                                        <div class="input-container">
                                              <input type="text" name="senmonkyuuFilename" class="form-control" readonly id="senmonkyuuText">
                                              <label for="senmonkyuuUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                              <input type="file" id="senmonkyuuUpload" accept="application/pdf">
                                        </div>
                                      `,
                              autoheight: true,
                              on: {
                                onAfterRender: function () {
                                  const senmonkyuuInput =
                                    document.getElementById("senmonkyuuUpload");
                                  const senmonkyuuText =
                                    document.getElementById("senmonkyuuText");

                                  senmonkyuuInput.addEventListener(
                                    "change",
                                    function () {
                                      if (senmonkyuuInput.files.length > 0) {
                                        const file = senmonkyuuInput.files[0];
                                        senmonkyuuText.value = file.name;

                                        const reader = new FileReader();
                                        reader.onload = function (event) {
                                          $$("senmonkyuu").setValue(
                                            event.target.result
                                          );
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }
                                  );
                                },
                              },
                            },
                          ],
                        },
                        { width: 70 },
                        {
                          minWidth: 300,
                          rows: [
                            {
                              view: "text",
                              type: "hidden",
                              name: "hyokachosho",
                              id: "hyokachosho",

                              height: 0,
                            },
                            {
                              view: "label",
                              label:
                                "<span>Unggah Hyokachosho<span class='text-danger ms-1'> *</span></span>",
                            },
                            {
                              view: "template",
                              css: "uploadstyle",
                              template: `
                                          <div class="input-container">
                                                <input type="text" name="hyokachoshoFilename" class="form-control" readonly id="hyokachoshoText">
                                                <label for="hyokachoshoUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                                <input type="file" id="hyokachoshoUpload" accept="application/pdf">
                                          </div>
                                        `,
                              autoheight: true,
                              on: {
                                onAfterRender: function () {
                                  const hyokachoshoInput =
                                    document.getElementById(
                                      "hyokachoshoUpload"
                                    );
                                  const hyokachoshoText =
                                    document.getElementById("hyokachoshoText");

                                  hyokachoshoInput.addEventListener(
                                    "change",
                                    function () {
                                      if (hyokachoshoInput.files.length > 0) {
                                        const file = hyokachoshoInput.files[0];
                                        hyokachoshoText.value = file.name;

                                        const reader = new FileReader();
                                        reader.onload = function (event) {
                                          $$("hyokachosho").setValue(
                                            event.target.result
                                          );
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }
                                  );
                                },
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row15",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row13",
                      cols: [
                        {
                          minWidth: 300,
                          rows: [
                            {
                              view: "text",
                              type: "hidden",
                              name: "jftest",
                              id: "jftest",

                              height: 0,
                            },
                            {
                              view: "label",
                              label:
                                "<span>Unggah JFTEST<span class='text-danger ms-1'> *</span></span>",
                            },
                            {
                              view: "template",
                              css: "uploadstyle",
                              template: `
                                        <div class="input-container">
                                              <input type="text" name="jftestFilename" class="form-control" readonly id="jftestText">
                                              <label for="jftestUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                              <input type="file" id="jftestUpload" accept="application/pdf">
                                        </div>
                                      `,
                              autoheight: true,
                              on: {
                                onAfterRender: function () {
                                  const jftestInput =
                                    document.getElementById("jftestUpload");
                                  const jftestText =
                                    document.getElementById("jftestText");

                                  jftestInput.addEventListener(
                                    "change",
                                    function () {
                                      if (jftestInput.files.length > 0) {
                                        const file = jftestInput.files[0];
                                        jftestText.value = file.name;

                                        const reader = new FileReader();
                                        reader.onload = function (event) {
                                          $$("jftest").setValue(
                                            event.target.result
                                          );
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }
                                  );
                                },
                              },
                            },
                          ],
                        },
                        { width: 70 },
                        {
                          minWidth: 300,
                          rows: [
                            {
                              view: "text",
                              type: "hidden",
                              name: "capimigrasi",
                              id: "capimigrasi",

                              height: 0,
                            },
                            {
                              view: "label",
                              label:
                                "<span>Unggah Cap Imigrasi (Masuk & Keluar)<span class='text-danger ms-1'> *</span></span>",
                            },
                            {
                              view: "template",
                              css: "uploadstyle",
                              template: `
                                          <div class="input-container">
                                                <input type="text" name="capimigrasiFilename" class="form-control" readonly id="capimigrasiText">
                                                <label for="capimigrasiUpload" class="icon"><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></label>
                                                <input type="file" id="capimigrasiUpload" accept="application/pdf">
                                          </div>
                                        `,
                              autoheight: true,
                              on: {
                                onAfterRender: function () {
                                  const capimigrasiInput =
                                    document.getElementById(
                                      "capimigrasiUpload"
                                    );
                                  const capimigrasiText =
                                    document.getElementById("capimigrasiText");

                                  capimigrasiInput.addEventListener(
                                    "change",
                                    function () {
                                      if (capimigrasiInput.files.length > 0) {
                                        const file = capimigrasiInput.files[0];
                                        capimigrasiText.value = file.name;

                                        const reader = new FileReader();
                                        reader.onload = function (event) {
                                          $$("capimigrasi").setValue(
                                            event.target.result
                                          );
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }
                                  );
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
          ],
        },
      ],
    },
    { height: 18 },
    {
      margin: 10,
      cols: [
        {},
        {
          view: "button",
          value: "Kembali",
          css: "back",
          autowidth: true,
          click: function () {
            setActiveStep(1);
          },
        },
        {
          view: "button",
          value: "Simpan",
          css: "next",
          autowidth: true,
          click: function () {
            saveForm();
          },
        },
      ],
    },
  ],
  rules: {
    pasFoto: webix.rules.isNotEmpty,
    fullBodyFoto: webix.rules.isNotEmpty,
    ktp: webix.rules.isNotEmpty,
    kk: webix.rules.isNotEmpty,
    akta: webix.rules.isNotEmpty,
    sks: webix.rules.isNotEmpty,
    ijazah: webix.rules.isNotEmpty,
  },
};

var multiview = {
  id: "multiStepForm",
  view: "multiview",
  cells: [step1Form, step2Form, step3Form],
};

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
      height: 250,
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

function saveForm() {
  const formValues = {};

    $$("multiStepForm")
      .getChildViews()
      .forEach((form) => {
        if (form.getValues) {
          Object.assign(formValues, form.getValues());
        }
      });

    formValues.height = parseInt(formValues.height);
    formValues.weight = parseInt(formValues.weight);
    formValues.type = "peserta";
    formValues.programType = "newcomer";

    console.log(formValues);

    axios
      .post("http://deviso.vdc.id:3003/api/icc/register/peserta", formValues)
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

webix.ready(function () {
  grid = webix.ui({
    container: "formContainer",
    rows: [multiview],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });
});
