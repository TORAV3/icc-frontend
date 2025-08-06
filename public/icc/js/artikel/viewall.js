function timeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  const months = Math.floor(diffInSeconds / 2592000);
  const years = Math.floor(diffInSeconds / 31536000); 
  
  if (years > 0) return `${years} tahun yang lalu`;
  if (months > 0) return `${months} bulan yang lalu`;
  if (days > 0) return `${days} hari yang lalu`;
  if (hours > 0) return `${hours} jam yang lalu`;
  if (minutes > 0) return `${minutes} menit yang lalu`;
  return `${diffInSeconds} detik yang lalu`;
}

function loadDataArtikel(categoryFilter, startDateFilter, endDateFilter) {
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

        if (!response.data) {
          console.error("No data found in response");
          return;
        }

        const articles = Array.isArray(response.data) ? response.data : [];

        if (articles.length === 0) {
          console.log("No articles available");
          return;
        }

        const formatDate = (dateString) => {
          if (!dateString) return "Unknown Date";
          const options = { year: "numeric", month: "long", day: "numeric" };
          return new Date(dateString).toLocaleDateString("en-US", options);
        };

        let startDate = startDateFilter ? new Date(startDateFilter) : null;
        let endDate = endDateFilter ? new Date(endDateFilter) : null;

        if (startDate) {
          startDate.setHours(0, 0, 0, 0);
        }
        if (endDate) {
          endDate.setHours(23, 59, 59, 999);
        }

        const transformedData = articles
          .filter((article) => {
            let matchCategory = true;
            let matchDate = true;

            if (
              categoryFilter &&
              categoryFilter !== "all" &&
              article.category !== categoryFilter
            ) {
              matchCategory = false;
            }

            let publishDate = new Date(article.publishdate);
            publishDate.setHours(0, 0, 0, 0);

            if (startDate && publishDate < startDate) {
              matchDate = false;
            }
            if (endDate && publishDate > endDate) {
              matchDate = false;
            }

            return matchCategory && matchDate;
          })
          .map((article) => ({
            id: article.id,
            title: article.title || "No Title",
            category: (article.category || "Uncategorized").toUpperCase(),
            description: article.description || "No description available.",
            publishdate: formatDate(article.publishdate),
            timeAgo: timeAgo(article.publishdate),
            thumbnail: article.thumbnailBase64 || "/path/to/default-image.png",
          }));

        $$("viewContentArtikel").clearAll();

        if (transformedData.length > 0) {
          $$("viewContentArtikel").parse(transformedData);
        }
      },
      error: function (text, data, xhr) {
        console.error("Error loading data:", text);
      },
    }
  );
}

var categoryCombo = {
  view: "combo",
  id: "categoryFilter",
  labelPosition: "top",
  label: "Kategori",
  value: "all",
  options: [
    { id: "all", value: "All" },
    { id: "berita", value: "Berita" },
    { id: "informasi", value: "Informasi" },
    { id: "event", value: "Event" },
  ],
  width: 250,
  name: "category",
  align: "left",
  on: {
    onChange: function (newValue) {
      loadDataArtikel(
        newValue,
        $$("startDateFilter").getValue(),
        $$("endDateFilter").getValue()
      );
    },
  },
};

var startDateFilter = {
  view: "datepicker",
  id: "startDateFilter",
  label: "Dari",
  labelPosition: "top",
  width: 250,
  align: "left",
  format: "%Y-%m-%d",
  on: {
    onChange: function () {
      loadDataArtikel(
        $$("categoryFilter").getValue(),
        $$("startDateFilter").getValue(),
        $$("endDateFilter").getValue()
      );
    },
  },
};

var endDateFilter = {
  view: "datepicker",
  id: "endDateFilter",
  label: "Sampai",
  width: 250,
  labelPosition: "top",
  align: "left",
  format: "%Y-%m-%d",
  on: {
    onChange: function () {
      loadDataArtikel(
        $$("categoryFilter").getValue(),
        $$("startDateFilter").getValue(),
        $$("endDateFilter").getValue()
      );
    },
  },
};

var toolbar = {
  view: "toolbar",
  css: "toolbar",
  padding: 15,
  cols: [categoryCombo, {}, startDateFilter, { width: 30 }, endDateFilter],
};

var layoutartikel = {
  type: "wide",
  css: "dataview-artikel",
  rows: [
    {
      view: "dataview",
      id: "viewContentArtikel",
      css: "dataview-right",
      autoheight: true,
      xCount: 3,
      type: {
        height: 430,
        width: 430,
      },
      template: `
          <div class="card" style="margin: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
            <div style="width: 100%; height: 250px; overflow: hidden;">
              <img src="#thumbnail#" alt="#title#" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
            </div>
            <hr>
            <div style="padding: 16px; background: rgba(255, 255, 255, 1); color: black;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="background-color: #be1e2d; padding: 5px 10px; border-radius: 15px; font-size: 11px; font-weight: bold; color: white;">
                  #category#
                </div>
                <div style="font-size: 11px; color: #888; padding: 5px; color: black;">
                  📅 #publishdate#
                </div>
              </div>
              <p style="margin-top: 8px; font-size: 15px; font-weight: 600;">#title#</p>
              <div style="font-size: 12px; color: #888; margin-top: 2px;">
                #timeAgo#
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
    container: "index-page",
    margin: 20,
    rows: [toolbar, layoutartikel],
  });

  webix.event(window, "resize", function () {
    $$("viewContentArtikel").adjust();
  });

  loadDataArtikel();
});
