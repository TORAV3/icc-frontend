function loadData() {
  axios
    .get(`http://deviso.vdc.id:3003/api/icc/artikel/${id}`)
    .then((res) => {
      console.log(res.data);

      const article = res.data.data;

      const formatDate = (dateString) => {
        if (!dateString) return "Unknown Date";
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
      };

      $$("detailView").setValues({
        category: article.category,
        title: article.title,
        thumbnailBase64: article.thumbnailBase64,
        description: article.description,
        publishdate: formatDate(article.publishdate),
      });
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
      <p style="color: rgba(15, 23, 43, 1); font-size: 14px; font-weight: bold; margin-top: 15px;">#publishdate#</p>
      <div style="margin-top: 20px; font-size: 18px; color: #444; text-align: left;">
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
