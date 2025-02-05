function loadFaqDetailData() {
  axios
    .get(`http://localhost:3000/api/icc/faq/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      $$("title").setValue(res.data.data.title);
      $$("description").setValue(res.data.data.description);
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

var form = {
  view: "form",
  id: "faqForm",
  margin: 40,
  elements: [
    {
      margin: 10,
      rows: [
        { type: "section", template: "Data Faq" },
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
                      name: "title", // Ensure this matches in `rules`
                      id: "title",
                      label: "Judul",
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
        {
          id: "row2",
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
            window.location.href = "/manajemen/faq";
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
    title: webix.rules.isNotEmpty, // Ensure this field name matches
    description: function (value) {
      return value.trim() !== ""; // Custom validation for CKEditor5
    },
  },
};

function submit_form() {
  const form = $$("faqForm");

  if (!form.validate()) {
    webix.message({ type: "error", text: "Harap isi semua kolom yang wajib!" });
    return;
  }
  var formData = form.getValues();
  axios
    .put(`http://localhost:3000/api/icc/faq/edit/${id}`, formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      webix.message({ type: "success", text: response.data.data });
      setTimeout(() => {
        window.location.href = "/manajemen/faq";
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

  loadFaqDetailData();
});
