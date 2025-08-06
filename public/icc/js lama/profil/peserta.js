function loadUserDetailData() {
  axios
    .get(`http://deviso.vdc.id:3003/api/icc/user/peserta/detail/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      const userDetail = res.data.data.userDetail;
      const user = res.data.data;

      document.getElementById("fullNameHeader").textContent = userDetail.fullname;
      document.getElementById("idHeader").textContent = res.data.data.userDetail.code;
      document.getElementById("statusHeader").textContent = res.data.data.userDetail.programType.toUpperCase();

      $$("id").setValue(userDetail.id);
      $$("token").setValue(token);
      $$("fullname").setValue(userDetail.fullname);
      $$("email").setValue(res.data.data.email);
      $$("phone").setValue(userDetail.phone);
      $$("nik").setValue(userDetail.nik);
      $$("gender").setValue(userDetail.gender);
      $$("height").setValue(userDetail.height);
      $$("weight").setValue(userDetail.weight);
      $$("birthplace").setValue(userDetail.birthplace);
      $$("birthdate").setValue(userDetail.birthdate);
      $$("religion").setValue(userDetail.religion);
      $$("lastedu").setValue(userDetail.lastedu);
      $$("trainbef").setValue(userDetail.trainbef);
      $$("city").setValue(userDetail.city);
      $$("address").setValue(userDetail.address);
      $$("mynumber").setValue(userDetail.mynumber);
      $$("dadName").setValue(userDetail.dadName);
      $$("dadPhone").setValue(userDetail.dadPhone);
      $$("dadAddress").setValue(userDetail.dadAddress);
      $$("momName").setValue(userDetail.momName);
      $$("momPhone").setValue(userDetail.momPhone);
      $$("momAddress").setValue(userDetail.momAddress);
      $$("kinsmanName").setValue(userDetail.kinsmanName);
      $$("kinsmanPhone").setValue(userDetail.kinsmanPhone);
      $$("kinsmanAddress").setValue(userDetail.kinsmanAddress);
      $$("companyName").setValue(userDetail.companyName);
      $$("companyAddress").setValue(userDetail.companyAddress);
      $$("companyCity").setValue(userDetail.companyCity);
      // $$("pasFoto").setValue(userDetail.pasFoto);
      // $$("fullBodyFoto").setValue(userDetail.fullBodyFoto);
      // $$("ktp").setValue(userDetail.ktp);
      // $$("kk").setValue(userDetail.kk);
      // $$("akta").setValue(userDetail.akta);
      // $$("ijazah").setValue(userDetail.ijazah);
      // $$("sks").setValue(userDetail.sks);
      // $$("vaksin").setValue(userDetail.vaksin);
      // $$("sertifikat").setValue(userDetail.sertifikat);
      // $$("paspor").setValue(userDetail.paspor);
      // $$("senmonkyuu").setValue(userDetail.senmonkyuu);
      // $$("hyokachoso").setValue(userDetail.hyokachoso);
      // $$("jftest").setValue(userDetail.jftest);
      // $$("capimigrasi").setValue(userDetail.capimigrasi);
      // $$("ktpJepang").setValue(userDetail.ktpJepang);
      // $$("epmi").setValue(userDetail.epmi);

      if (userId === user.id.toString()) {
        $$("updateButton").show();
      } else {
        $$("updateButton").hide();
        disableFormFields();
      }

      getAvatarFoto(userDetail.id, token);

      const previewButton = document.querySelector("button[title='Preview CV']");
      if (previewButton) {
        previewButton.addEventListener("click", function () {
          previewCV(user, userDetail);
        });
      }
      
    })
    .catch((err) => {
      console.log(err);
      webix.message({
        type: "error",
        text: err.response ? err.response.data.data : "An error occurred",
      });
    });
}

function previewCV(user, userDetail) {

  let avatarSrc = '';
  
  getAvatarFoto(userDetail.id, token, function(avatarBase64) {
    avatarSrc = avatarBase64;

    let cvContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.8; padding: 20px; max-width: 800px; margin: auto;">
        <!-- Header Section: Avatar and Name -->
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <!-- Avatar -->
          <div style="flex: 2;">
            <img src="${avatarSrc}" alt="Avatar" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover;">
          </div>
          <!-- Name and Title -->
          <div style="flex: 3; padding-left: 20px;">
            <p style="margin: 0; font-size: 1.5rem; font-weight: bold; color: #2c3e50;">${userDetail.fullname}</p>
            <p style="margin: 0; color: #7f8c8d;">${userDetail.programType.toUpperCase()}</p>
          </div>
        </div>

        <hr>
        <br>

        <div style="margin-bottom: 20px;">
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="flex: 1; font-weight: bold;">ID Member</p>
            <p style="flex: 2; text-align: right;">${userDetail.code}</p>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="flex: 1; font-weight: bold;">My Number</p>
            <p style="flex: 2; text-align: right;">${userDetail.mynumber || '-'}</p>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="flex: 1; font-weight: bold;">Email</p>
            <p style="flex: 2; text-align: right;">${user.email || 'Email belum diisi'}</p>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="flex: 1; font-weight: bold;">No. HP</p>
            <p style="flex: 2; text-align: right;">${userDetail.phone}</p>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="flex: 1; font-weight: bold;">Tempat Lahir</p>
            <p style="flex: 2; text-align: right;">${userDetail.birthplace}</p>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="flex: 1; font-weight: bold;">Tanggal Lahir</p>
            <p style="flex: 2; text-align: right;">${userDetail.birthdate}</p>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="flex: 1; font-weight: bold;">Agama</p>
            <p style="flex: 2; text-align: right;">${userDetail.religion.toUpperCase()}</p>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="flex: 1; font-weight: bold;">Pendidikan Terakhir</p>
            <p style="flex: 2; text-align: right;">${userDetail.lastedu.toUpperCase()}</p>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="flex: 1; font-weight: bold;">Alamat</p>
            <p style="flex: 2; text-align: right;">${userDetail.address}</p>
          </div>
           <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="flex: 1; font-weight: bold;">Kota/Kabupaten</p>
            <p style="flex: 2; text-align: right;">${userDetail.city}</p>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="flex: 1; font-weight: bold;">Perusahaan</p>
            <p style="flex: 2; text-align: right;">${userDetail.companyName || '-' }</p>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="flex: 1; font-weight: bold;">Alamat Perusahaan</p>
            <p style="flex: 2; text-align: right;">${userDetail.companyAddress || '-'}</p>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="flex: 1; font-weight: bold;">Kota/Prefektur Perusahaan</p>
            <p style="flex: 2; text-align: right;">${userDetail.companyCity || '-'}</p>
          </div>
        </div>
      </div>
    `;

    if ($$("cvPreviewWindow")) {
      $$("cvPreviewWindow").close();
    }

    const previewWindow = webix.ui({
      view: "window",
      id: "cvPreviewWindow",
      width: 600,
      height: 600,
      head: "Preview CV",
      body: {
        view: "template",
        template: cvContent,
        autoheight: true,
        autowidth: true,
        scroll: true,
      },
      position: "center",
      modal: true,
      close: true,
    });

    
     previewWindow.show();
  });
  
}


