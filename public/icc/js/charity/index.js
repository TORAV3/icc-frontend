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

function loadDataCharity() {
  showLoadingOverlayCharity();

  webix.ajax().get(
    "http://localhost:3000/api/icc/pedulisesama/publish",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
    {
      success: function (text, data, xhr) {
        try {
          const response = JSON.parse(text);

          if (!response.data) {
            console.error("No data found in response");
            return;
          }

          const charitys = Array.isArray(response.data) ? response.data : [];

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
            timeAgo: timeAgo(charity.created_at),
            thumbnail: charity.thumbnailBase64 || "/path/to/default-image.png",
          }));

          $$("leftContentCharity").clearAll();
          $$("rightContentCharity").clearAll();

          if (transformedData.length > 0) {
            $$("leftContentCharity").parse([transformedData[0]]);
            $$("rightContentCharity").parse(transformedData.slice(1, 5));
          }
        } catch (e) {
          console.error("Processing error:", e);
        } finally {
          hideLoadingOverlayCharity();
        }
      },
      error: function (text, data, xhr) {
        console.error("Error loading data:", text);
         hideLoadingOverlayCharity();
      },
    }
  );
}

function showLoadingOverlayCharity() {
  const overlay = document.getElementById("loadingOverlayCharity");
  if (overlay) overlay.style.display = "flex";
}

function hideLoadingOverlayCharity() {
  const overlay = document.getElementById("loadingOverlayCharity");
  if (overlay) overlay.style.display = "none";
}

function isMobile() {
  return window.innerWidth <= 768;
}

const leftCharityTemplate = `
        <div class="card" style="box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; background: url('#thumbnail#') no-repeat center center; background-size: cover;">

          <div style="position: absolute; top: 20px; left: 30px; background-color: #be1e2d; color: white; padding: 5px 10px; font-size: 15px; font-weight: bold; border-radius: 10px;">
            🔔 New Update
          </div>

          <div style="padding: 16px; background: rgba(255, 255, 255, 1); color: black;">
            <div style="display: flex; justify-content: space-between; align-items: center;  background: rgba(255, 255, 255, 1);">
              <div style="background-color: #be1e2d; padding: 5px 10px; border-radius: 6px; font-size: 10px; font-weight: bold; color: white;">
                #category#
              </div>

              <div style="padding: 8px; border-radius: 6px; background: rgba(0, 0, 0, 0.1); display: inline-block;">
                <p style="margin: 0; font-size: 13px; font-weight: 600; color: black; text-align: center;">#norek#</p>
              </div>
            </div>

            <p style="margin-top: 10px; font-size: 20px; font-weight: 600; color: black;">#title#</p>

            <div style="font-size: 12px; color: #888; margin-top: 5px;">
              #timeAgo#
            </div>

          </div>
        </div>
        ` 
const rightCharityTemplate = `
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
                <p style="margin-top: 15px; margin-left: 8px; font-size: 18px; font-weight: 600; color:black;">#title#</p>

                <div style="font-size: 12px; color: #888; margin-top: 5px;">
                  #timeAgo#
                </div>
                
              </div>
             
            </div>
            `; 



const layoutcharity = {
  type: "clean",
  css: "dataview-charity",
  rows: isMobile()
    ? [
        {
          view: "dataview",
          id: "leftContentCharity",
          autoheight: true,
          type: { height: 425, width: 350 },
          css: "dataview-left",
          template: leftCharityTemplate,
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
          autoheight: true,
          css: "dataview-right",
          xCount: 1,
           type: { height: 425, width: 350 },
          template: rightCharityTemplate,
          onClick: {
            card: function (e, id) {
              let item = this.getItem(id);
              if (item && item.id) {
                window.location.href = `/charity/detail/${item.id}`;
              }
            },
          },
        }
      ]
    : [
        {
          cols: [
            {
              view: "dataview",
              id: "leftContentCharity",
              width: 500,
              autoheight: true,
              type: { height: 850, width: 500 },
              template: leftCharityTemplate,
              css: "dataview-left",
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
              width: 800,
              autoheight: true,
              css: "dataview-right",
              xCount: 2,
              type: { height: 450, width: 400 },
              template: rightCharityTemplate,
              onClick: {
                card: function (e, id) {
                  let item = this.getItem(id);
                  if (item && item.id) {
                    window.location.href = `/charity/detail/${item.id}`;
                  }
                },
              },
            }
          ]
        }
      ],
};


webix.ready(function () {
  webix.ui({
    container: "charity-page",
    margin: 20,
    rows: [layoutcharity],
  });

  loadDataCharity();
});

