function loadUserDetailData() {
  axios
    .get(`http://localhost:3000/api/icc/user/peserta/detail/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      document.getElementById("fullNameHeader").textContent =
        res.data.data.userDetail.fullname;
      document.getElementById("idHeader").textContent =
        "ID: " + res.data.data.id;
      document.getElementById("statusHeader").textContent =
        res.data.data.status === "approve" ? "Peserta ISO" : "Peserta";
      // const profImage = document.querySelector(".profile-img");

      $$("id").setValue(id);
      $$("token").setValue(token);
      $$("fullname").setValue(res.data.data.userDetail.fullname); // Set Fullname
      $$("email").setValue(res.data.data.email); // Set Email
      $$("phone").setValue(res.data.data.userDetail.phone); // Set Phone
      $$("program_type").setValue(
        res.data.data.userDetail.program_type.toUpperCase()
      );
      $$("address_indo").setValue(res.data.data.userDetail.address_indo); // Set Address Indo
      $$("address_japan").setValue(res.data.data.userDetail.address_japan); // Set Address Japan
      $$("company_name").setValue(res.data.data.userDetail.company_name); // Set Company Name
      $$("address_company").setValue(res.data.data.userDetail.address_company); // Set Company Address
      $$("association_name").setValue(
        res.data.data.userDetail.association_name
      ); // Set Association Name
      $$("address_association").setValue(
        res.data.data.userDetail.address_association
      ); // Set Association Address
      $$("career_history").setValue(res.data.data.userDetail.career_history); // Set Career History
      $$("work_field").setValue(res.data.data.userDetail.work_field); // Set Work Field
      $$("interest_field").setValue(res.data.data.userDetail.interest_field); // Set Interest Field
      $$("rejected").setValue(res.data.data.userDetail.rejected); // Set Interest Field
      $$("rejected_detail").setValue(res.data.data.userDetail.rejected_detail);
      $$("contract_period").setValue(res.data.data.userDetail.contract_period);

      // Optionally set other fields that you may want to display
      $$("upload_file").setValue(res.data.data.userDetail.upload_file); // Set KTP Scan
      $$("ktp").setValue(res.data.data.userDetail.ktp); // Set KTP Scan
      $$("zairyoukado").setValue(res.data.data.userDetail.zairyoukado); // Set Zairyoukado Scan
      $$("ijazah").setValue(res.data.data.userDetail.ijazah); // Set Ijazah
      $$("certificate").setValue(res.data.data.userDetail.certificate); // Set Certificate
      $$("certificate_field").setValue(
        res.data.data.userDetail.certificate_field
      ); // Set Certificate Field
      $$("cv").setValue(res.data.data.userDetail.cv); // Set CV Document
      $$("immigration_passport").setValue(
        res.data.data.userDetail.immigration_passport
      ); // Set Immigration Passport
      $$("latest_passport").setValue(res.data.data.userDetail.latest_passport); // Set Latest Passport
      $$("photograph").setValue(res.data.data.userDetail.photograph); // Set Profile Picture
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
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
                          readonly: true,
                        },
                        {
                          width: 50,
                        },
                        {
                          view: "text",
                          name: "email",
                          id: "email",
                          label: "Alamat Email",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
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
                          label: "Nomor kontak saat ini",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        {
                          width: 50,
                        },
                        {
                          view: "text",
                          name: "program_type",
                          id: "program_type",
                          label: "Tipe Program",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
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
                          view: "textarea",
                          name: "address_indo",
                          id: "address_indo",
                          label: "Alamat Indonesia",
                          labelPosition: "top",
                          required: true,
                          height: 100,
                          minWidth: 300,
                          readonly: true,
                        },
                        {
                          width: 50,
                        },
                        {
                          view: "textarea",
                          name: "address_japan",
                          id: "address_japan",
                          label: "Alamat Jepang",
                          labelPosition: "top",
                          required: true,
                          height: 100,
                          minWidth: 300,
                          readonly: true,
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
                          name: "company_name",
                          id: "company_name",
                          label: "Nama Perusahaan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        {
                          width: 50,
                        },
                        {
                          view: "text",
                          name: "association_name",
                          id: "association_name",
                          label: "Nama Asosiasi/TSK",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
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
                          view: "textarea",
                          name: "address_company",
                          id: "address_company",
                          label: "Alamat Perusahaan",
                          labelPosition: "top",
                          required: true,
                          height: 100,
                          minWidth: 300,
                          readonly: true,
                        },
                        {
                          width: 50,
                        },
                        {
                          view: "textarea",
                          name: "address_association",
                          id: "address_association",
                          label: "Alamat Asosiasi",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          height: 100,
                          readonly: true,
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
                          name: "rejected",
                          labelWidth: 120,
                          id: "rejected",
                          label: "Pernah di tolak pengajuan surat izin tinggal",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                          options: [
                            { id: "1", value: "PERNAH" },
                            { id: "0", value: "TIDAK PERNAH" },
                          ],
                        },
                        {
                          width: 50,
                        },
                        {
                          view: "text",
                          name: "work_field",
                          id: "work_field",
                          label: "Bidang Kerja saat ini",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
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
                          view: "textarea",
                          name: "rejected_detail",
                          id: "rejected_detail",
                          label: "Apabila pernah, berapa kali dan kapan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          height: 100,
                          readonly: true,
                        },
                        {
                          width: 50,
                        },
                        {
                          view: "textarea",
                          name: "career_history",
                          id: "career_history",
                          label: "Riwayat Masuk kerja ke Jepang",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          height: 100,
                          readonly: true,
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
                          view: "text",
                          name: "interest_field",
                          id: "interest_field",
                          label: "Bidang Kerja yang diminati",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        {
                          width: 50,
                        },
                        {
                          view: "text",
                          name: "contract_period",
                          id: "contract_period",
                          label: "Masa Kontrak (Dari Kapan sampai Kapan)",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
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
                  id: "row9",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row9",
                      cols: [
                        {
                          view: "text",
                          name: "upload_file",
                          id: "upload_file",
                          label:
                            "Upload Berkas (Untuk Peserta Non ISO Jepang/LPPR)",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        { width: 50 },
                        {
                          view: "text",
                          name: "ktp",
                          id: "ktp",
                          label: "KTP Indonesia",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
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
                          view: "text",
                          name: "zairyoukado",
                          id: "zairyoukado",
                          label:
                            "Zairyoukado (2 halaman file PDF, depan dan belakang)",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        { width: 50 },
                        {
                          view: "text",
                          name: "ijazah",
                          id: "ijazah",
                          label: "Ijazah Terakhir",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
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
                          view: "text",
                          name: "certificate",
                          id: "certificate",
                          label:
                            "Sertifikat 3 kyuu/jftest/hyoukachosho/JLPT(diatas N5) *",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        { width: 50 },
                        {
                          view: "text",
                          name: "certificate_field",
                          id: "certificate_field",
                          label: "Sertifikat Skill Bidang",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
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
                          view: "text",
                          name: "cv",
                          id: "cv",
                          label: "CV",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        { width: 50 },
                        {
                          view: "text",
                          name: "immigration_passport",
                          id: "immigration_passport",
                          label: "Bagian Paspor yg ada cap imigrasinya *",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
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
                          view: "text",
                          name: "latest_passport",
                          id: "latest_passport",
                          label: "Paspor Baru (Paspor yang masih berlaku)",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
                        },
                        { width: 50 },
                        {
                          view: "text",
                          name: "photograph",
                          id: "photograph",
                          label:
                            "Pas foto terbaru 3 bulan terakhir (Background Putih uk 3x4)",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          readonly: true,
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

  //   {
  //     header: "Data Orang Tua",
  //     width: 150,
  //     body: {
  //       id: "formres3",
  //       margin: 10,
  //       css: "marystyle",
  //       rows: [
  //         {
  //           responsive: "formres3",
  //           cols: [
  //             {
  //               margin: 10,
  //               rows: [
  //                 {
  //                   view: "text",
  //                   name: "dadName",
  //                   id: "dadName",
  //                   label: "Nama Ayah",
  //                   labelPosition: "top",
  //                   required: true,
  //                   minWidth: 300,
  //                   readonly: true,
  //                 },
  //                 {
  //                   view: "text",
  //                   name: "dadPhone",
  //                   id: "dadPhone",
  //                   label: "No. HP Ayah",
  //                   labelPosition: "top",
  //                   required: true,
  //                   minWidth: 300,
  //                   readonly: true,
  //                 },
  //                 {
  //                   view: "textarea",
  //                   id: "dadAddress",
  //                   name: "dadAddress",
  //                   height: 120,
  //                   label: "Alamat Ayah",
  //                   labelPosition: "top",
  //                   required: true,
  //                   minWidth: 300,
  //                   readonly: true,
  //                 },
  //               ],
  //             },
  //             {
  //               margin: 10,
  //               rows: [
  //                 {
  //                   view: "text",
  //                   name: "momName",
  //                   id: "momName",
  //                   label: "Nama Ibu",
  //                   labelPosition: "top",
  //                   required: true,
  //                   minWidth: 300,
  //                   readonly: true,
  //                 },
  //                 {
  //                   view: "text",
  //                   name: "momPhone",
  //                   id: "momPhone",
  //                   label: "No. HP Ibu",
  //                   labelPosition: "top",
  //                   required: true,
  //                   minWidth: 300,
  //                   readonly: true,
  //                 },
  //                 {
  //                   view: "textarea",
  //                   id: "momAddress",
  //                   name: "momAddress",
  //                   height: 120,
  //                   label: "Alamat Ibu",
  //                   labelPosition: "top",
  //                   required: true,
  //                   minWidth: 300,
  //                   readonly: true,
  //                 },
  //               ],
  //             },
  //             {
  //               margin: 10,
  //               rows: [
  //                 {
  //                   view: "text",
  //                   name: "kinsmanName",
  //                   id: "kinsmanName",
  //                   label: "Nama Kerabat",
  //                   labelPosition: "top",
  //                   required: true,
  //                   minWidth: 300,
  //                   readonly: true,
  //                 },
  //                 {
  //                   view: "text",
  //                   name: "kinsmanPhone",
  //                   id: "kinsmanPhone",
  //                   label: "No. HP Kerabat",
  //                   labelPosition: "top",
  //                   required: true,
  //                   minWidth: 300,
  //                   readonly: true,
  //                 },
  //                 {
  //                   view: "textarea",
  //                   id: "kinsmanAddress",
  //                   name: "kinsmanAddress",
  //                   height: 120,
  //                   label: "Alamat Kerabat",
  //                   labelPosition: "top",
  //                   required: true,
  //                   minWidth: 300,
  //                   readonly: true,
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   },
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