function disableFormFields() {
  $$("fullname").disable();
  $$("email").disable();
  $$("phone").disable();
  $$("nik").disable();
  $$("gender").disable();
  $$("height").disable();
  $$("weight").disable();
  $$("birthplace").disable();
  $$("birthdate").disable();
  $$("religion").disable();
  $$("lastedu").disable();
  $$("trainbef").disable();
  $$("city").disable();
  $$("address").disable();
  $$("mynumber").disable();
  $$("dadName").disable();
  $$("dadPhone").disable();
  $$("dadAddress").disable();
  $$("momName").disable();
  $$("momPhone").disable();
  $$("momAddress").disable();
  $$("kinsmanName").disable();
  $$("kinsmanPhone").disable();
  $$("kinsmanAddress").disable();
  $$("companyName").disable();
  $$("companyAddress").disable();
  $$("companyCity").disable();
  $$("pasFoto").disable();
  $$("fullBodyFoto").disable();
  $$("ktp").disable();
  $$("kk").disable();
  $$("akta").disable();
  $$("ijazah").disable();
  $$("sks").disable();
  $$("vaksin").disable();
  $$("sertifikat").disable();
  $$("paspor").disable();
  $$("senmonkyuu").disable();
  $$("hyokachoso").disable();
  $$("jftest").disable();
  $$("capimigrasi").disable();
  $$("ktpJepang").disable();
  $$("epmi").disable();
}

