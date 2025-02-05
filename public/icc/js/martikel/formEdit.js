function loadArtikelDetailData() {
  axios
    .get(`http://localhost:3000/api/icc/artikel/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      $$("title").setValue(res.data.data.title);
      $$("category").setValue(res.data.data.category);
      if (res.data.data.publishdate) {
        const formattedDate = new Date(res.data.data.publishdate)
          .toISOString()
          .split("T")[0];
        $$("publishdate").setValue(formattedDate);
      }
      $$("description").setValue(res.data.data.description);

      if (res.data.data.thumbnail && res.data.data.thumbnailBase64) {
        const videoURL = res.data.data.thumbnailBase64;
        const videoPreview = document.getElementById("uploaded-img__preview");
        const uploadedImgContainer = document.querySelector(".uploaded-img");

        videoPreview.src = videoURL;
        uploadedImgContainer.classList.remove("d-none");
      }
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

var form = {
  view: "form",
  id: "artikelForm",
  margin: 40,
  elements: [
    {
      margin: 10,
      rows: [
        { type: "section", template: "Data Artikel" },
        {
          id: "formres",
          margin: 10,
          rows: [
            {
              responsive: "formres",
              cols: [
                {
                  margin: 10,
                  rows: [
                    {
                      view: "text",
                      name: "title",
                      id: "title",
                      label: "Judul",
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
                      view: "combo",
                      name: "category",
                      id: "category",
                      label: "Kategori",
                      labelPosition: "top",
                      required: true,
                      minWidth: 300,
                      options: [
                        { id: "berita", value: "Berita" },
                        { id: "loker", value: "Lowongan Kerja" },
                        { id: "event", value: "Event" },
                      ],
                    },
                  ],
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
                  margin: 10,
                  rows: [
                    {
                      view: "datepicker",
                      name: "publishdate",
                      id: "publishdate",
                      label: "Tanggal Publish",
                      labelPosition: "top",
                      required: true,
                      minWidth: 300,
                      format: "%Y-%m-%d",
                      stringResult: true,
                    },
                  ],
                },
                { width: 50 },
                {},
              ],
            },
          ],
        },
        {
          id: "row3",
          margin: 10,
          rows: [
            {
              view: "label",
              label:
                "<span>Deskripsi<span class='text-danger ms-1'> *</span></span>",
            },
            {
              responsive: "row2",
              cols: [
                {
                  view: "ckeditor5",
                  name: "description", // Ensure this matches in `rules`
                  id: "description",
                  required: true,
                  minWidth: 300,
                  minHeight: 400,
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
              view: "text",
              type: "hidden",
              name: "thumbnail",
              id: "thumbnail",
              height: 0,
            },
            {
              view: "label",
              label:
                "<span>Thumbnail<span class='text-danger ms-1'> *</span></span>",
            },
            {
              view: "template",
              css: "uploadthumbstyle",
              template: `
                <div class="upload-image-wrapper d-flex align-items-center gap-3">
                  <div class="uploaded-img d-none position-relative h-120-px w-120-px border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50">
                    <button type="button" class="uploaded-img__remove position-absolute top-0 end-0 z-1 text-2xxl line-height-1 me-8 mt-8 d-flex">
                      <iconify-icon icon="radix-icons:cross-2" class="text-xl text-danger-600"></iconify-icon>
                    </button>
                    <img id="uploaded-img__preview" class="w-100 h-100 object-fit-cover" src="/assets/images/user.png" alt="image">
                  </div>

                  <label class="upload-file h-120-px w-120-px border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50 bg-hover-neutral-200 d-flex align-items-center flex-column justify-content-center gap-1" for="upload-file">
                    <iconify-icon icon="solar:camera-outline" class="text-xl text-secondary-light"></iconify-icon>
                    <span class="fw-semibold text-secondary-light">Upload</span>
                    <input id="upload-file" type="file" hidden>
                  </label>
                </div>
              `,
              autoheight: true,
              on: {
                onAfterRender: function () {
                  const fileInput = document.getElementById("upload-file");
                  const imagePreview = document.getElementById(
                    "uploaded-img__preview"
                  );
                  const uploadedImgContainer =
                    document.querySelector(".uploaded-img");
                  const removeButton = document.querySelector(
                    ".uploaded-img__remove"
                  );

                  const thumbnail = $$("thumbnail");

                  fileInput.addEventListener("change", (e) => {
                    if (e.target.files.length) {
                      const file = e.target.files[0];
                      const reader = new FileReader();

                      reader.onload = function (event) {
                        const base64String = event.target.result;

                        thumbnail.setValue(base64String);

                        imagePreview.src = base64String;
                        uploadedImgContainer.classList.remove("d-none");
                      };

                      reader.readAsDataURL(file);
                    }
                  });

                  removeButton.addEventListener("click", () => {
                    imagePreview.src = "";
                    uploadedImgContainer.classList.add("d-none");
                    fileInput.value = "";

                    thumbnail.setValue("");
                  });
                },
              },
            },
          ],
        },
      ],
    },
    {
      margin: 10,
      cols: [
        {},
        {
          view: "button",
          value: "Kembali",
          css: "btnKembali",
          autowidth: true,
          click: function () {
            window.location.href = "/manajemen/artikel";
          },
        },
        {
          view: "button",
          value: "Simpan",
          css: "btnSimpan",
          autowidth: true,
          click: submit_form,
        },
      ],
    },
  ],
  rules: {
    title: webix.rules.isNotEmpty,
    category: webix.rules.isNotEmpty,
    publishdate: webix.rules.isNotEmpty,
    description: function (value) {
      return value.trim() !== "";
    },
  },
};

function submit_form() {
  const form = $$("artikelForm");

  if (!form.validate()) {
    webix.message({ type: "error", text: "Harap isi semua kolom yang wajib!" });
    return;
  }
  var formData = form.getValues();
  axios
    .put(`http://localhost:3000/api/icc/artikel/edit/${id}`, formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      webix.message({ type: "success", text: response.data.data });
      setTimeout(() => {
        window.location.href = "/manajemen/artikel";
      }, 1300);
    })
    .catch(function (error) {
      webix.message({ type: "error", text: error.response.data.data });
    });
}

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    rows: [form],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });

  loadArtikelDetailData();
});
