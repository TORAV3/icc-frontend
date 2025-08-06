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

function loadDataCharity(categoryFilter, startDateFilter, endDateFilter) {
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

        const charitys = Array.isArray(response.data) ? response.data : [];

        if (charitys.length === 0) {
          console.log("No charitys available");
          return;
        }

        const transformedData = charitys
          .filter((charity) => {
            let matchCategory = true;
            let matchDate = true;

            if (
              categoryFilter &&
              categoryFilter !== "all" &&
              charity.category !== categoryFilter
            ) {
              matchCategory = false;
            }

            return matchCategory;
          })
          .map((charity) => ({
            id: charity.id,
            title: charity.title || "No Title",
            category: (charity.category || "Uncategorized").toUpperCase(),
            description: charity.description || "No description available.",
            norek: charity.norek || "No norek available.",
            timeAgo: timeAgo(charity.created_at),
            thumbnail: charity.thumbnailBase64 || "/path/to/default-image.png",
          }));

        $$("allContentCharity").clearAll();

        if (transformedData.length > 0) {
          $$("allContentCharity").parse(transformedData);
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
    { id: "Sosial", value: "Sosial" },
    { id: "Bencana", value: "Bencana" },
    { id: "Pendidikan", value: "Pendidikan" },
  ],
  width: 250,
  name: "category",
  align: "left",
  on: {
    onChange: function (newValue) {
      loadDataCharity(
        newValue
      );
    },
  },
};

var toolbar = {
  view: "toolbar",
  css: "toolbar",
  padding: 15,
  cols: [categoryCombo],
};

var layoutcharity = {
  type: "wide",
  css: "dataview-charity",
  rows: [
    {
      view: "dataview",
      id: "allContentCharity",
      css: "dataview",
      autoheight: true,
      xCount: 3,
      type: {
        height: 430,
        width: 430,
      },
      template: `
            <div class="card" style="box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
              <div style="width: 100%; height: 250px; overflow: hidden;">
                <img src="#thumbnail#" alt="#title#" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
              </div>
              <hr>
              <div style="padding: 16px; background: rgba(255, 255, 255, 1); color: black;">
              <div style="display: flex; justify-content: space-between; align-items: center;  background: rgba(255, 255, 255, 1);">
                  <div style="background-color: #be1e2d; padding: 5px 10px; border-radius: 8px; font-size: 10px; font-weight: bold; color: white;">
                    #category#
                  </div>

                  <div style="background-color: rgba(0, 0, 0, 0.1); padding: 5px 10px; border-radius: 8px; font-size: 10px; font-weight: bold;">
                    #norek#
                  </div>
                </div>
                <p style="margin-top: 15px; margin-left: 8px; font-size: 25px; font-weight: 600;">#title#</p>

                <div style="font-size: 12px; color: #888; margin-top: 5px;">
                  #timeAgo#
                </div>
                
              </div>
             
            </div>
            `,
      onClick: {
        card: function (e, id) {
          let item = this.getItem(id);
          if (item && item.id) {
            window.location.href = `/charity/detail/${item.id}`;
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
    rows: [toolbar, layoutcharity],
  });

  webix.event(window, "resize", function () {
    $$("allContentCharity").adjust();
  });

  loadDataCharity();
});
