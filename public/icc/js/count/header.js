function animateNumberHeader(element, toValue, duration = 1000) {
  let start = 0;
  const step = Math.ceil(toValue / (duration / 30));
  const interval = setInterval(() => {
    start += step;
    if (start >= toValue) {
      start = toValue;
      clearInterval(interval);
    }
    element.innerText = `${start} +`;
  }, 30);
}


function getSimpleCounterLayout() {
  return {
    template: `
      <div class="simple-counter-block">
        <div class="counter-item">
          <div class="counter-number" id="hstat_peserta">0</div>
          <div class="counter-label">Peserta</div>
          <div class="counter-desc">PMI, Magang</div>
        </div>
        <div class="counter-item">
          <div class="counter-number" id="hstat_mitra">0</div>
          <div class="counter-label">Mitra</div>
          <div class="counter-desc">SO, P3MI</div>
        </div>
        <div class="counter-item">
          <div class="counter-number" id="hstat_perusahaan">0</div>
          <div class="counter-label">Perusahaan</div>
          <div class="counter-desc">TSK, Kumiai, Lainnya</div>
        </div>
      </div>
    `,
    autoheight: true,
    borderless: true,
    css: "counter-header"
  };
}


webix.ready(function () {
  const container = document.getElementById("count-header");
  if (!container) return;

  webix.ui(getSimpleCounterLayout(), container);

  setTimeout(() => {
    animateNumberHeader(document.getElementById("hstat_peserta"), 122270);
    animateNumberHeader(document.getElementById("hstat_mitra"), 490);
    animateNumberHeader(document.getElementById("hstat_perusahaan"), 350);
  }, 500);
});
