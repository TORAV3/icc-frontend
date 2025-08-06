function loadData() {
  webix.ajax().get(
    "http://localhost:3000/api/icc/pedulisesama/publish",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
    {
      success: function (text, data, xhr) {
        const response = JSON.parse(text);
        if (!response.data) {
          console.error("No data found in response");
          return;
        }

        const pedsemas = Array.isArray(response.data) ? response.data : [];

        if (pedsemas.length === 0) {
          return;
        }

        const transformedData = pedsemas.map((pedsemas) => ({
          id: pedsemas.id,
          title: pedsemas.title || "No Title",
          category: pedsemas.category || "No Category",
          description: pedsemas.description || "No description available.",
          norek: pedsemas.norek || "No description available.",
          thumbnail: pedsemas.thumbnailBase64 || "/path/to/default-image.png",
        }));

        $$("dataview1").clearAll();
        $$("dataview1").parse(transformedData);
      },
      error: function (text, data, xhr) {
        console.error("Error loading data:", text);
      },
    }
  );
}

function updateXCount() {
  let screenWidth = window.innerWidth;
  let cardWidth = 320;
  let count = Math.floor(screenWidth / cardWidth);

  if (count < 1) count = 1;

  $$("dataview1").define("xCount", count);
  $$("dataview1").resize();
}

var dataview = {
  view: "dataview",
  id: "dataview1",
  css: "dataviewcont",
  autoheight: true,
  scroll: false, // Disable scroll, use pagination instead
  pager: "pager1", // Link to pagination
  xCount: 1, // Dynamically updates, default is 1
  type: {
    height: 400, // Fixed height per card
    width: 300, // Fixed width per card
  },
  template: `
  <div class="card">
    <img src="#thumbnail#" alt="#title#">
    <div>
      <p>#title#</p>
    </div>
     <div style="display: flex; justify-content: flex-end; align-items: center; margin-top: 5px; margin-right: 15px;">
        <span style="background-color: #6c757d; color: white; font-size: 10px; font-weight: 600; padding: 4px 10px; border-radius: 5px; display: flex; align-items: center;">
            #category#
        </span>
    </div>

  </div>
  `,
  onClick: {
    card: function (e, id) {
      let item = this.getItem(id);
      if (item && item.id) {
        window.location.href = `/pedulisesama/detail/${item.id}`;
      }
    },
  },
};

var pagination = {
  view: "pager",
  id: "pager1",
  size: 8, // Items per page
  group: 5, // Show 5 page numbers at a time
  height: 50,
  template: "{common.prev()} {common.pages()} {common.next()}",
};

webix.ready(function () {
  webix.ui({
    container: "index-page",
    rows: [dataview, pagination],
  });

  // Resize event on window resizing
  webix.event(window, "resize", function () {
    updateXCount();
    $$("pager1").adjust();
    $$("dataview1").adjust();
  });

  // Listen for zoom events and trigger resize
  webix.event(window, "wheel", function (e) {
    if (e.ctrlKey) {
      // When zooming (using ctrl + mousewheel)
      setTimeout(function () {
        $$("pager1").adjust();
        $$("dataview1").adjust();
      }, 100); // Wait a moment after zoom before adjusting
    }
  });

  updateXCount();
  loadData();

  setTimeout(() => {
    $$("pager1").adjust(); // Force UI to adjust pagination visibility
  }, 500);
});
