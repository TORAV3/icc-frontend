function loadData() {
  webix
    .ajax()
    .get("http://localhost:3000/api/icc/faq", {
      headers: { Authorization: "Bearer " + token },
    })
    .then(function (response) {
      const data = response.json();

      if (data.status === 200 && Array.isArray(data.data)) {
        $$("dataview1").clearAll();
        $$("dataview1").parse(data.data);
        webix.delay(() => $$("dataview1").adjust());
      } else {
        console.error("Invalid API response format:", data);
      }
    })
    .catch(function (error) {
      console.error("Error loading data:", error);
    });
}

var dataview = {
  view: "dataview",
  id: "dataview1",
  css: "faq-container",
  autoheight: true,
  scroll: false,
  xCount: 2, // Two columns
  type: {
    width: 600, // Fixed width per FAQ item
    height: 250, // Fixed height per FAQ item
  },
  template: function (obj) {
    return `
          <div class="faq-item">
            <div class="faq-question">
              ${obj.title}
            </div>
            <div class="faq-answer">
              <div class="faq-content">${obj.description}</div>
            </div>
          </div>
        `;
  },
};

function updateXCount() {
  let screenWidth = window.innerWidth;
  //   let dataview = $$("dataview1");
  let cardWidth = 600;
  let count = Math.floor(screenWidth / cardWidth);
  if (count < 1) count = 1;

  $$("dataview1").define("xCount", count);
  $$("dataview1").resize();
}

webix.ready(function () {
  webix.ui({
    container: "index-page",
    rows: [dataview],
  });

  webix.event(window, "resize", function () {
    updateXCount();
    grid.adjust();
  });

  loadData();
  updateXCount();
});
