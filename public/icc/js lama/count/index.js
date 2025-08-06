function animateNumber(element, toValue, duration = 1000) {
  let start = 0;
  const step = Math.ceil(toValue / (duration / 30));
  const interval = setInterval(() => {
    start += step;
    if (start >= toValue) {
      start = toValue;
      clearInterval(interval);
    }
    element.innerText = start;
  }, 30);
}

function createTopCard(label, value, icon = "") {
  const id = "stat_" + label.replace(/\s/g, "").toLowerCase();
  return {
    template: `
      <div class="top-card">
        <div class="top-label">${label}</div>
        <div class="top-value" id="${id}">0</div>
      </div>
    `,
    autoheight: true,
    borderless: true,
    css: "card"
  };
}

function createSimpleListBlock(dataList) {
  // Generate HTML with value on top, label below
  const html = dataList
    .map(({ label, id }) => `
      <div class="simple-block">
        <div class="simple-value" id="${id}">0</div>
        <div class="simple-separator"></div>
        <div class="simple-label">${label}</div>
      </div>
    `)
    .join("");

  return {
    template: `<div class="simple-column">${html}</div>`,
    autoheight: true,
    borderless: true,
    css: "card"
  };
}

function getStatisticLayout() {
  // Data IDs for animation
  const peserta = [
    { label: "New Comer", id: "stat_newcomer" },
    { label: "Ex Jepang", id: "stat_exjepang" },
    { label: "Magang", id: "stat_magang" },
    { label: "PMI", id: "stat_pmi" },
  ];
  const mitra = [
    { label: "P3MI", id: "stat_p3mi" },
    { label: "SO", id: "stat_so" },
  ];
  const perusahaan = [
    { label: "Kumiai", id: "stat_kumiai" },
    { label: "TSK", id: "stat_tsk" },
    { label: "Lainnya", id: "stat_lainnya" },
  ];

  return {
    rows: [
      // Top cards row
      {
        cols: [
          createTopCard("Peserta", 230, "👥"),
          createTopCard("Mitra", 40, "🤝"),
          createTopCard("Perusahaan", 100, "🏢"),
        ],
        margin: 20,
      },

      {height: 50},

      // 3 side-by-side blocks below
      {
        cols: [
          createSimpleListBlock(peserta),
          createSimpleListBlock(mitra),
          createSimpleListBlock(perusahaan),
        ],
        padding: 10
      }
    ]
  };
}

webix.ready(function () {
  const container = document.getElementById("count-page");
  if (!container) return;

  webix.ui(getStatisticLayout(), container);

  setTimeout(() => {
    // Top cards
    animateNumber(document.getElementById("stat_peserta"), 230);
    animateNumber(document.getElementById("stat_mitra"), 40);
    animateNumber(document.getElementById("stat_perusahaan"), 100);

    // Jenis Peserta
    animateNumber(document.getElementById("stat_newcomer"), 50);
    animateNumber(document.getElementById("stat_exjepang"), 60);
    animateNumber(document.getElementById("stat_magang"), 70);
    animateNumber(document.getElementById("stat_pmi"), 50);

    // Jenis Mitra
    animateNumber(document.getElementById("stat_p3mi"), 25);
    animateNumber(document.getElementById("stat_so"), 15);

    // Jenis Perusahaan
    animateNumber(document.getElementById("stat_kumiai"), 40);
    animateNumber(document.getElementById("stat_tsk"), 30);
    animateNumber(document.getElementById("stat_lainnya"), 30);
  }, 500);
});
