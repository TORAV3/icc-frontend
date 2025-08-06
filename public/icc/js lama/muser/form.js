function loadUserDetailData() {
  axios
    .get(`http://deviso.vdc.id:3003/api/icc/user/peserta/detail/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      const userDetail = res.data.data.userDetail;
      document.getElementById("fullNameHeader").textContent =
        userDetail.fullname;
      document.getElementById("idHeader").textContent =  res.data.data.userDetail.code;
      document.getElementById("statusHeader").textContent =
      res.data.data.userDetail.programType.toUpperCase();

      // Populate the form fields with data
      $$("id").setValue(userDetail.id);
      $$("token").setValue(token);
      $$("fullname").setValue(userDetail.fullname); // Set Fullname
      $$("email").setValue(res.data.data.email); // Set Email
      $$("phone").setValue(userDetail.phone); // Set Phone
      $$("nik").setValue(userDetail.nik); // Set NIK
      $$("gender").setValue(userDetail.gender); // Set Gender
      $$("height").setValue(userDetail.height); // Set Height
      $$("weight").setValue(userDetail.weight); // Set Weight
      $$("birthplace").setValue(userDetail.birthplace); // Set Birthplace
      $$("birthdate").setValue(userDetail.birthdate); // Set Birthdate
      $$("religion").setValue(userDetail.religion); // Set Religion
      $$("lastedu").setValue(userDetail.lastedu); // Set Last Education
      $$("trainbef").setValue(userDetail.trainbef); // Set Previous Training
      $$("city").setValue(userDetail.city); // Set City
      $$("address").setValue(userDetail.address); // Set Address
      $$("mynumber").setValue(userDetail.mynumber); // Set Address

      $$("dadName").setValue(userDetail.dadName); // Set Father's Name
      $$("dadPhone").setValue(userDetail.dadPhone); // Set Father's Phone
      $$("dadAddress").setValue(userDetail.dadAddress); // Set Father's Address
      $$("momName").setValue(userDetail.momName); // Set Mother's Name
      $$("momPhone").setValue(userDetail.momPhone); // Set Mother's Phone
      $$("momAddress").setValue(userDetail.momAddress); // Set Mother's Address
      $$("kinsmanName").setValue(userDetail.kinsmanName); // Set Kinsman's Name
      $$("kinsmanPhone").setValue(userDetail.kinsmanPhone); // Set Kinsman's Phone
      $$("kinsmanAddress").setValue(userDetail.kinsmanAddress); // Set Kinsman's Address

      $$("companyName").setValue(userDetail.companyName); // Set Company Name
      $$("companyAddress").setValue(userDetail.companyAddress); // Set Company Address
      $$("companyCity").setValue(userDetail.companyCity); // Set Company City

      // Set document scan fields
      $$("pasFoto").setValue(userDetail.pasFoto); // Set Pas Foto
      $$("fullBodyFoto").setValue(userDetail.fullBodyFoto); // Set Full Body Photo
      $$("ktp").setValue(userDetail.ktp); // Set KTP
      $$("kk").setValue(userDetail.kk); // Set KK
      $$("akta").setValue(userDetail.akta); // Set Akta
      $$("ijazah").setValue(userDetail.ijazah); // Set Ijazah
      $$("sks").setValue(userDetail.sks); // Set SKS
      $$("vaksin").setValue(userDetail.vaksin); // Set Vaksin
      $$("sertifikat").setValue(userDetail.sertifikat); // Set Sertifikat
      $$("paspor").setValue(userDetail.paspor); // Set Paspor
      $$("senmonkyuu").setValue(userDetail.senmonkyuu); // Set Senmonkyuu
      $$("jftest").setValue(userDetail.jftest); // Set JFT Test
      $$("capimigrasi").setValue(userDetail.capimigrasi); // Set Capimigrasi
      $$("ktpJepang").setValue(userDetail.ktpJepang); // Set KTP Jepang
      $$("epmi").setValue(userDetail.epmi); // Set EPMI

      console.log('Form data successfully loaded.');
    })
    .catch((err) => {
      console.log(err);
      webix.message({
        type: "error",
        text: err.response ? err.response.data.data : "An error occurred",
      });
    });
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
                                  label: "Pas Foto 3x4",
                                  labelPosition: "top",
                                  required: true,
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
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
                                  label: "Foto Full Body",
                                  labelPosition: "top",
                                  required: true,
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
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
                                  label: "KTP",
                                  labelPosition: "top",
                                  required: true,
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
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
                                  label: "Kartu Keluarga",
                                  labelPosition: "top",
                                  required: true,
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile("kk", fullName, id, token);
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
                                  label: "Akta Kelahiran",
                                  labelPosition: "top",
                                  required: true,
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
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
                                  label: "Ijazah",
                                  labelPosition: "top",
                                  required: true,
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
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
                                  label: "Surat Keterangan Sehat",
                                  labelPosition: "top",
                                  required: true,
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
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
                                  label: "Sertifikat Vaksin",
                                  labelPosition: "top",
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
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
                                  label: "Sertifikat Skill",
                                  labelPosition: "top",
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
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
                                  label: "Paspor",
                                  labelPosition: "top",
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
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
                                  label: "Senmonkyuu",
                                  labelPosition: "top",
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
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
                                  name: "hyokachosho",
                                  id: "hyokachosho",
                                  label: "Hyokachosho",
                                  labelPosition: "top",
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "hyokachosho",
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
                                  label: "JFTEST",
                                  labelPosition: "top",
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
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
                                  label: "Cap Imigrasi (Masuk)",
                                  labelPosition: "top",
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "hyokachosho",
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
                                  label: "KTP Jepang",
                                  labelPosition: "top",
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
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
                                  label: "E-PMI",
                                  labelPosition: "top",
                                  minWidth: 300,
                                  
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-download-outline'></iconify-icon></span>",
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

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    rows: [form],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadUserDetailData();
});
