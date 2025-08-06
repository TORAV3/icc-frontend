function loadMapIndo() {
  setTimeout(() => {
    const indonesiaBounds = [
      [-11, 95],
      [6, 141],
    ];

    const map = L.map("map-container-indo", {
      center: [-2.5, 118],
      zoom: 5,
      minZoom: 5,
      maxZoom: 8,
      maxBounds: indonesiaBounds,
      maxBoundsViscosity: 1.0,
      zoomControl: true,
      scrollWheelZoom: false,
      doubleClickZoom: true,
      touchZoom: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">Carto</a>',
    }).addTo(map);

    // 📍 25 kota besar di Indonesia dengan koordinat
    const cityCoords = {
      "Jakarta": { lat: -6.2088, lon: 106.8456 },
      "Surabaya": { lat: -7.2504, lon: 112.7688 },
      "Samarinda": { lat: -0.4917, lon: 117.1460 },
      "Medan": { lat: 3.5952, lon: 98.6722 },
      "Makassar": { lat: -5.1477, lon: 119.4327 },
      "Palembang": { lat: -2.9761, lon: 104.7754 },
      "Aceh": { lat: 5.5483, lon: 95.3238 },
      "Maluku": { lat: -3.6547, lon: 128.1900 },
      "Bandung": { lat: -6.9175, lon: 107.6191 },
      "Yogyakarta": { lat: -7.7956, lon: 110.3695 },
      "Manado": { lat: 1.4748, lon: 124.8421 },
      "Pontianak": { lat: -0.0263, lon: 109.3425 },
      "Jayapura": { lat: -2.5337, lon: 140.7181 },
      "Denpasar": { lat: -8.6500, lon: 115.2167 },
      "Banjarmasin": { lat: -3.3285, lon: 114.5908 },
      "Pekanbaru": { lat: 0.5071, lon: 101.4478 },
      "Padang": { lat: -0.9471, lon: 100.4172 },
      "Balikpapan": { lat: -1.2654, lon: 116.8312 },
      "Palangkaraya": { lat: -2.2088, lon: 113.9145 },
      "Ambon": { lat: -3.6950, lon: 128.1826 },
      "Kupang": { lat: -10.1772, lon: 123.6070 },
      "Mataram": { lat: -8.5833, lon: 116.1167 },
      "Ternate": { lat: 0.7893, lon: 127.3874 },
      "Kendari": { lat: -3.9764, lon: 122.5155 },
      "Gorontalo": { lat: 0.5435, lon: 123.0594 }
    };

    // 🔁 Generate 1000 dummy participants
    const genders = ["L", "P"];
    const cityList = Object.keys(cityCoords);
    const participants = [];

    for (let i = 0; i < 1000; i++) {
      const city = cityList[Math.floor(Math.random() * cityList.length)];
      const gender = genders[Math.floor(Math.random() * 2)];
      participants.push({ name: `Peserta ${i + 1}`, city, gender });
    }

    // 🔁 Agregasi peserta per kota
    const cityMap = {};
    participants.forEach(p => {
      if (!cityMap[p.city]) {
        cityMap[p.city] = { cityName: p.city, total: 0, tlaki: 0, tperempuan: 0 };
      }
      cityMap[p.city].total++;
      p.gender === "L" ? cityMap[p.city].tlaki++ : cityMap[p.city].tperempuan++;
    });

    const cities = Object.values(cityMap);

    const customIcon = L.icon({
      iconUrl: "/icc/images/map-pin.png",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    cities.forEach(city => {
      const coord = cityCoords[city.cityName];
      if (!coord) return;

      const marker = L.marker([coord.lat, coord.lon], { icon: customIcon }).addTo(map);

      marker.bindPopup(`<b>${city.cityName}</b>`);

      marker.on("click", () => {
        document.querySelector(".cityNameIndo").textContent = city.cityName;
        document.querySelector(".value.totalindo").textContent = city.total.toLocaleString();
        document.querySelector(".value.tlakiindo").textContent = city.tlaki.toLocaleString();
        document.querySelector(".value.tperempuanindo").textContent = city.tperempuan.toLocaleString();
      });
    });

    map.setMaxBounds(indonesiaBounds);
    map.on("drag", function () {
      map.panInsideBounds(indonesiaBounds, { animate: false });
    });
  }, 500);
}

function loadMapJapan() {
  setTimeout(() => {
    const japanBounds = [
      [24, 120],
      [50, 150],
    ];

    const map = L.map("map-container", {
      center: [38.5, 137],
      zoom: 6,
      minZoom: 6,
      maxZoom: 8,
      maxBounds: japanBounds,
      maxBoundsViscosity: 1.0,
      zoomControl: true,
      scrollWheelZoom: false,
      doubleClickZoom: true,
      touchZoom: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">Carto</a>',
    }).addTo(map);

    // ⬇️ Koordinat semua prefektur Jepang
    const cityCoords = {
      "Hokkaido": { lat: 43.0642, lon: 141.3469 },
      "Aomori": { lat: 40.8244, lon: 140.7400 },
      "Iwate": { lat: 39.7036, lon: 141.1527 },
      "Miyagi": { lat: 38.2682, lon: 140.8694 },
      "Akita": { lat: 39.7186, lon: 140.1024 },
      "Yamagata": { lat: 38.2404, lon: 140.3633 },
      "Fukushima": { lat: 37.7503, lon: 140.4676 },
      "Ibaraki": { lat: 36.3418, lon: 140.4468 },
      "Tochigi": { lat: 36.5658, lon: 139.8836 },
      "Gunma": { lat: 36.3912, lon: 139.0609 },
      "Saitama": { lat: 35.8617, lon: 139.6455 },
      "Chiba": { lat: 35.6074, lon: 140.1065 },
      "Tokyo": { lat: 35.6895, lon: 139.6917 },
      "Kanagawa": { lat: 35.4478, lon: 139.6425 },
      "Niigata": { lat: 37.9024, lon: 139.0232 },
      "Toyama": { lat: 36.6953, lon: 137.2113 },
      "Ishikawa": { lat: 36.5947, lon: 136.6256 },
      "Fukui": { lat: 36.0652, lon: 136.2216 },
      "Yamanashi": { lat: 35.6639, lon: 138.5684 },
      "Nagano": { lat: 36.6513, lon: 138.1810 },
      "Gifu": { lat: 35.3912, lon: 136.7223 },
      "Shizuoka": { lat: 34.9756, lon: 138.3828 },
      "Aichi": { lat: 35.1802, lon: 136.9066 },
      "Mie": { lat: 34.7303, lon: 136.5086 },
      "Shiga": { lat: 35.0045, lon: 135.8686 },
      "Kyoto": { lat: 35.0116, lon: 135.7681 },
      "Osaka": { lat: 34.6937, lon: 135.5023 },
      "Hyogo": { lat: 34.6913, lon: 135.1830 },
      "Nara": { lat: 34.6851, lon: 135.8048 },
      "Wakayama": { lat: 34.2260, lon: 135.1675 },
      "Tottori": { lat: 35.5011, lon: 134.2351 },
      "Shimane": { lat: 35.4723, lon: 133.0505 },
      "Okayama": { lat: 34.6551, lon: 133.9195 },
      "Hiroshima": { lat: 34.3853, lon: 132.4553 },
      "Yamaguchi": { lat: 34.1785, lon: 131.4737 },
      "Tokushima": { lat: 34.0703, lon: 134.5540 },
      "Kagawa": { lat: 34.3401, lon: 134.0434 },
      "Ehime": { lat: 33.8416, lon: 132.7657 },
      "Kochi": { lat: 33.5597, lon: 133.5311 },
      "Fukuoka": { lat: 33.5902, lon: 130.4017 },
      "Saga": { lat: 33.2635, lon: 130.3009 },
      "Nagasaki": { lat: 32.7503, lon: 129.8777 },
      "Kumamoto": { lat: 32.8031, lon: 130.7079 },
      "Oita": { lat: 33.2382, lon: 131.6126 },
      "Miyazaki": { lat: 31.9111, lon: 131.4239 },
      "Kagoshima": { lat: 31.5602, lon: 130.5581 },
      "Okinawa": { lat: 26.2124, lon: 127.6809 }
    };

    // 🔁 Generate 1000 dummy participants
    const genders = ["L", "P"];
    const prefectures = Object.keys(cityCoords);
    const participants = [];

    for (let i = 0; i < 1000; i++) {
      const city = prefectures[Math.floor(Math.random() * prefectures.length)];
      const gender = genders[Math.floor(Math.random() * 2)];
      participants.push({ name: `Peserta ${i + 1}`, city, gender });
    }

    // 🔁 Agregasi per kota
    const cityMap = {};
    participants.forEach(p => {
      if (!cityMap[p.city]) {
        cityMap[p.city] = { cityName: p.city, total: 0, tlaki: 0, tperempuan: 0 };
      }
      cityMap[p.city].total++;
      p.gender === "L" ? cityMap[p.city].tlaki++ : cityMap[p.city].tperempuan++;
    });

    const cities = Object.values(cityMap);

    const customIcon = L.icon({
      iconUrl: "/icc/images/map-pin.png",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    cities.forEach(city => {
      const coord = cityCoords[city.cityName];
      if (!coord) return;

      const marker = L.marker([coord.lat, coord.lon], { icon: customIcon }).addTo(map);

      marker.bindPopup(`<b>${city.cityName}</b>`);

      marker.on("click", () => {
        document.querySelector(".cityNameJapan").textContent = city.cityName;
        document.querySelector(".value.totaljapan").textContent = city.total.toLocaleString();
        document.querySelector(".value.tlakijapan").textContent = city.tlaki.toLocaleString();
        document.querySelector(".value.tperempuanjapan").textContent = city.tperempuan.toLocaleString();
      });
    });

    map.setMaxBounds(japanBounds);
    map.on("drag", function () {
      map.panInsideBounds(japanBounds, { animate: false });
    });
  }, 500);
}

function getCoordinatesJapan(city, map, customIcon) {
  const { cityName, total, tlaki, tperempuan } = city;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${cityName},Japan`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        console.log(data);
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        // Create marker for city
        const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);

        // Update statistics and bind marker click event
        marker.on("click", () => {
          document.querySelector(".cityNameJapan").textContent = cityName;
          document.querySelector(".value.totaljapan").textContent =
            total.toLocaleString();
          document.querySelector(".value.tlakijapan").textContent =
            tlaki.toLocaleString();
          document.querySelector(".value.tperempuanjapan").textContent =
            tperempuan.toLocaleString();
        });

        // Add popup to marker
        marker.bindPopup(
          `<div style="text-align: right; direction: rtl;">
            <b style="color: rgba(190, 30, 45, 1); font-size: 15px;">${cityName}</b>
          </div>`
        );
      } else {
        console.warn(`No coordinates found for ${cityName}`);
      }
    })
    .catch((error) => {
      console.error("Error fetching data for city:", cityName, error);
    });
}

function getCoordinatesIndo(city, map, customIcon) {
  const { cityName, total, tlaki, tperempuan } = city;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${cityName},Indonesia`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        console.log(data);
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        // Create marker for city
        const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);

        // Update statistics and bind marker click event
        marker.on("click", () => {
          document.querySelector(".cityNameIndo").textContent = cityName;
          document.querySelector(".value.totalindo").textContent =
            total.toLocaleString();
          document.querySelector(".value.tlakiindo").textContent =
            tlaki.toLocaleString();
          document.querySelector(".value.tperempuanindo").textContent =
            tperempuan.toLocaleString();
        });

        // Add popup to marker
        marker.bindPopup(
          `<div style="text-align: right; direction: rtl;">
            <b style="color: rgba(190, 30, 45, 1); font-size: 15px;">${cityName}</b>
          </div>`
        );
      } else {
        console.warn(`No coordinates found for ${cityName}`);
      }
    })
    .catch((error) => {
      console.error("Error fetching data for city:", cityName, error);
    });
}

