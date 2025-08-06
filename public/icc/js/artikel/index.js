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

function loadDataArtikel() {
  showLoadingOverlayArtikel();

  webix.ajax().get(
    "http://localhost:3000/api/icc/artikel/publish",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
    {
      success: function (text, data, xhr) {
        try {
          const response = JSON.parse(text);

          const articles = Array.isArray(response.data) ? response.data : [];

          const formatDate = (dateString) => {
            if (!dateString) return "Unknown Date";
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(dateString).toLocaleDateString("en-US", options);
          };

          const transformedData = articles.map((article) => {
            const rawDescription = article.description || "No description available.";
            const shortDescription = rawDescription.length > 100
              ? rawDescription.substring(0, 100) + "..."
              : rawDescription;

            return {
              id: article.id,
              title: article.title || "No Title",
              category: (article.category || "Uncategorized").toUpperCase(),
              description: shortDescription,
              publishdate: formatDate(article.publishdate),
              thumbnail: article.thumbnailBase64 || "/path/to/default-image.png",
              timeAgo: timeAgo(article.publishdate),
            };
          });

          $$("leftContentArtikel").clearAll();
          $$("rightContentArtikel").clearAll();

          if (transformedData.length > 0) {
            $$("leftContentArtikel").parse([transformedData[0]]);
            $$("rightContentArtikel").parse(transformedData.slice(1, 5));
          }
        } catch (e) {
          console.error("Processing error:", e);
        } finally {
          hideLoadingOverlayArtikel();
        }
      },
      error: function (text, data, xhr) {
        console.error("AJAX error:", text);
        hidLoadingOverlayArtikel();
      }
    }
  );
}

function showLoadingOverlayArtikel() {
  const overlay = document.getElementById("loadingOverlayArtikel");
  if (overlay) overlay.style.display = "flex";
}

function hideLoadingOverlayArtikel() {
  const overlay = document.getElementById("loadingOverlayArtikel");
  if (overlay) overlay.style.display = "none";
}

function isMobile() {
  return window.innerWidth <= 768;
}

function redirectToDetail(e, id) {
  const item = this.getItem(id);
  if (item && item.id) {
    window.location.href = `/artikel/detail/${item.id}`;
  }
}

const leftTemplate = `
      <div class="card" style="box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; background: url('#thumbnail#') no-repeat center center; background-size: cover;">

        <div style="position: absolute; top: 20px; left: 30px; background-color: #be1e2d; color: white; padding: 5px 10px; font-size: 15px; font-weight: bold; border-radius: 10px;">
          🔔 New Update
        </div>

        <div style="padding: 16px; background: rgba(255, 255, 255, 1); color: black;">
          <div style="display: flex; justify-content: space-between; align-items: center;  background: rgba(255, 255, 255, 1);">
            <div style="background-color: #be1e2d; padding: 5px 10px; border-radius: 15px; font-size: 10px; font-weight: bold; color: white;">
              #category#
            </div>

            <div style="font-size: 12px; color: #888; margin-top: 5px;  padding: 5px; color: black;">
              📅 #publishdate#
            </div>
          </div>
          <p style="margin-top: 10px; font-size: 20px; font-weight: 600;">#title#</p>
          <div style="font-size: 12px; color: #888; margin-top: 5px;">
            #timeAgo#
          </div>
        </div>
      </div>
      `;
          
const rightTemplate = `
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
          `;

const layoutartikel = {
  type: "clean",
  css: "dataview-artikel",
  rows: isMobile()
    ? [
        {
          view: "dataview",
          id: "leftContentArtikel",
          autoheight: true,
          css: "dataview-left",
          type: { height: 425, width: 350 },
          template: leftTemplate,
          onClick: { card: redirectToDetail },
        },
        {
          view: "dataview",
          id: "rightContentArtikel",
          autoheight: true,
          css: "dataview-right",
          xCount: 1,
          type: { height: 425, width: 350 },
          template: rightTemplate,
          onClick: { card: redirectToDetail },
        },
      ]
    : [
        {
          cols: [
            {
              view: "dataview",
              id: "leftContentArtikel",
              width: 500,
              css: "dataview-left",
              autoheight: true,
              type: { height: 850, width: 500 },
              template: leftTemplate,
              onClick: { card: redirectToDetail },
            },
            {
              view: "dataview",
              id: "rightContentArtikel",
              width: 800,
              autoheight: true,
              css: "dataview-right",
              xCount: 2,
              type: { height: 425, width: 400 },
              template: rightTemplate,
              onClick: { card: redirectToDetail },
            },
          ],
        },
      ],
};

webix.ready(function () {
  webix.ui({
    container: "artikel-page",
    margin: 30,
    rows: [layoutartikel],
  });

  loadDataArtikel();
});