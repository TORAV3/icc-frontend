function setActiveStep(stepIndex) {
  const multiview = $$("multiStepForm");
  const steps = multiview.getChildViews();

  if (steps && stepIndex >= 0 && stepIndex < steps.length) {
    multiview.setValue(steps[stepIndex].config.id);
  } else {
    console.error("Invalid step index or steps are undefined.");
  }
}

function loadClassData(type, status = "all", topicParam = "all") {
  axios
    .get(
      `http://localhost:3000/api/icc/kelas-iso?type=${type}&status=${status}&topicParam=${topicParam}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      console.l;
      if (res.data.data.length > 0) {
        const transformedData = res.data.data.map(function (item) {
          return {
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
            thumbnailBase64: item.thumbnailBase64,
          };
        });

        $$("dataview1").parse(transformedData);
      } else {
        console.log("kosong");
      }
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

var dataview = {
  view: "dataview",
  id: "dataview1",
  minHeight: 350,
  xCount: 2,
  select: true,
  type: {
    height: 350,
    width: "auto",
  },
  css: "dataviewstyle",
  template: `
      <div class='class_content'>
        <div class='class_content_left'>
          <div class='class_content_left_text'>
            <h6>#title#</h6>
            <span>#subtitle#</span>
          </div>
          <button class='btn' onclick='goToPage(#id#)'>Ikuti</button>
        </div>
        <div class='class_content_right'>
          <img class='thumbimg' src='#thumbnailBase64#'/>
        </div>
      </div>`,
};

function goToPage(id) {
  window.open("http://deviso.vdc.id:8080/", "_blank");
}

function adjustDataviewLayout() {
  const width = window.innerWidth;
  const dataview = $$("dataview1");

  if (width < 1024) {
    dataview.define("xCount", 1);
  } else {
    dataview.define("xCount", 2);
  }

  dataview.resize();
}

var title = {
  view: "template",
  template: `
      <div class='title'>
        <h6>Kelas Online</h6>
        <div class='text'>
          <span>Di Kelas Online, Para Peserta Didik Mendapatkan Berbagai Materi Pendidikan yang Menjadi Dasar untuk Mengikuti Program SSW (Specified Skill Worker) diantaranya Kurikulum Pendidikan Kemampuan Bahasa Jepang JF-Test A2 dan Kurikulum Pendidikan Skill SSW di Berbagai Bidang.</span>
        </div>
      </div>`,
  autoheight: true,
  css: "title",
};

webix.ready(function () {
  
  grid = webix.ui({
    container: "index-page",
    margin: 20,
    rows: [title, dataview],
  });

  adjustDataviewLayout();

  webix.event(window, "resize", function () {
    adjustDataviewLayout();
    grid.adjust();
  });

  loadClassData("trial");
});
