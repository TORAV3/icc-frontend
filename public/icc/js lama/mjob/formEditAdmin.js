function loadJobDetailData(id) {
  axios
    .get(`http://deviso.vdc.id:3003/api/icc/job/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {

      $$("companyName").setValue(res.data.data.companyName);
      $$("companyLocation").setValue(res.data.data.companyLocation);

      $$("jobTitle").setValue(res.data.data.jobTitle);
      $$("jobCategory").setValue(res.data.data.jobCategory);
      $$("jobLocation").setValue(res.data.data.jobLocation);
      $$("jobType").setValue(res.data.data.jobType);

      const salaryRange = res.data.data.salaryRange.split(" - ");
      $$("salaryMinSlider").setValue(parseInt(salaryRange[0]));
      $$("salaryMaxSlider").setValue(parseInt(salaryRange[1]));

      if (res.data.data.deadline) {
        const formattedDate = new Date(res.data.data.deadline)
          .toISOString()
          .split("T")[0];
        $$("deadline").setValue(formattedDate);
      }

      $$("jobDescription").setValue(res.data.data.jobDescription);
      $$("jobRequirements").setValue(res.data.data.jobRequirements);
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

var form = {
  view: "form",
  id: "jobForm",
  margin: 40,
  elements: [
    {
      margin: 10,
      rows: [
        { type: "section", template: "Data Perusahaan" },
        {
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
                      name: "companyName",
                      id: "companyName",
                      label: "Nama Perusahaan",
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
                      name: "companyLocation",
                      id: "companyLocation",
                      label: "Lokasi Perusahaan",
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
      ],
    },
    {
      margin: 10,
      rows: [
        { type: "section", template: "Data Lowongan Kerja" },
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
                      name: "jobTitle",
                      id: "jobTitle",
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
                      name: "jobCategory",
                      id: "jobCategory",
                      label: "Kategori",
                      labelPosition: "top",
                      required: true,
                      minWidth: 300,
                      options: [
                        { id: "marketing", value: "Marketing" },
                        { id: "it", value: "IT" },
                        { id: "design", value: "Graphic Design" },
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
              responsive: "formres",
              cols: [
                {
                  margin: 10,
                  rows: [
                    {
                      view: "text",
                      name: "jobLocation",
                      id: "jobLocation",
                      label: "Lokasi",
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
                      name: "jobType",
                      id: "jobType",
                      label: "Tipe",
                      labelPosition: "top",
                      required: true,
                      minWidth: 300,
                      options: [
                        { id: "Full-time", value: "Full-time" },
                        { id: "Part-time", value: "Part-time" },
                        { id: "Freelance", value: "Freelance" },
                      ],
                    },
                  ],
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
              responsive: "formres",
              cols: [
                {
                  margin: 10,
                  rows: [
                    {
                      view: "slider",
                      label: "Minimal Salary",
                      id: "salaryMinSlider",
                      labelWidth: 150,
                      min: 0,
                      max: 1000000,
                      step: 50000,
                      value: 30000,
                      width: 565,
                      height: 65,
                      title: "#value#",
                    },
                    {
                      view: "slider",
                      label: "Maksimal Salary",
                      labelWidth: 150,
                      id: "salaryMaxSlider",
                      min: 0,
                      max: 1000000,
                      step: 50000,
                      value: 500000,
                      width: 565,
                      height: 65,
                      title: "#value#",
                    },
                  ],
                },
                { width: 50 },
                {
                  margin: 10,
                  rows: [
                    {
                      view: "datepicker",
                      name: "deadline",
                      id: "deadline",
                      label: "Tanggal Deadline",
                      labelPosition: "top",
                      required: true,
                      minWidth: 300,
                      format: "%Y-%m-%d",
                      stringResult: true,
                    },
                  ],
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
              view: "label",
              label:
                "<span>Deskripsi<span class='text-danger ms-1'> *</span></span>",
            },
            {
              responsive: "row4",
              cols: [
                {
                  view: "ckeditor5",
                  name: "jobDescription",
                  id: "jobDescription",
                  required: true,
                  minWidth: 300,
                  minHeight: 300,
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
              view: "label",
              label:
                "<span>Requirements<span class='text-danger ms-1'> *</span></span>",
            },
            {
              responsive: "row5",
              cols: [
                {
                  view: "ckeditor5",
                  name: "jobRequirements", // Ensure this matches in `rules`
                  id: "jobRequirements",
                  required: true,
                  minWidth: 300,
                  minHeight: 300,
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
            window.location.href = "/manajemen/loker";
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
    jobTitle: webix.rules.isNotEmpty,
    jobCategory: webix.rules.isNotEmpty,
    jobLocation: webix.rules.isNotEmpty,
    jobType: webix.rules.isNotEmpty,
    jobDescription: function (value) {
      return value.trim() !== "";
    },
    jobRequirements: function (value) {
      return value.trim() !== "";
    },
  },
};

function submit_form() {
  const form = $$("jobForm");

  if (!form.validate()) {
    webix.message({ type: "error", text: "Harap isi semua kolom yang wajib!" });
    return;
  }

  var formData = form.getValues();

  const salaryMin = $$("salaryMinSlider").getValue();
  const salaryMax = $$("salaryMaxSlider").getValue();

  formData.salaryRange = salaryMin + " - " + salaryMax;
  formData.companyId = companyId;

  axios
    .put(`http://deviso.vdc.id:3003/api/icc/job/edit/${id}`, formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      webix.message({ type: "success", text: response.data.data });
      setTimeout(() => {
        window.location.href = "/manajemen/loker";
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

  loadJobDetailData(id);
});
