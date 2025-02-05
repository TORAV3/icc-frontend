webix.ready(function () {
  webix.ui({
    container: "index-page",
    rows: [
      {
        view: "template",
        id: "mapView",
        height: 1000,
        template: `<div id="map-container" style="width:100%; height:600px;"></div>`,
        on: {
          onAfterRender: function () {
            loadMap();
          },
        },
      },
    ],
  });

  function loadMap() {
    setTimeout(() => {
      const map = L.map("map-container").setView([36.2048, 138.2529], 5); // Centered on Japan

      // Load OpenStreetMap Tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Load dummy data (Replace with API later)
      const cities = [
        { name: "Osaka", lat: 34.6937, lng: 135.5023 },
        { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
        { name: "Kyoto", lat: 35.0116, lng: 135.7681 },
        { name: "Fukuoka", lat: 33.5904, lng: 130.4017 },
        { name: "Hokkaido", lat: 43.0642, lng: 141.3469 },
      ];

      // Add Markers for Each City
      cities.forEach((city) => {
        L.marker([city.lat, city.lng])
          .addTo(map)
          .bindPopup(`<b>${city.name}</b>`);
      });
    }, 500);
  }
});
