webix.ui({
  container: "profileuserContainer",
  view: "tabview",
  cells: [
    {
      header: "Data Diri",
      body: {
        view: "form",
        elements: [
          { view: "text", label: "Nama Lengkap", name: "nama" },
          { view: "text", label: "Tanggal Lahir", name: "tanggal_lahir" },
          { view: "text", label: "Alamat", name: "alamat" },
          { view: "text", label: "Nomor HP", name: "nomor_hp" },
          { view: "text", label: "Email", name: "email" },
          {
            view: "button",
            value: "Simpan",
            click: function () {
              webix.message("Data Diri Saved");
            },
          },
        ],
      },
    },
    {
      header: "Data Upload",
      body: {
        view: "form",
        elements: [
          {
            view: "uploader",
            label: "Upload KTP",
            name: "ktp_upload",
            accept: "image/*",
          },
          {
            view: "uploader",
            label: "Upload Foto",
            name: "foto_upload",
            accept: "image/*",
          },
          {
            view: "button",
            value: "Simpan",
            click: function () {
              webix.message("Data Upload Saved");
            },
          },
        ],
      },
    },
  ],
});
