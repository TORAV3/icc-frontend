function redirectToForm() {
  const selectElement = document.getElementById("country-select");
  const selectedValue = selectElement.value;

  if (!selectedValue) {
    alert("Silahkan pilih program.");
    return;
  }

  if (selectedValue == "perusahaan") {
    window.location.href = `/company/form`;
  } else {
    window.location.href = `/user/form?${selectedValue}`;
  }
}
