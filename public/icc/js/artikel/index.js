function loadData() {
  webix.ajax().get(
    "http://localhost:3000/api/icc/artikel/publish",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
    {
      success: function (text, data, xhr) {
        const response = JSON.parse(text);

        console.log("API Response:", response);

        if (!response.data) {
          console.error("No data found in response");
          return;
        }

        // Ensure response.data is an array
        const articles = Array.isArray(response.data) ? response.data : [];

        if (articles.length === 0) {
          console.log("No articles available");
          return;
        }

        const transformedData = articles.map((article) => ({
          id: article.id,
          title: article.title || "No Title",
          category: (article.category || "Uncategorized").toUpperCase(),
          description: article.description || "No description available.",
          publishdate: article.publishdate
            ? new Date(article.publishdate).toISOString().split("T")[0]
            : "Unknown Date",
          thumbnail: article.thumbnailBase64 || "/path/to/default-image.png",
        }));

        console.log("Transformed Data:", transformedData);

        $$("dataview1").clearAll();
        $$("dataview1").parse(transformedData);
      },
      error: function (text, data, xhr) {
        console.error("Error loading data:", text);
      },
    }
  );
}

var dataview = {
  view: "dataview",
  id: "dataview1",
  css: "dataviewcont",
  autoheight: true,
  xCount: 3, // Adjust to show multiple cards per row
  type: {
    height: 500,
    width: 300,
  },
  template: `
  <div class="card" style="box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
    <img src="#thumbnail#" alt="#title#" style="width: 100%; height: auto; max-height: 100%; object-fit: contain;">
    <div style="padding: 16px;">
      <h5 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">#title#</h5>
      <span class="badge bg-primary text-white">#category#</span>
      <p style="font-size: 14px; color: #555; margin: 12px 0;">#description#</p>
      <hr>
      <div style="font-size: 12px; color: #888; margin-top: 5px;">
        📅 #publishdate#
      </div>
    </div>
  </div>
`,
};

webix.ready(function () {
  webix.ui({
    container: "index-page",
    margin: 20,
    rows: [dataview],
  });

  webix.event(window, "resize", function () {
    $$("dataview1").adjust();
  });

  loadData();
});
