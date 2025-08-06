function loadData() {
  axios
    .get(`http://localhost:3000/api/icc/community/${id}`)
    .then((res) => {
      console.log(res.data);

      const community = res.data.data;

      const formatDate = (dateString) => {
        if (!dateString) return "Unknown Date";
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
      };

      $$("detailView").setValues({
        category: community.category,
        name: community.name,
        thumbnailBase64: community.thumbnailBase64,
        description: community.description,
        approvaldate: formatDate(community.approval_date),
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
      <p style="color: rgba(15, 23, 43, 1); font-size: 32px; font-weight: bold; margin-top: 10px;">#name#</p>
      <img src="#thumbnailBase64#" alt="#name#" style="width: 100%; height: auto; margin-top: 15px; border-radius: 8px;">
      <p style="color: rgba(15, 23, 43, 1); font-size: 14px; font-weight: bold; margin-top: 15px;">#approvaldate#</p>
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
