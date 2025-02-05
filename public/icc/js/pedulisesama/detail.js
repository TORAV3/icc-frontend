function loadPeduliSesamaDetailData() {
  axios
    .get(`http://localhost:3000/api/icc/pedulisesama/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res.data); // Debugging
      let item = res.data.data;

      $$("dataview1").clearAll();
      $$("dataview1").parse([
        {
          id: item.id,
          image: item.thumbnailBase64,
          title: item.title,
          norek: item.norek,
          description: item.description,
        },
      ]);

      setTimeout(() => {
        document.querySelector(".card-description").innerHTML =
          item.description;
      }, 100);
    })
    .catch((err) => {
      console.log(err);
      webix.message({ type: "error", text: err.response.data.data });
    });
}

var dataview = {
  view: "dataview",
  id: "dataview1",
  width: getResponsiveWidth(), // Set dynamic width
  height: 600,
  css: "custom-dataview",
  scroll: false,
  type: {
    width: getResponsiveWidth(), // Adjust width dynamically
    height: 600,
    template: function (obj) {
      return `
          <div class="card">
            <div class="card-content">
              <div class="card-left">
                <img src="${obj.image}" class="card-image">
                <p class="card-donasi">No. Rekening Donasi</p>
                <p class="card-norek">${obj.norek}</p>
              </div>
              <div class="card-text">
                <p class="card-judul">${obj.title}</p>
                <hr>
                <div class="card-description">${obj.description}</div>
              </div>
            </div>
          </div>
        `;
    },
  },
  data: [],
};

// Function to get screen-based width
function getResponsiveWidth() {
  var screenWidth = window.innerWidth;
  if (screenWidth < 480) {
    return 320; // Mobile width
  } else if (screenWidth < 768) {
    return 400; // Tablet width
  } else {
    return 1200; // Desktop width
  }
}

// Initialize Webix UI
webix.ready(function () {
  webix.ui({
    container: "index-page",
    rows: [dataview],
  });

  loadPeduliSesamaDetailData();

  adjustDataviewSize(); // 🔥 Resize on load
});

// Function to adjust Webix `dataview` width dynamically
function adjustDataviewSize() {
  var newWidth = getResponsiveWidth();
  console.log(newWidth);
  $$("dataview1").define("width", newWidth);
  $$("dataview1").resize();
}

// 🔥 Resize dynamically on window resize
webix.event(window, "resize", function () {
  adjustDataviewSize();
});
