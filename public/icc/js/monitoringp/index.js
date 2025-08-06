function loadMapIndo() {
  setTimeout(() => {
    const indonesiaBounds = [[-11, 95], [6, 141]];

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

    const cityCoords = {
      "Jakarta": { lat: -6.2088, lon: 106.8456 },
      "Surabaya": { lat: -7.2504, lon: 112.7688 },
      "Samarinda": { lat: -0.4917, lon: 117.146 },
      "Medan": { lat: 3.5952, lon: 98.6722 },
      "Makassar": { lat: -5.1477, lon: 119.4327 },
      "Palembang": { lat: -2.9761, lon: 104.7754 },
      "Aceh": { lat: 5.5483, lon: 95.3238 },
      "Maluku": { lat: -3.6547, lon: 128.19 },
      "Bandung": { lat: -6.9175, lon: 107.6191 },
      "Yogyakarta": { lat: -7.7956, lon: 110.3695 },
      "Manado": { lat: 1.4748, lon: 124.8421 },
      "Pontianak": { lat: -0.0263, lon: 109.3425 },
      "Jayapura": { lat: -2.5337, lon: 140.7181 },
      "Denpasar": { lat: -8.65, lon: 115.2167 },
      "Banjarmasin": { lat: -3.3285, lon: 114.5908 },
      "Pekanbaru": { lat: 0.5071, lon: 101.4478 },
      "Padang": { lat: -0.9471, lon: 100.4172 },
      "Balikpapan": { lat: -1.2654, lon: 116.8312 },
      "Palangkaraya": { lat: -2.2088, lon: 113.9145 },
      "Ambon": { lat: -3.695, lon: 128.1826 },
      "Kupang": { lat: -10.1772, lon: 123.607 },
      "Mataram": { lat: -8.5833, lon: 116.1167 },
      "Ternate": { lat: 0.7893, lon: 127.3874 },
      "Kendari": { lat: -3.9764, lon: 122.5155 },
      "Gorontalo": { lat: 0.5435, lon: 123.0594 },
    };

    const genders = ["L", "P"];
    const cityList = Object.keys(cityCoords);
    const participants = [];

    for (let i = 0; i < 1000; i++) {
      const city = cityList[Math.floor(Math.random() * cityList.length)];
      const gender = genders[Math.floor(Math.random() * 2)];
      participants.push({ name: `Peserta ${i + 1}`, city, gender });
    }

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

    let totalIndo = 0;

    cities.forEach(city => {
      const coord = cityCoords[city.cityName];
      if (!coord) return;

      const persenL = ((city.tlaki / city.total) * 100).toFixed(1);
      const persenP = ((city.tperempuan / city.total) * 100).toFixed(1);

      const usia = {
        "0-17": Math.round(city.total * 0.15),
        "18-35": Math.round(city.total * 0.45),
        "36-50": Math.round(city.total * 0.25),
        "51+": city.total - Math.round(city.total * 0.15) - Math.round(city.total * 0.45) - Math.round(city.total * 0.25)
      };

      const popupContent = `
        <b style="font-size: 17px; font-weight: bold;">${city.cityName}</b><br/>
        <br>
        Total: ${city.total.toLocaleString()}<br/>
        Laki-laki: ${city.tlaki.toLocaleString()} (${persenL}%)<br/>
        Perempuan: ${city.tperempuan.toLocaleString()} (${persenP}%)<br/>
        <br>
        <b>Kelompok Usia:</b><br/>
        0–17: ${usia["0-17"]}<br/>
        18–35: ${usia["18-35"]}<br/>
        36–50: ${usia["36-50"]}<br/>
        51+: ${usia["51+"]}
      `;

      const marker = L.marker([coord.lat, coord.lon], { icon: customIcon }).addTo(map);
      marker.bindPopup(popupContent);

      marker.on("click", () => {
        document.querySelector(".cityNameIndo").textContent = city.cityName;
        document.querySelector(".value.totalindo").textContent = city.total.toLocaleString();
        document.querySelector(".value.tlakiindo").textContent = city.tlaki.toLocaleString();
        document.querySelector(".value.tperempuanindo").textContent = city.tperempuan.toLocaleString();
      });

      totalIndo += city.total;
    });

    document.querySelector(".value.totalindoAll").textContent = totalIndo.toLocaleString();

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

    const wniData = [
      { prefektur: "Hokkaido", jumlah: 7659 },
      { prefektur: "Aomori", jumlah: 835 },
      { prefektur: "Iwate", jumlah: 1234 },
      { prefektur: "Miyagi", jumlah: 2419 },
      { prefektur: "Yamagata", jumlah: 513 },
      { prefektur: "Fukushima", jumlah: 1452 },
      { prefektur: "Gunma", jumlah: 5741 },
      { prefektur: "Tochigi", jumlah: 2197 },
      { prefektur: "Ibaraki", jumlah: 3484 },
      { prefektur: "Saitama", jumlah: 5482 },
      { prefektur: "Chiba", jumlah: 7120 },
      { prefektur: "Tokyo", jumlah: 8711 },
      { prefektur: "Kanagawa", jumlah: 9332 },
      { prefektur: "Niigata", jumlah: 1671 },
      { prefektur: "Toyama", jumlah: 2160 },
      { prefektur: "Ishikawa", jumlah: 1819 },
      { prefektur: "Fukui", jumlah: 1111 },
      { prefektur: "Nagano", jumlah: 3909 },
      { prefektur: "Yamanashi", jumlah: 829 },
      { prefektur: "Shizuoka", jumlah: 6579 },
      { prefektur: "Aichi", jumlah: 14112 },
      { prefektur: "Gifu", jumlah: 3712 },
      { prefektur: "Mie", jumlah: 5286 },
      { prefektur: "Shiga", jumlah: 2519 },
      { prefektur: "Kyoto", jumlah: 2704 },
      { prefektur: "Osaka", jumlah: 4765 },
      { prefektur: "Hyogo", jumlah: 4602 },
      { prefektur: "Nara", jumlah: 1956 },
      { prefektur: "Wakayama", jumlah: 1403 },
      { prefektur: "Tottori", jumlah: 598 },
      { prefektur: "Shimane", jumlah: 529 },
      { prefektur: "Okayama", jumlah: 2242 },
      { prefektur: "Hiroshima", jumlah: 1313 },
      { prefektur: "Yamaguchi", jumlah: 1321 },
      { prefektur: "Tokushima", jumlah: 576 },
      { prefektur: "Kagawa", jumlah: 1004 },
      { prefektur: "Ehime", jumlah: 918 },
      { prefektur: "Kochi", jumlah: 459 },
      { prefektur: "Fukuoka", jumlah: 5414 },
      { prefektur: "Saga", jumlah: 1602 },
      { prefektur: "Nagasaki", jumlah: 2394 },
      { prefektur: "Kumamoto", jumlah: 3060 },
      { prefektur: "Oita", jumlah: 2370 },
      { prefektur: "Miyazaki", jumlah: 2204 },
      { prefektur: "Kagoshima", jumlah: 1540 },
      { prefektur: "Okinawa", jumlah: 2738 }
    ];

    const cityCoords = {
      "Hokkaido": { lat: 43.0642, lon: 141.3469 },
      "Aomori": { lat: 40.8222, lon: 140.7474 },
      "Iwate": { lat: 39.7036, lon: 141.1527 },
      "Miyagi": { lat: 38.2682, lon: 140.8694 },
      "Yamagata": { lat: 38.2404, lon: 140.3633 },
      "Fukushima": { lat: 37.7608, lon: 140.4747 },
      "Gunma": { lat: 36.3907, lon: 139.0604 },
      "Tochigi": { lat: 36.5657, lon: 139.8836 },
      "Ibaraki": { lat: 36.3418, lon: 140.4468 },
      "Saitama": { lat: 35.8617, lon: 139.6455 },
      "Chiba": { lat: 35.6074, lon: 140.1065 },
      "Tokyo": { lat: 35.6895, lon: 139.6917 },
      "Kanagawa": { lat: 35.4478, lon: 139.6425 },
      "Niigata": { lat: 37.9161, lon: 139.0364 },
      "Toyama": { lat: 36.6953, lon: 137.2113 },
      "Ishikawa": { lat: 36.5947, lon: 136.6256 },
      "Fukui": { lat: 36.0652, lon: 136.2216 },
      "Nagano": { lat: 36.6513, lon: 138.1812 },
      "Yamanashi": { lat: 35.6642, lon: 138.5684 },
      "Shizuoka": { lat: 34.9756, lon: 138.3828 },
      "Aichi": { lat: 35.1802, lon: 136.9066 },
      "Gifu": { lat: 35.3912, lon: 136.7223 },
      "Mie": { lat: 34.7303, lon: 136.5086 },
      "Shiga": { lat: 35.0045, lon: 135.8686 },
      "Kyoto": { lat: 35.0116, lon: 135.7681 },
      "Osaka": { lat: 34.6937, lon: 135.5023 },
      "Hyogo": { lat: 34.6913, lon: 135.1830 },
      "Nara": { lat: 34.6851, lon: 135.8048 },
      "Wakayama": { lat: 34.2260, lon: 135.1675 },
      "Tottori": { lat: 35.5011, lon: 134.2351 },
      "Shimane": { lat: 35.4723, lon: 133.0505 },
      "Okayama": { lat: 34.6618, lon: 133.9350 },
      "Hiroshima": { lat: 34.3853, lon: 132.4553 },
      "Yamaguchi": { lat: 34.1785, lon: 131.4737 },
      "Tokushima": { lat: 34.0703, lon: 134.5540 },
      "Kagawa": { lat: 34.3401, lon: 134.0434 },
      "Ehime": { lat: 33.8416, lon: 132.7657 },
      "Kochi": { lat: 33.5597, lon: 133.5311 },
      "Fukuoka": { lat: 33.5902, lon: 130.4017 },
      "Saga": { lat: 33.2635, lon: 130.3009 },
      "Nagasaki": { lat: 32.7503, lon: 129.8777 },
      "Kumamoto": { lat: 32.7898, lon: 130.7417 },
      "Oita": { lat: 33.2382, lon: 131.6126 },
      "Miyazaki": { lat: 31.9111, lon: 131.4239 },
      "Kagoshima": { lat: 31.5966, lon: 130.5571 },
      "Okinawa": { lat: 26.2124, lon: 127.6809 }
    };

    const customIcon = L.icon({
      iconUrl: "/icc/images/map-pin.png",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    const ageGroups = ["0-17", "18-35", "36-50", "51+"];

    wniData.forEach(city => {
      const coord = cityCoords[city.prefektur];
      if (!coord) return;

      const total = city.jumlah;
      const tlaki = Math.round(total * 0.52);
      const tperempuan = total - tlaki;

      const persenL = ((tlaki / total) * 100).toFixed(1);
      const persenP = ((tperempuan / total) * 100).toFixed(1);

      const usia = {
        "0-17": Math.round(total * 0.15),
        "18-35": Math.round(total * 0.45),
        "36-50": Math.round(total * 0.25),
        "51+": total - Math.round(total * 0.15) - Math.round(total * 0.45) - Math.round(total * 0.25)
      };

      const popupContent = `
        <b style="font-size: 17 px; font-weight: bold;">${city.prefektur}</b><br/>
        <br>
        Total: ${total.toLocaleString()}<br/>
        Laki-laki: ${tlaki.toLocaleString()} (${persenL}%)<br/>
        Perempuan: ${tperempuan.toLocaleString()} (${persenP}%)<br/>
        <br>
        <b>Kelompok Usia:</b><br/>
        0–17: ${usia["0-17"]}<br/>
        18–35: ${usia["18-35"]}<br/>
        36–50: ${usia["36-50"]}<br/>
        51+: ${usia["51+"]}
      `;

      const marker = L.marker([coord.lat, coord.lon], { icon: customIcon }).addTo(map);
      marker.bindPopup(popupContent);

      // marker.on("click", () => {
      //   document.querySelector(".cityNameJapan").textContent = city.prefektur;
      //   document.querySelector(".value.totaljapan").textContent = total.toLocaleString();
      //   document.querySelector(".value.tlakijapan").textContent = tlaki.toLocaleString();
      //   document.querySelector(".value.tperempuanjapan").textContent = tperempuan.toLocaleString();
      // });
    });

    map.setMaxBounds(japanBounds);
    map.on("drag", function () {
      map.panInsideBounds(japanBounds, { animate: false });
    });
  }, 500);
}

var statsjapan = {
  view: "layout",
  margin: 10,
  rows: [
    {
      view: "layout",
      cols: [
        {
          id: "statstJapan",
          template: function () {
            return (
              "<div class='card draft'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Total Peserta di Jepang</div>" +
              "<div class='value totaljapan'>154.763</div>" +
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
          id: "statstIndo",
          template: function () {
            return (
              "<div class='card draft'>" +
              "<div class='card-content'>" +
              "<div class='text'>" +
              "<div class='title'>Total Peserta di Indonesia</div>" +
              "<div class='value totalindo'>1000</div>" +
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
        },
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

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 10,
    rows: [statsjapan, mapjapan, mapindo],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });
});
