function loadDataArtikel() {
  webix.ajax().get(
    "https://deviso.vdc.id:3003/api/icc/artikel/publish",
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

        const articles = Array.isArray(response.data) ? response.data : [];

        // if (articles.length === 0) {
        //   console.log("No articles available");
        //   return;
        // }

        const formatDate = (dateString) => {
          if (!dateString) return "Unknown Date";
          const options = { year: "numeric", month: "long", day: "numeric" };
          return new Date(dateString).toLocaleDateString("en-US", options);
        };

        const transformedData = articles.map((article) => ({
          id: article.id,
          title: article.title || "No Title",
          category: (article.category || "Uncategorized").toUpperCase(),
          description: article.description || "No description available.",
          publishdate: formatDate(article.publishdate),
          thumbnail: article.thumbnailBase64 || "/path/to/default-image.png",
        }));

        $$("leftContentArtikel").clearAll();
        $$("rightContentArtikel").clearAll();

        if (transformedData.length > 0) {
          $$("leftContentArtikel").parse([transformedData[0]]);
          $$("rightContentArtikel").parse(transformedData.slice(1, 5));
        }
      },
      error: function (text, data, xhr) {
        console.error("Error loading data:", text);
      },
    }
  );
}

var layoutartikel = {
  type: "wide",
  css: "dataview-artikel",
  cols: [
    {
      view: "dataview",
      id: "leftContentArtikel",
      css: "dataview-left",
      width: 500,
      autoheight: true,
      type: {
        height: 850,
        width: 500,
      },
      template: `
      <div class="card" style="box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; background: url('#thumbnail#') no-repeat center center; background-size: cover;">
        <div style="padding: 16px; background: rgba(255, 255, 255, 1); color: black;">
          <p style="margin: 0 0 8px; font-size: 25px; font-weight: 600;">#title#</p>
          <p style="font-size: 14px; margin: 12px 0;">#description#</p>
        </div>
      </div>
      `,
      onClick: {
        card: function (e, id) {
          let item = this.getItem(id);
          if (item && item.id) {
            window.location.href = `/artikel/detail/${item.id}`;
          }
        },
      },
    },
    {
      view: "dataview",
      id: "rightContentArtikel",
      css: "dataview-right",
      width: 800,
      autoheight: true,
      xCount: 2,
      type: {
        height: 400,
        width: 400,
      },
      template: `
      <div class="card" style="box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
        <div style="width: 100%; height: 250px; overflow: hidden;">
          <img src="#thumbnail#" alt="#title#" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
        </div>
        <hr>
        <div style="padding: 16px; background: rgba(255, 255, 255, 1); color: black;">
          <p style="margin: 0 0 8px; font-size: 25px; font-weight: 600;">#title#</p>
          <div style="font-size: 12px; color: #888; margin-top: 5px; color: black;">
            📅 #publishdate#
          </div>
        </div>
      </div>
      `,
      onClick: {
        card: function (e, id) {
          let item = this.getItem(id);
          if (item && item.id) {
            window.location.href = `/artikel/detail/${item.id}`;
          }
        },
      },
    },
  ],
};

webix.ready(function () {
  webix.ui({
    container: "artikel-page",
    margin: 20,
    rows: [layoutartikel],
  });

  webix.event(window, "resize", function () {
    $$("leftContentArtikel").adjust();
    $$("rightContentArtikel").adjust();
  });

  loadDataArtikel();
});
