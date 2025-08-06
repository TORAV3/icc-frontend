function loadDataCharity() {
  webix.ajax().get(
    "http://deviso.vdc.id:3003/api/icc/pedulisesama/publish",
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

        // if (charitys.length === 0) {
        //   console.log("No charitys available");
        //   return;
        // }

        const formatDate = (dateString) => {
          if (!dateString) return "Unknown Date";
          const options = { year: "numeric", month: "long", day: "numeric" };
          return new Date(dateString).toLocaleDateString("en-US", options);
        };

        const transformedData = charitys.map((charity) => ({
          id: charity.id,
          title: charity.title || "No Title",
          category: (charity.category || "Uncategorized").toUpperCase(),
          description: charity.description || "No description available.",
          norek: charity.norek || "No norek available.",
          publishdate: formatDate(charity.publishdate),
          thumbnail: charity.thumbnailBase64 || "/path/to/default-image.png",
        }));

        $$("leftContentCharity").clearAll();
        $$("rightContentCharity").clearAll();

        if (transformedData.length > 0) {
          $$("leftContentCharity").parse([transformedData[0]]);
          $$("rightContentCharity").parse(transformedData.slice(1, 5));
        }
      },
      error: function (text, data, xhr) {
        console.error("Error loading data:", text);
      },
    }
  );
}

var layoutcharity = {
  type: "wide",
  css: "dataview-charity",
  cols: [
    {
      view: "dataview",
      id: "leftContentCharity",
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
            <p style="margin: 0 0 8px; font-size: 20px; font-weight: 600; color: black;">#title#</p>
            <br>
            <div style="padding: 8px; border-radius: 6px; background: rgba(0, 0, 0, 0.1); display: inline-block;">
                <p style="margin: 0; font-size: 13px; font-weight: 600; color: black; text-align: center;">#norek#</p>
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
    {
      view: "dataview",
      id: "rightContentCharity",
      css: "dataview-right",
      width: 800,
      autoheight: true,
      xCount: 2,
      type: {
        height: 430,
        width: 290,
      },
      template: `
        <div class="card" style="box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
          <div style="width: 100%; height: 250px; overflow: hidden;">
            <img src="#thumbnail#" alt="#title#" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
          </div>
          <hr>
          <div style="padding: 16px; background: rgba(255, 255, 255, 1); ">
            <p style="margin: 0 0 8px; font-size: 20px; font-weight: 600; color: black;">#title#</p>
            <br>
            <div style="padding: 8px; border-radius: 6px; background: rgba(0, 0, 0, 0.1); display: inline-block;">
                <p style="margin: 0; font-size: 13px; font-weight: 600; color: black; text-align: center;">#norek#</p>
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
    container: "charity-page",
    margin: 20,
    rows: [layoutcharity],
  });

  webix.event(window, "resize", function () {
    $$("leftContentCharity").adjust();
    $$("rightContentCharity").adjust();
  });

  loadDataCharity();
});
