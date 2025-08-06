function loadData() {
  webix.ajax().get(
    `http://localhost:3000/api/icc/thread/${id}`, // id = communityId
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
    {
      success: function (text, data, xhr) {
        const response = JSON.parse(text);
        const threads = Array.isArray(response.data) ? response.data : [];

        if (threads.length === 0) {
          console.log("No threads available");
          return;
        }

        const formatDate = (dateString) => {
          if (!dateString) return "Unknown Date";
          const options = { year: "numeric", month: "long", day: "numeric" };
          return new Date(dateString).toLocaleDateString("id-ID", options);
        };

        const transformedData = threads.map((item) => ({
          id: item.id,
          title: item.title,
          thumbnail: item.thumbnailBase64 || "/assets/images/default.jpg",
          content: item.content,
          user: item.user.userDetail.fullname || "Anonim",
          created_at: formatDate(item.created_at),
          detailLink: `/komunitas/thread/detail/${item.id}`,
        }));

        if (transformedData.length % 2 !== 0) {
          transformedData.push({ __empty: true });
        }
        $$("homeContentCommunity").clearAll();
        $$("homeContentCommunity").parse(transformedData);
      },
      error: function (text, data, xhr) {
        console.error("Error loading thread:", text);
      },
    }
  );
}

var layoutcommunity = {
  type: "wide",
  css: "dataview-thread",
  cols: [
    {
      view: "dataview",
      id: "homeContentCommunity",
      css: "dataview",
      autoheight: true,
      xCount: 1,
      type: {
        height: 210,
        width: "auto",
      },
      template: function (obj) {
        if (obj.__empty) return "<div></div>";

        const hasThumbnail = !!obj.thumbnail;

        return `
          <div style="display: flex; gap: 16px; padding: 16px; background: white; border-radius: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            ${
              hasThumbnail
                ? `
              <div style="flex-shrink: 0; width: 200px; height: 130px; border-radius: 10px; overflow: hidden; background: #f2f2f2; display: flex; align-items: center; justify-content: center;">
                <img src="${obj.thumbnail}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.parentElement.remove()">
              </div>
              `
                : ""
            }
            <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <a href="${obj.detailLink}" style="font-size: 18px; font-weight: 700; color: #be1e2d; text-decoration: none;">
                  ${obj.title}
                </a>
                <div style="font-size: 12px; color: #888; margin: 4px 0 8px;">
                  👤 ${obj.user} &nbsp;&nbsp; 📅 ${obj.created_at}
                </div>
                <div style="font-size: 14px; color: #333; line-height: 1.5;">
                  ${truncateText(obj.content, 180)}
                </div>
              </div>
              <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
                <a href="${obj.detailLink}" style="font-size: 13px; padding: 6px 18px; border: 1px solid #be1e2d; color: #be1e2d; text-decoration: none; border-radius: 999px;">
                  Lihat Detail
                </a>
              </div>
            </div>
          </div>
        `;
      },
    },
  ],
};

// Fungsi ringkasan konten
function truncateText(text, maxLength) {
  const stripped = text.replace(/<[^>]+>/g, ""); // hapus HTML tag
  return stripped.length > maxLength
    ? stripped.substring(0, maxLength) + "..."
    : stripped;
}

var toolbar = {
  view: "toolbar",
  css: "toolbar",
  padding: 15,
  cols: [
    {},
    {},
    {
      view: "button",
      value: "Buat Thread",
      width: 200,
      align: "center",
      height: 50,
      click: function () {
        window.location.href = "/komunitas/thread/tambah/" + id;
      },
    },
  ],
};

webix.ready(function () {
  webix.ui({
    container: "index-page",
    margin: 20,
    rows: [toolbar, layoutcommunity],
  });

  webix.event(window, "resize", function () {
    $$("homeContentCommunity").adjust();
  });

  loadData();
});