var statsjapan = {
  view: "layout",
  margin: 10,
  rows: [
    {
      id: "statsCityHeaderJapan",
      template: "<div class='cityNameJapan' style='font-weight:bold; font-size:30px; color:#C62828; padding: 5px; font-align: center;'>Prefektur Jepang</div>",
      autoheight: true,
      css: { "box-shadow": "none" }
    },
    {
      view: "layout",
      cols: [
        {
          id: "statsPIso",
          template: function () {
            return (
              "<div class='card draft'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Total</div>" +
              "<div class='value totaljapan'>0</div>" +
              "</div>" +
              "<div class='icon_stats-piso'>" +
              "<iconify-icon icon='solar:users-group-rounded-bold-duotone'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
        },
        {
          id: "statsPNIso",
          template: function () {
            return (
              "<div class='card draft'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Laki-Laki</div>" +
              "<div class='value tlakijapan'>0</div>" +
              "</div>" +
              "<div class='icon_stats-pniso'>" +
              "<iconify-icon icon='solar:users-group-rounded-bold-duotone'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
        },
        {
          id: "statsTPeserta",
          template: function () {
            return (
              "<div class='card draft'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Perempuan</div>" +
              "<div class='value tperempuanjapan'>0</div>" +
              "</div>" +
              "<div class='icon_stats-tpeserta'>" +
              "<iconify-icon icon='solar:users-group-rounded-bold-duotone'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
        }
      ]
    }
  ]
};

var statsindo = {
  view: "layout",
  margin: 10,
  rows: [
    {
      id: "statsCityHeaderIndo",
      template: "<div class='cityNameIndo' style='font-weight:bold; font-size:30px; color:#C62828; padding: 5px; font-align: center;'>Provinsi Indonesia</div>",
      autoheight: true,
      css: { "box-shadow": "none" }
    },
    {
      view: "layout",
      cols: [
        {
          template: function () {
            return (
              "<div class='card draft'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Total</div>" +
              "<div class='value totalindo'>0</div>" +
              "</div>" +
              "<div class='icon_stats-piso'>" +
              "<iconify-icon icon='solar:users-group-rounded-bold-duotone'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
        },
        {
          template: function () {
            return (
              "<div class='card draft'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Laki-Laki</div>" +
              "<div class='value tlakiindo'>0</div>" +
              "</div>" +
              "<div class='icon_stats-pniso'>" +
              "<iconify-icon icon='solar:users-group-rounded-bold-duotone'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
        },
        {
          template: function () {
            return (
              "<div class='card draft'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Perempuan</div>" +
              "<div class='value tperempuanindo'>0</div>" +
              "</div>" +
              "<div class='icon_stats-tpeserta'>" +
              "<iconify-icon icon='solar:users-group-rounded-bold-duotone'></iconify-icon>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          },
          autoheight: true,
          css: "stats",
        }
      ]
    }
  ]
};

var mapjapan = {
  cols: [
    {
      view: "template",
      id: "mapView",
      autoheight: true,
      template: `<div id="map-container"></div>`,
      on: {
        onAfterRender: function () {
          loadMapJapan();
        },
      },
    },
  ],
};

var mapindo = {
  cols: [
    {
      view: "template",
      id: "mapViewIndo",
      autoheight: true,
      template: `<div id="map-container-indo"></div>`,
      on: {
        onAfterRender: function () {
          loadMapIndo();
        },
      },
    },
  ],
};

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 10,
    rows: [statsjapan, mapjapan, statsindo, mapindo],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });
});
