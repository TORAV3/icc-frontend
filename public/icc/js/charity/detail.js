function loadData() {
  axios
    .get(`http://localhost:3000/api/icc/pedulisesama/${id}`)
    .then((res) => {
      console.log(res.data);

      const charity = res.data.data;

      $$("detailView").setValues({
        category: charity.category,
        title: charity.title,
        thumbnailBase64: charity.thumbnailBase64,
        description: "",
        norek: charity.norek,
      });

      setTimeout(() => {
        const template = $$("detailView").getNode();
        const descriptionDiv = template.querySelector(".webix-html-content");

        if (descriptionDiv) {
          descriptionDiv.innerHTML = charity.description;

          $$("detailView").resize();
          $$("detailView").adjust();
        }
      }, 100);

    })
    .catch((err) => {
      console.log(err);
      webix.message({
        type: "error",
        text: err.response?.data?.data || "Error fetching data",
      });
    });
}

var dataview = {
  view: "template",
  id: "detailView",
  autoheight: true,
  template: `
    <div style="max-width: 800px; margin: auto; padding: 20px; text-align: center;">
      <p style="color: rgba(190, 30, 45, 1); text-transform: uppercase; font-size: 14px; font-weight: bold;">#category#</p>
      <p style="color: rgba(15, 23, 43, 1); font-size: 32px; font-weight: bold; margin-top: 10px;">#title#</p>
      <img src="#thumbnailBase64#" alt="#title#" style="width: 100%; height: auto; margin-top: 15px; border-radius: 8px;">
      <div style="padding: 8px; border-radius: 6px; background: rgba(0, 0, 0, 0.1); display: inline-block; margin-top: 20px;">
          <p style="margin: 0; font-size: 18px; font-weight: 600; color: black; text-align: center;">#norek#</p>
      </div>
      <div class="webix-html-content" style="margin-top: 20px; font-size: 18px; color: #444; text-align: left;">
        #description#
      </div>
    </div>
  `,
  data: {},
};

webix.ready(function () {

  webix.ui({
    container: "index-page",
    rows: [dataview],
  });
  
  loadData();
});
