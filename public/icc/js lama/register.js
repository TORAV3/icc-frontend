function updateOptions() {
  const roleSelect = document.getElementById("role-select");
  const programSelect = document.getElementById("program-select");
  const programSelectWrapper = document.getElementById(
    "program-select-wrapper"
  );
  const selectedRole = roleSelect.value;

  if (selectedRole) {
    programSelectWrapper.style.display = "block";
  } else {
    programSelectWrapper.style.display = "none";
    return;
  }

  programSelect.innerHTML = "<option value=''>Pilih Jenis</option>";

  if (selectedRole === "peserta") {
    const newcomerOption = new Option("Newcomer", "newcomer");
    const exjepangOption = new Option("Ex-Jepang", "exjepang");
    const magangOption = new Option("Magang (Jisshusei)", "magang");
    const pmiOption = new Option("Pekerja PMI (Tokutei Ginou)", "pmi");
    programSelect.add(newcomerOption);
    programSelect.add(exjepangOption);
    programSelect.add(magangOption);
    programSelect.add(pmiOption);
  } else if (selectedRole === "perusahaan") {
    const tskOption = new Option("TSK", "tsk");
    const kumiaiOption = new Option("Kumiai", "kumiai");
    const langsungOption = new Option("Langsung", "langsung");
    programSelect.add(tskOption);
    programSelect.add(kumiaiOption);
    programSelect.add(langsungOption);
  }
}

function redirectToForm() {
  const selectElement = document.getElementById("program-select");
  const selectedValue = selectElement.value;

  if (!selectedValue) {
    alert("Silahkan pilih program.");
    return;
  }

  if (selectedValue == "langsung") {
    window.location.href = `/company/form/langsung`;
  } else if (selectedValue == "tsk") {
    window.location.href = `/company/form/tsk`;
  } else if (selectedValue == "kumiai") {
    window.location.href = `/company/form/kumiai`;
  } else if (selectedValue == "newcomer") {
    window.location.href = `/user/form/newcomer`;
  } else if (selectedValue == "exjepang") {
    window.location.href = `/user/form/exjepang`;
  } else if (selectedValue == "magang") {
    window.location.href = `/user/form/magang`;
  } else if (selectedValue == "pmi") {
    window.location.href = `/user/form/pmi`;
  }
}