var tabcells = [
  {
    header: "Data Diri",
    width: 100,
    body: {
      id: "formres",
      rows: [
        {
          view: "text",
          name: "id",
          id: "id",
          hidden: true,
        },
        {
          view: "text",
          name: "token",
          id: "token",
          hidden: true,
        },
        { height: 20 },
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
                      responsive: "row1",
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
                        {
                          view: "text",
                          name: "email",
                          id: "email",
                          label: "Email",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row2",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row2",
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
                          name: "height",
                          id: "height",
                          label: "Tinggi Badan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                        {
                          view: "text",
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
                          view: "text",
                          name: "mynumber",
                          id: "mynumber",
                          label: "My Number",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
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
  },
  {
    header: "Data Perusahaan",
    width: 150,
    body: {
      id: "formre2",
      rows: [
        { height: 20 },
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
                          view: "text",
                          name: "companyName",
                          id: "companyName",
                          label: "Nama Perusahaan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                        {
                          view: "text",
                          name: "companyCity",
                          id: "companyCity",
                          label: "Kota/Prefektur",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
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
                          view: "textarea",
                          id: "companyAddress",
                          name: "companyAddress",
                          height: 120,
                          label: "Alamat Perusahaan",
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
  },
  {
    header: "Data Orang Tua",
    width: 150,
    body: {
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
  },
  {
    header: "Dokumen Penunjang",
    width: 190,
    body: {
      id: "formres2",
      rows: [
        { height: 20 },
        {
          responsive: "formres2",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  id: "row12",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row12",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "pasFoto",
                                  id: "pasFoto",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "text",
                                      name: "pasFotoText",
                                      id: "pasFotoText",
                                      label: "Pas Foto 3x4",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                                        fileInput.accept = 'image/*';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const pasFotoText = $$('pasFotoText');
                                            if (pasFotoText) {
                                              pasFotoText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("pasFoto").setValue(base64File);
                                              console.log(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "pasFoto",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "fullBodyFoto",
                                  id: "fullBodyFoto",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "fullBodyFotoText",
                                      id: "fullBodyFotoText",
                                      label: "Foto Full Body",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                                        fileInput.accept = 'image/*';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const fullBodyFotoText = $$('fullBodyFotoText');
                                            if (fullBodyFotoText) {
                                              fullBodyFotoText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("fullBodyFoto").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "fullBodyFoto",
                                          fullName,
                                          id,
                                          token
                                        );
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
                {
                  id: "row13",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row13",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "ktp",
                                  id: "ktp",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "ktpText",
                                      id: "ktpText",
                                      label: "Kartu Tanda Penduduk",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const ktpText = $$('ktpText');
                                            if (ktpText) {
                                              ktpText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("ktp").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "ktp",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "kk",
                                  id: "kk",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "kkText",
                                      id: "kkText",
                                      label: "Kartu Keluarga",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const kkText = $$('kkText');
                                            if (kkText) {
                                              kkText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("kk").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "kk",
                                          fullName,
                                          id,
                                          token
                                        );
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
                {
                  id: "row14",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row14",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "akta",
                                  id: "akta",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "aktaText",
                                      id: "aktaText",
                                      label: "Kartu Keluarga",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const aktaText = $$('aktaText');
                                            if (aktaText) {
                                              aktaText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("akta").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "akta",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "ijazah",
                                  id: "ijazah",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "ijazahText",
                                      id: "ijazahText",
                                      label: "Ijazah",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const ijazahText = $$('ijazahText');
                                            if (ijazahText) {
                                              ijazahText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("ijazah").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "ijazah",
                                          fullName,
                                          id,
                                          token
                                        );
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
                {
                  id: "row15",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row15",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "sks",
                                  id: "sks",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "sksText",
                                      id: "sksText",
                                      label: "Surat Keterangan Sehat",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const sksText = $$('sksText');
                                            if (sksText) {
                                              sksText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("sks").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "sks",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "vaksin",
                                  id: "vaksin",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "vaksinText",
                                      id: "vaksinText",
                                      label: "Sertifikat Vaksin",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const vaksinText = $$('vaksinText');
                                            if (vaksinText) {
                                              vaksinText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("vaksin").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "vaksin",
                                          fullName,
                                          id,
                                          token
                                        );
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
                {
                  id: "row16",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row16",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "sertifikat",
                                  id: "sertifikat",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "sertifikatText",
                                      id: "sertifikatText",
                                      label: "Sertifikat Skill",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const sertifikatText = $$('sertifikatText');
                                            if (sertifikatText) {
                                              sertifikatText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("sertifikat").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "sertifikat",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "paspor",
                                  id: "paspor",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "pasporText",
                                      id: "pasporText",
                                      label: "Paspor",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const pasporText = $$('pasporText');
                                            if (pasporText) {
                                              pasporText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("paspor").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "paspor",
                                          fullName,
                                          id,
                                          token
                                        );
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
                {
                  id: "row17",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row17",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "senmonkyuu",
                                  id: "senmonkyuu",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "senmonkyuuText",
                                      id: "senmonkyuuText",
                                      label: "Senmonkyuu",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const senmonkyuuText = $$('senmonkyuuText');
                                            if (senmonkyuuText) {
                                              senmonkyuuText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("senmonkyuu").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "senmonkyuu",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "hyokachoso",
                                  id: "hyokachoso",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "hyokachosoText",
                                      id: "hyokachosoText",
                                      label: "Hyokachoso",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const hyokachosoText = $$('hyokachosoText');
                                            if (hyokachosoText) {
                                              hyokachosoText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("hyokachoso").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "hyokachoso",
                                          fullName,
                                          id,
                                          token
                                        );
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
                {
                  id: "row18",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row18",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "jftest",
                                  id: "jftest",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "jftestText",
                                      id: "jftestText",
                                      label: "JFTEST",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const jftestText = $$('jftestText');
                                            if (jftestText) {
                                              jftestText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("jftest").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "jftest",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "capimigrasi",
                                  id: "capimigrasi",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "capimigrasiText",
                                      id: "capimigrasiText",
                                      label: "Cap Imigrasi",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const capimigrasiText = $$('capimigrasiText');
                                            if (capimigrasiText) {
                                              capimigrasiText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("capimigrasi").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "capimigrasi",
                                          fullName,
                                          id,
                                          token
                                        );
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
                {
                  id: "row19",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row19",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "ktpJepang",
                                  id: "ktpJepang",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "ktpJepangText",
                                      id: "ktpJepangText",
                                      label: "Kartu Tanda Penduduk Jepang",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const ktpJepangText = $$('ktpJepangText');
                                            if (ktpJepangText) {
                                              ktpJepangText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("ktpJepang").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "ktpJepang",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "epmi",
                                  id: "epmi",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "epmiText",
                                      id: "epmiText",
                                      label: "E-PMI",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const epmiText = $$('epmiText');
                                            if (epmiText) {
                                              epmiText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("epmi").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "epmi",
                                          fullName,
                                          id,
                                          token
                                        );
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
          ],
        },
      ],
    },
  },
];

var tab = {
  view: "tabview",
  css: "tabstyle",
  cells: tabcells,
  multiview: { fitBiggest: true },
};

var form = {
  view: "form",
  id: "userForm",
  margin: 40,
  elements: [tab],
};

var btnupdate = {
  id: "row11",
  margin: 10,
  rows: [
    {
      responsive: "row11",
      cols: [
        {
          rows: [
            {
              view: "button",
              value: "Update",
              id: "updateButton",
              css: "update",
              click: function() {
                updateForm();
              },
            },
          ],
        },
      ],
    },
  ],
};

function downloadFile(column, name, id, token) {
  webix.ajax().get(
    `http://deviso.vdc.id:3003/api/icc/peserta/file/download/${column}/${id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
    {
      success: function (text, data, xhr) {
        var datanya = JSON.parse(text);

        var fileName;

        switch (column) {
          case "pasFoto":
            fileName = `${name} - Pas Foto 3x4`;
            break;
          case "fullBodyFoto":
            fileName = `${name} - Foto Full Body`;
            break;
          case "ktp":
            fileName = `${name} - KTP`;
            break;
          case "kk":
            fileName = `${name} - KK`;
            break;
          case "akta":
            fileName = `${name} - Akta Kelahiran`;
            break;
          case "ijazah":
            fileName = `${name} - Ijazah`;
            break;
          case "sks":
            fileName = `${name} - Surat Keterangan Sehat`;
            break;
          case "vaksin":
            fileName = `${name} - Sertifikat Vaksin`;
            break;
          case "sertifikat":
            fileName = `${name} - Sertifikat Skill`;
            break;
          case "paspor":
            fileName = `${name} - Paspor`;
            break;
          case "senmonkyuu":
            fileName = `${name} - Senmonkyuu`;
            break;
          case "hyokachoso":
            fileName = `${name} - Hyokachoso`;
            break;
          case "jftest":
            fileName = `${name} - JFT Test`;
            break;
          case "capimigrasi":
            fileName = `${name} - Cap Imigrasi`;
            break;
          case "ktpJepang":
            fileName = `${name} - KTP Jepang`;
            break;
          case "epmi":
            fileName = `${name} - EPMI`;
            break;
          default:
            break;
        }

        const link = document.createElement("a");
        link.href = datanya.data[column];
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error: function (text, data, xhr) {
        console.log(text);
      },
    }
  );
}

function getAvatarFoto(id, token, callback) {
  axios
    .get(`http://deviso.vdc.id:3003/api/icc/peserta/file/download/pasFoto/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      const avatarBase64 = res.data.data.pasFoto;
      document.getElementById("avatarImage").src = avatarBase64;

      if (callback && typeof callback === 'function') {
        callback(avatarBase64);
      }
    })
    .catch((err) => {
      console.log("Error loading avatar foto:", err);
    });
}



function updateForm() {
  const form = $$("userForm");
  if (form.validate()) {
    const formData = form.getValues();

    console.log(formData);
    axios
      .put(`http://deviso.vdc.id:3003/api/icc/user/peserta/edit/${formData.id}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        webix.message({
          type: "success",
          text: "Data berhasil diupdate",
        });
        // Optionally reload data after update
        location.reload();
      })
      .catch((error) => {
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




webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 10,
    rows: [form, btnupdate],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });
  

  loadUserDetailData();
});
