function loadData() {
  axios
    .get(`http://localhost:3000/api/icc/artikel/${id}`)
    .then((res) => {
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
        publishdate: formatDate(article.publishdate),
        description: "",
      });

      setTimeout(() => {
        const template = $$("detailView").getNode(); 
        const descriptionDiv = template.querySelector(".webix-html-content");
        const image = template.querySelector("img");

        if (descriptionDiv) {
          descriptionDiv.innerHTML = article.description;
        }

        // Tunggu gambar selesai load, baru resize (untuk kasus konten panjang & gambar)
        const doResize = () => {
          // Resize berulang untuk pastikan semua konten terhitung
          webix.delay(() => {
            $$("detailView").resize();
            setTimeout(() => $$("detailView").resize(), 150);
          }, null, null, 100);
        };

        if (image && !image.complete) {
          image.onload = doResize;
        } else {
          doResize();
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
      <p style="color: rgba(15, 23, 43, 1); font-size: 14px; font-weight: bold; margin-top: 15px;">#publishdate#</p>
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
