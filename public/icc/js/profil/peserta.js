function loadUserDetailData() {
  axios
    .get(`http://localhost:3000/api/icc/user/peserta/detail/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      const userDetail = res.data.data.userDetail;
      const user = res.data.data;

      document.getElementById("fullNameHeader").textContent = userDetail.fullname;
      document.getElementById("idHeader").textContent = res.data.data.userDetail.code;
      document.getElementById("statusHeader").textContent = res.data.data.userDetail.programType.toUpperCase();
      document.getElementById("avatarImage").src = user.profilePicBase64 || "/icc/images/default-avatar.png";

      $$("id").setValue(res.data.data.id);
      $$("token").setValue(token);
      $$("fullname").setValue(userDetail.fullname);
      $$("email").setValue(res.data.data.email);
      $$("phone").setValue(userDetail.phone);
      $$("nik").setValue(userDetail.nik);
      $$("gender").setValue(userDetail.gender);
      $$("height").setValue(userDetail.height);
      $$("weight").setValue(userDetail.weight);
      $$("birthplace").setValue(userDetail.birthplace);
      $$("birthdate").setValue(userDetail.birthdate);
      $$("religion").setValue(userDetail.religion);
      $$("lastedu").setValue(userDetail.lastedu);
      $$("trainbef").setValue(userDetail.trainbef);
      $$("city").setValue(userDetail.city);
      $$("address").setValue(userDetail.address);
      $$("mynumber").setValue(userDetail.mynumber);
      $$("dadName").setValue(userDetail.dadName);
      $$("dadPhone").setValue(userDetail.dadPhone);
      $$("dadAddress").setValue(userDetail.dadAddress);
      $$("momName").setValue(userDetail.momName);
      $$("momPhone").setValue(userDetail.momPhone);
      $$("momAddress").setValue(userDetail.momAddress);
      $$("kinsmanName").setValue(userDetail.kinsmanName);
      $$("kinsmanPhone").setValue(userDetail.kinsmanPhone);
      $$("kinsmanAddress").setValue(userDetail.kinsmanAddress);
      $$("companyName").setValue(userDetail.companyName);
      $$("companyAddress").setValue(userDetail.companyAddress);
      $$("companyCity").setValue(userDetail.companyCity);
      // $$("pasFoto").setValue(userDetail.pasFoto);
      // $$("fullBodyFoto").setValue(userDetail.fullBodyFoto);
      // $$("ktp").setValue(userDetail.ktp);
      // $$("kk").setValue(userDetail.kk);
      // $$("akta").setValue(userDetail.akta);
      // $$("ijazah").setValue(userDetail.ijazah);
      // $$("sks").setValue(userDetail.sks);
      // $$("vaksin").setValue(userDetail.vaksin);
      // $$("sertifikat").setValue(userDetail.sertifikat);
      // $$("paspor").setValue(userDetail.paspor);
      // $$("senmonkyuu").setValue(userDetail.senmonkyuu);
      // $$("hyokachoso").setValue(userDetail.hyokachoso);
      // $$("jftest").setValue(userDetail.jftest);
      // $$("capimigrasi").setValue(userDetail.capimigrasi);
      // $$("ktpJepang").setValue(userDetail.ktpJepang);
      // $$("epmi").setValue(userDetail.epmi);

      if (userId === user.id.toString()) {
        $$("updateButton").show();
      } else {
        $$("updateButton").hide();
        disableFormFields();
      }

      // getAvatarFoto(userDetail.id, token);

      const previewButton = document.querySelector("button[title='Preview CV']");
      if (previewButton) {
        previewButton.addEventListener("click", function () {
          previewCV(user, userDetail);
        });
      }

      const avatarButton = document.querySelector("button[title='Profile Pic']");
      if (avatarButton) {
        avatarButton.addEventListener("click", function () {
          showAvatarModal(user.id);
        });
      }
      
    })
    .catch((err) => {
      console.log(err);
      webix.message({
        type: "error",
        text: err.response ? err.response.data.data : "An error occurred",
      });
    });
}

let avatarBase64 = "";
let currentUserId = null;

function showAvatarModal(userId) {
  currentUserId = userId;
  
  if ($$("avatarModal")) {
    $$("avatarModal").show();
    return;
  }

  webix.ui({
    view: "window",
    id: "avatarModal",
    width: 300,
    position: "center",
    modal: true,
    close: true,
    on: {
      onHide: resetAvatarForm
    },
    body: {
      padding: 20,
      rows: [
        {
          view: "template",
          id: "avatarPreview",
          height: 150,
          template: "<div style='text-align:center;'>No image selected</div>"
        },
        { height: 10},
        {
          view: "text",
          id: "avatarFileName",
          label: "File",
          readonly: true
        },
        { height: 20},
        {
          cols: [
            {
              view: "template",
              css: "hide-background",
              template: `
                <button onclick="triggerFileUpload()" style="
                  background-color: #be1e2d;
                  color: white;
                  text-align: center;
                  padding: 10px 20px;
                  font-size: 13px;
                  border: none;
                  border-radius: 6px;
                  cursor: pointer;
                  width: 100%;
                ">Upload</button>
              `,
              height: 60
            },
            {
              view: "template",
              css: "hide-background",
              template: `
                <button onclick="removeAvatar()" style="
                  background-color: #be1e2d;
                  color: white;
                  text-align: center;
                  padding: 10px 20px;
                  font-size: 13px;
                  border: none;
                  border-radius: 6px;
                  cursor: pointer;
                  width: 100%;
                ">Remove</button>
              `,
              height: 45
            }
          ]
        },
        { height: 10 },
        {
          view: "template",
          css: "hide-background",
          template: `
            <div style="text-align: right;">
              <button onclick="handleAvatarSave()" style="
                background-color: #be1e2d;
                color: white;
                padding: 10px 20px;
                font-size: 13px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
              ">Save</button>
            </div>
          `,
          height: 45
        }
      ]
    }
  }).show();
}

function triggerFileUpload() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.click();

  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      $$("avatarFileName").setValue(file.name);

      const reader = new FileReader();
      reader.onload = function (event) {
        avatarBase64 = event.target.result;
        $$("avatarPreview").setHTML(
          `<div style='text-align:center;'>
            <img src="${avatarBase64}" style="max-height:130px; border-radius:8px;" />
          </div>`
        );
      };
      reader.readAsDataURL(file);
    }
  });
}

function handleAvatarSave() {
  if (!avatarBase64) {
    webix.message("No image selected");
    return;
  }

  if (!currentUserId) {
    webix.message({ type: "error", text: "User ID missing!" });
    return;
  }

  const dataToSend = {
    id: currentUserId,
    profilePic: avatarBase64
  };

  axios
    .put(`http://localhost:3000/api/icc/user/upload/avatar/${currentUserId}`, dataToSend, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) => {
      webix.message({
        type: "success",
        text: "Foto Profil berhasil diperbarui."
      });
      $$("avatarModal").hide();
      resetAvatarForm();
      setTimeout(() => {
        location.reload();
      }, 3000);
    })
    .catch((error) => {
      webix.message({
        type: "error",
        text: error.response?.data?.data || "Gagal menyimpan avatar."
      });
    });
}

function resetAvatarForm() {
  avatarBase64 = "";
  if ($$("avatarFileName")) $$("avatarFileName").setValue("");
  if ($$("avatarPreview")) $$("avatarPreview").setHTML("<div style='text-align:center;'>No image selected</div>");
}

function removeAvatar() {
  if (!currentUserId) {
    webix.message({ type: "error", text: "User ID missing!" });
    return;
  }

  axios
    .delete(`http://localhost:3000/api/icc/user/avatar/${currentUserId}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(() => {
      webix.message({
        type: "success",
        text: "Foto Profil berhasil dihapus."
      });
      $$("avatarModal").hide();
      resetAvatarForm();
      setTimeout(() => {
        location.reload();
      }, 3000);
    })
    .catch((error) => {
      webix.message({
        type: "error",
        text: error.response?.data?.data || "Gagal menghapus avatar."
      });
    });
}


// function previewCV(user, userDetail) {

//     let avatarSrc = '';
  
//     avatarSrc = user.profilePicBase64;

//     let cvContent = `
//       <div style="font-family: Arial, sans-serif; line-height: 1.8; padding: 20px; max-width: 800px; margin: auto;">
//         <!-- Header Section: Avatar and Name -->
//         <div style="display: flex; align-items: center; margin-bottom: 20px;">
//           <!-- Avatar -->
//           <div style="flex: 2;">
//             <img src="${avatarSrc}" alt="Avatar" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover;">
//           </div>
//           <!-- Name and Title -->
//           <div style="flex: 3; padding-left: 20px;">
//             <p style="margin: 0; font-size: 1.5rem; font-weight: bold; color: #2c3e50;">${userDetail.fullname}</p>
//             <p style="margin: 0; color: #7f8c8d;">${userDetail.programType.toUpperCase()}</p>
//           </div>
//         </div>

//         <hr>
//         <br>

//         <div style="margin-bottom: 20px;">
          
//           <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//             <p style="flex: 1; font-weight: bold;">ID Member / メンバーID</p>
//             <p style="flex: 2; text-align: right;">${userDetail.code}</p>
//           </div>

//           <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//             <p style="flex: 1; font-weight: bold;">My Number / マイナンバー</p>
//             <p style="flex: 2; text-align: right;">${userDetail.mynumber || '-'}</p>
//           </div>

//           <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//             <p style="flex: 1; font-weight: bold;">Email / メールアドレス</p>
//             <p style="flex: 2; text-align: right;">${user.email || 'Email belum diisi'}</p>
//           </div>

//           <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//             <p style="flex: 1; font-weight: bold;">No. HP / 電話番号</p>
//             <p style="flex: 2; text-align: right;">${userDetail.phone}</p>
//           </div>

//           <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//             <p style="flex: 1; font-weight: bold;">Tempat Lahir / 出身地</p>
//             <p style="flex: 2; text-align: right;">${userDetail.birthplace}</p>
//           </div>

//           <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//             <p style="flex: 1; font-weight: bold;">Tanggal Lahir / 生年月日</p>
//             <p style="flex: 2; text-align: right;">${userDetail.birthdate}</p>
//           </div>

//           <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//             <p style="flex: 1; font-weight: bold;">Agama / 宗教</p>
//             <p style="flex: 2; text-align: right;">${userDetail.religion.toUpperCase()}</p>
//           </div>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//             <p style="flex: 1; font-weight: bold;">Pendidikan Terakhir / 最終学歴</p>
//             <p style="flex: 2; text-align: right;">${userDetail.lastedu.toUpperCase()}</p>
//           </div>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//             <p style="flex: 1; font-weight: bold;">Alamat / 住所</p>
//             <p style="flex: 2; text-align: right;">${userDetail.address}</p>
//           </div>
//           <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//             <p style="flex: 1; font-weight: bold;">Kota/Kabupaten / 市/州</p>
//             <p style="flex: 2; text-align: right;">${userDetail.city}</p>
//           </div>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//             <p style="flex: 1; font-weight: bold;">Perusahaan / 企業名</p>
//             <p style="flex: 2; text-align: right;">${userDetail.companyName || '-' }</p>
//           </div>
//           <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//             <p style="flex: 1; font-weight: bold;">Alamat Perusahaan / 会社住所</p>
//             <p style="flex: 2; text-align: right;">${userDetail.companyAddress || '-'}</p>
//           </div>
//           <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//             <p style="flex: 1; font-weight: bold;">Kota/Prefektur Perusahaan / 市/県</p>
//             <p style="flex: 2; text-align: right;">${userDetail.companyCity || '-'}</p>
//           </div>
//         </div>
//       </div>
//     `;

//     if ($$("cvPreviewWindow")) {
//       $$("cvPreviewWindow").close();
//     }

//     const previewWindow = webix.ui({
//       view: "window",
//       id: "cvPreviewWindow",
//       width: 600,
//       height: 600,
//       head: "Preview CV",
//       body: {
//         view: "template",
//         template: cvContent,
//         autoheight: true,
//         autowidth: true,
//         scroll: true,
//       },
//       position: "center",
//       modal: true,
//       close: true,
//     });

    
//     previewWindow.show();

// }

function previewCV(user, userDetail) {
    const avatarSrc = user.profilePicBase64 || 'https://i.pravatar.cc/150?img=5';

    const dummyData = {
        no: '12345',
        usia: '25歳',
        jenisKelamin: 'Laki-laki (男性)',
        namaRomaji: 'Andi Setiawan',
        namaKatakana: 'ブディ・ハルトノ',
        alamat: 'Jl. Industri Utama Blok C5, Cikarang, Bekasi, Jawa Barat',
        tanggalLahir: '1999年 08月 17日',
        tinggi: '172 cm',
        beratBadan: '68 kg',
        golonganDarah: 'O',
        statusPernikahan: '無 (Belum Menikah)',
        agama: 'Islam',
        tanganDominan: 'Kanan (右)',
        ukuranSepatu: '42',
        penglihatanKiri: '1.2',
        penglihatanKanan: '1.2',
        lembagaPengirim: 'LPK Sukses Bersama',
        asosiasiPenerima: 'Kumiai Jaya Abadi',
        sertifikatTingkat3: '有',
        hyoukachosho: '有',
        testBahasa: 'N3',
        cvLama: '無',
        lainnya: '-',
        riwayatKerjaJepang: [
            { perusahaan: '株式会社スズキ', pekerjaan: '組立 (Perakitan)', masukTahun: '2021', masukBulan: '04', keluarTahun: '2024', keluarBulan: '04' },
        ],
        riwayatKerjaIndonesia: [
            { perusahaan: 'PT. Astra Honda Motor', pekerjaan: 'Operator Produksi', masukTahun: '2018', masukBulan: '01', keluarTahun: '2021', keluarBulan: '01' },
            { perusahaan: '', pekerjaan: '', masukTahun: '', masukBulan: '', keluarTahun: '', keluarBulan: '' },
            { perusahaan: '', pekerjaan: '', masukTahun: '', masukBulan: '', keluarTahun: '', keluarBulan: '' },
        ],
        susunanKeluarga: [
            { nama: 'Santoso', hubungan: 'Ayah (父)', usia: '55', pekerjaan: 'Wiraswasta' },
            { nama: 'Siti Aminah', hubungan: 'Ibu (母)', usia: '52', pekerjaan: 'Ibu Rumah Tangga' },
            { nama: 'Dewi Hartono', hubungan: 'Adik (妹)', usia: '18', pekerjaan: 'Pelajar' },
            { nama: '', hubungan: '', usia: '', pekerjaan: '' },
        ],
        hobi: 'Membaca, Bermain Futsal (読書、フットサル)',
        keterampilanKhusus: 'Mengoperasikan Mesin CNC (CNC機械操作)',
        kelebihan: 'Pekerja keras, cepat belajar, dan mampu bekerja dalam tim. (勤勉で、学習が早く、チームで働くことができます。)',
    };
    
    const getData = (key, source) => source[key] || '';
    const generateRiwayatRows = (dataArray) => {
        let rows = ''; (dataArray || []).forEach(item => { rows += `<tr><td class="text-left">${getData('perusahaan', item)}</td><td class="text-left">${getData('pekerjaan', item)}</td><td class="text-center">${getData('masukTahun', item)}</td><td class="text-center">${getData('masukBulan', item)}</td><td class="text-center">${getData('keluarTahun', item)}</td><td class="text-center">${getData('keluarBulan', item)}</td></tr>`; }); return rows;
    };
    const generateKeluargaRows = (dataArray) => {
        let rows = ''; (dataArray || []).forEach(member => { rows += `<tr><td class="text-left">${getData('nama', member)}</td><td class="text-center">${getData('hubungan', member)}</td><td class="text-center">${getData('usia', member)}</td><td class="text-left">${getData('pekerjaan', member)}</td></tr>`; }); return rows;
    };
    const generateJapaneseTestCells = (level) => {
        const n_levels = ['N1', 'N2', 'N3', 'N4']; const n_levels_html = n_levels.map(l => l === level ? `<b>${l}</b>` : l).join('・'); const jft_html = level === 'JFT-A2' ? '<b>JFT-A2</b>' : 'JFT-A2'; const jitco_html = level === 'JITCO' ? '<b>JITCO</b>' : 'JITCO'; return `<td class="text-center">${n_levels_html}</td><td class="text-center">・</td><td class="text-center">${jft_html}</td><td class="text-center">${jitco_html}</td>`;
    };

    const finalData = { ...dummyData, ...userDetail };
    const riwayatKerjaJepang = userDetail.riwayatKerjaJepang || dummyData.riwayatKerjaJepang;
    const riwayatKerjaIndonesia = userDetail.riwayatKerjaIndonesia || dummyData.riwayatKerjaIndonesia;
    const susunanKeluarga = userDetail.susunanKeluarga || dummyData.susunanKeluarga;

    const cvContent = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <title>Preview CV - ${finalData.namaRomaji}</title>
            <style>
                body { background-color: #e0e0e0; display: flex; justify-content: center; margin: 0; padding: 20px 0; font-family: 'MS Gothic', Meiryo, 'Osaka', sans-serif; }
                .page { width: 210mm; background-color: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.15); box-sizing: border-box; padding: 15mm; }
                .cv-container { font-size: 10pt; line-height: 1.2; color: #000; }
                .cv-table { width: 100%; border-collapse: collapse; margin-bottom: 6px; }
                .cv-table td, .cv-table th { border: 1px solid #a9a9a9; padding: 1px 5px; vertical-align: middle; height: 24px; }
                .cv-title { text-align: center; border: none !important; padding: 0 0 10px 0 !important; }
                .main-title { font-size: 14pt; font-weight: bold; }
                .sub-title { font-size: 20pt; font-weight: bold; }
                .label-cell { background-color: #ffff99; text-align: center; font-weight: normal; font-size: 9pt; }
                .photo-cell { vertical-align: top; padding: 4px; }
                .photo-cell img { width: 90px; height: 120px; object-fit: cover; border: 1px solid #ccc; }
                .text-center { text-align: center; }
                .text-left { text-align: left; }
                .header-row th { background-color: #ffff99; text-align: center; font-weight: normal; }
                @media print {
                    body { background-color: #fff; margin: 0; padding: 0; }
                    .page { box-shadow: none; margin: 0; padding: 0; border: none; }
                }
            </style>
        </head>
        <body>
            <div class="page">
                <div class="cv-container">
                    <table style="width: 100%; border: none; margin-bottom: 5px;">
                        <tr>
                            <td class="cv-title">
                                <span class="main-title">BIODATA</span><br>
                                <span class="sub-title">特定技能履歴書</span>
                            </td>
                        </tr>
                    </table>

                    <table class="cv-table">
                        <tr>
                            <td class="label-cell" style="width: 10%;">NO. 番号</td>
                            <td style="width: 23%;">${finalData.no}</td>
                            <td class="label-cell" style="width: 10%;">Usia 年齢</td>
                            <td style="width: 10%;">${finalData.usia}</td>
                            <td class="label-cell" style="width: 15%;">Jenis Kelamin 性別</td>
                            <td colspan="2">${finalData.jenisKelamin}</td>
                        </tr>
                        <tr>
                            <td rowspan="2" class="label-cell">Nama 氏名</td>
                            <td class="label-cell">ローマ字</td>
                            <td colspan="4">${finalData.namaRomaji}</td>
                            <td rowspan="7" style="width: 98px;" class="photo-cell"><img src="${avatarSrc}" alt="Profile Picture"></td>
                        </tr>
                        <tr>
                            <td class="label-cell">カタカナ</td>
                            <td colspan="4">${finalData.namaKatakana}</td>
                        </tr>
                        <tr>
                            <td rowspan="2" class="label-cell">Alamat 住所</td>
                            <td colspan="5">${finalData.alamat}</td>
                        </tr>
                        <tr>
                            <td colspan="5"></td>
                        </tr>
                        <tr>
                            <td class="label-cell">Tanggal Lahir 生年月日</td>
                            <td colspan="3">${finalData.tanggalLahir}</td>
                            <td class="label-cell" rowspan="2">視力検査</td>
                            <td class="label-cell">左 ${finalData.penglihatanKiri}</td>
                        </tr>
                        <tr>
                             <td class="label-cell">Tinggi 身長</td>
                             <td>${finalData.tinggi}</td>
                             <td class="label-cell">Berat Badan 体重</td>
                             <td>${finalData.beratBadan}</td>
                             <td class="label-cell">右 ${finalData.penglihatanKanan}</td>
                        </tr>
                        <tr>
                            <td class="label-cell">Golongan Darah 血液</td>
                            <td>${finalData.golonganDarah}</td>
                            <td class="label-cell">Status Pernikahan 配偶者の有無</td>
                            <td>${finalData.statusPernikahan}</td>
                            <td class="label-cell">Agama 宗教</td>
                            <td colspan="2">${finalData.agama}</td>
                        </tr>
                        <tr>
                            <td class="label-cell">Tangan Dominan 利き腕</td>
                            <td>${finalData.tanganDominan}</td>
                            <td class="label-cell">Ukuran Sepatu 靴サイズ</td>
                            <td>${finalData.ukuranSepatu}</td>
                            <td class="label-cell" colspan="2">Lembaga Pengirim Indonesia インドネシアの送り出し機関の名前</td>
                            <td>${finalData.lembagaPengirim}</td>
                        </tr>
                         <tr>
                            <td class="label-cell" colspan="2">Asosiasi Penerima di Jepang 日本受け入れ組合の名前</td>
                            <td colspan="5">${finalData.asosiasiPenerima}</td>
                        </tr>
                    </table>
                    
                    <table class="cv-table">
                        <thead>
                            <tr class="header-row"><th colspan="8">Sertifikat yang didapat 取得した証明書</th></tr>
                            <tr>
                                <td class="label-cell" style="width: 14%;">Sertifikat Tingkat 3 専門級</td><td class="label-cell" style="width: 14%;">Hyoukachosho 評価調書</td>
                                <td class="label-cell" colspan="4">Test Bahasa Jepang 日本語検定</td>
                                <td class="label-cell" style="width: 14%;">CV Lama 元履歴書</td><td class="label-cell" style="width: 14%;">Lainnya その他</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center"><b>${finalData.sertifikatTingkat3}</b> ・ 無</td><td class="text-center"><b>${finalData.hyoukachosho}</b> ・ 無</td>
                                ${generateJapaneseTestCells(finalData.testBahasa)}
                                <td class="text-center">有 ・ <b>${finalData.cvLama}</b></td><td class="text-center">${finalData.lainnya}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="cv-table">
                        <tr class="header-row"><th colspan="6">Riwayat Pekerjaan di Jepang 日本の職歴 (3年間)</th></tr>
                        <tr><td class="label-cell" style="width: 38%;">Nama Perusahaan di Jepang 日本での会社名</td><td class="label-cell" style="width: 38%;">Pekerjaan 仕事内容</td><td class="label-cell" style="width: 8%;">Tahun Masuk 入国</td><td class="label-cell" style="width: 4%;">月</td><td class="label-cell" style="width: 8%;">Tahun Keluar 帰国</td><td class="label-cell" style="width: 4%;">月</td></tr>
                        ${generateRiwayatRows(riwayatKerjaJepang)}
                    </table>
                    <table class="cv-table">
                        <tr class="header-row"><th colspan="6">Riwayat Pekerjaan di Indonesia インドネシアの職歴</th></tr>
                        <tr><td class="label-cell" style="width: 38%;">Nama Perusahaan 会社名</td><td class="label-cell" style="width: 38%;">Pekerjaan 仕事内容</td><td class="label-cell" style="width: 8%;">Tahun Masuk 入る</td><td class="label-cell" style="width: 4%;">月</td><td class="label-cell" style="width: 8%;">Tahun Keluar 出る</td><td class="label-cell" style="width: 4%;">月</td></tr>
                        ${generateRiwayatRows(riwayatKerjaIndonesia)}
                    </table>

                    <table class="cv-table">
                        <tr class="header-row"><th colspan="4">Susunan Keluarga 家族構成</th></tr>
                        <tr><td class="label-cell" style="width: 40%;">Nama Anggota Keluarga 家族の名前</td><td class="label-cell" style="width: 20%;">Hubungan 続柄</td><td class="label-cell" style="width: 15%;">Usia 年齢</td><td class="label-cell" style="width: 25%;">Pekerjaan 職業</td></tr>
                        ${generateKeluargaRows(susunanKeluarga)}
                    </table>
                    
                    <table class="cv-table">
                        <tr><td class="label-cell" style="width: 25%;">Hobi 趣味</td><td style="width: 25%;">${finalData.hobi}</td><td class="label-cell" style="width: 25%;">Kelebihan 備考欄</td><td rowspan="2">${finalData.kelebihan}</td></tr>
                        <tr><td class="label-cell">Keterampilan Khusus 特技</td><td>${finalData.keterampilanKhusus}</td></tr>
                    </table>
                </div>
            </div>
        </body>
        </html>
    `;

    // Logika membuka tab baru
    const previewTab = window.open('', '_blank');
    previewTab.document.open();
    previewTab.document.write(cvContent);
    previewTab.document.close();
}

function disableFormFields() {
  $$("fullname").disable();
  $$("email").disable();
  $$("phone").disable();
  $$("nik").disable();
  $$("gender").disable();
  $$("height").disable();
  $$("weight").disable();
  $$("birthplace").disable();
  $$("birthdate").disable();
  $$("religion").disable();
  $$("lastedu").disable();
  $$("trainbef").disable();
  $$("city").disable();
  $$("address").disable();
  $$("mynumber").disable();
  $$("dadName").disable();
  $$("dadPhone").disable();
  $$("dadAddress").disable();
  $$("momName").disable();
  $$("momPhone").disable();
  $$("momAddress").disable();
  $$("kinsmanName").disable();
  $$("kinsmanPhone").disable();
  $$("kinsmanAddress").disable();
  $$("companyName").disable();
  $$("companyAddress").disable();
  $$("companyCity").disable();
  $$("pasFoto").disable();
  $$("fullBodyFoto").disable();
  $$("ktp").disable();
  $$("kk").disable();
  $$("akta").disable();
  $$("ijazah").disable();
  $$("sks").disable();
  $$("vaksin").disable();
  $$("sertifikat").disable();
  $$("paspor").disable();
  $$("senmonkyuu").disable();
  $$("hyokachoso").disable();
  $$("jftest").disable();
  $$("capimigrasi").disable();
  $$("ktpJepang").disable();
  $$("epmi").disable();
}

var tabcells = [
  {
    header: "Data Diri",
    width: 100,
    body: {
      id: "formres",
      rows: [
        {
          view: "text",
          name: "id",
          id: "id",
          hidden: true,
        },
        {
          view: "text",
          name: "token",
          id: "token",
          hidden: true,
        },
        { height: 20 },
        {
          responsive: "formres",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  id: "row1",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row1",
                      cols: [
                        {
                          view: "text",
                          name: "fullname",
                          id: "fullname",
                          label: "Nama Lengkap",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                        {
                          view: "text",
                          name: "email",
                          id: "email",
                          label: "Email",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row2",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row2",
                      cols: [
                        {
                          view: "text",
                          name: "phone",
                          id: "phone",
                          label: "No. HP",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                        {
                          view: "text",
                          name: "nik",
                          id: "nik",
                          label: "No. NIK",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row3",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row3",
                      cols: [
                        {
                          view: "combo",
                          label: "Pernah mengikuti pelatihan sebelumnya?",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "0", value: "Tidak" },
                            { id: "1", value: "Ya" },
                          ],
                          minWidth: 300,
                          name: "trainbef",
                          id: "trainbef",
                          required: true,
                          
                        },
                        {
                          view: "combo",
                          label: "Jenis Kelamin",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "p", value: "Perempuan" },
                            { id: "l", value: "Laki-Laki" },
                          ],
                          minWidth: 300,
                          name: "gender",
                          id: "gender",
                          required: true,
                          
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row4",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row4",
                      cols: [
                        {
                          view: "text",
                          name: "height",
                          id: "height",
                          label: "Tinggi Badan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                        {
                          view: "text",
                          name: "weight",
                          id: "weight",
                          label: "Berat Badan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row5",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row5",
                      cols: [
                        {
                          view: "text",
                          name: "birthplace",
                          id: "birthplace",
                          label: "Tempat Lahir",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                        {
                          view: "datepicker",
                          name: "birthdate",
                          id: "birthdate",
                          label: "Tanggal Lahir",
                          labelPosition: "top",
                          minWidth: 300,
                          required: true,
                          
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row6",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row6",
                      cols: [
                        {
                          view: "combo",
                          label: "Agama",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "islam", value: "Islam" },
                            { id: "katolik", value: "Katolik" },
                            { id: "protestan", value: "Protestan" },
                            { id: "hindu", value: "Hindu" },
                            { id: "buddha", value: "Buddha" },
                            { id: "konghucu", value: "Konghucu" },
                          ],
                          minWidth: 300,
                          name: "religion",
                          id: "religion",
                          required: true,
                          
                        },
                        {
                          view: "combo",
                          label: "Pendidikan Terakhir",
                          value: "",
                          labelPosition: "top",
                          options: [
                            { id: "sd", value: "SD" },
                            { id: "smp", value: "SMP" },
                            { id: "sma", value: "SMA" },
                            { id: "d3", value: "D3" },
                            { id: "s1", value: "S1" },
                            { id: "s2", value: "S2" },
                            { id: "s3", value: "S3" },
                          ],
                          minWidth: 300,
                          name: "lastedu",
                          id: "lastedu",
                          required: true,
                          
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row7",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row7",
                      cols: [
                        {
                          view: "text",
                          name: "mynumber",
                          id: "mynumber",
                          label: "My Number",
                          labelPosition: "top",
                          minWidth: 300,
                          
                        },
                        {
                          view: "text",
                          name: "city",
                          id: "city",
                          label: "Kota/Kabupaten",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row8",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row8",
                      cols: [
                        {
                          view: "textarea",
                          id: "address",
                          name: "address",
                          height: 120,
                          label: "Alamat",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                        { minWidth: 300 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    header: "Data Perusahaan",
    width: 150,
    body: {
      id: "formre2",
      rows: [
        { height: 20 },
        {
          responsive: "formres2",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  id: "row9",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row9",
                      cols: [
                        {
                          view: "text",
                          name: "companyName",
                          id: "companyName",
                          label: "Nama Perusahaan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                        {
                          view: "text",
                          name: "companyCity",
                          id: "companyCity",
                          label: "Kota/Prefektur",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row10",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row10",
                      cols: [
                        {
                          view: "textarea",
                          id: "companyAddress",
                          name: "companyAddress",
                          height: 120,
                          label: "Alamat Perusahaan",
                          labelPosition: "top",
                          required: true,
                          minWidth: 300,
                          
                        },
                        { minWidth: 300 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    header: "Data Orang Tua",
    width: 150,
    body: {
      id: "formres3",
      margin: 10,
      css: "marystyle",
      rows: [
        {
          responsive: "formres3",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  view: "text",
                  name: "dadName",
                  id: "dadName",
                  label: "Nama Ayah",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  
                },
                {
                  view: "text",
                  name: "dadPhone",
                  id: "dadPhone",
                  label: "No. HP Ayah",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  
                },
                {
                  view: "textarea",
                  id: "dadAddress",
                  name: "dadAddress",
                  height: 120,
                  label: "Alamat Ayah",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  
                },
              ],
            },
            {
              margin: 10,
              rows: [
                {
                  view: "text",
                  name: "momName",
                  id: "momName",
                  label: "Nama Ibu",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  
                },
                {
                  view: "text",
                  name: "momPhone",
                  id: "momPhone",
                  label: "No. HP Ibu",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  
                },
                {
                  view: "textarea",
                  id: "momAddress",
                  name: "momAddress",
                  height: 120,
                  label: "Alamat Ibu",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  
                },
              ],
            },
            {
              margin: 10,
              rows: [
                {
                  view: "text",
                  name: "kinsmanName",
                  id: "kinsmanName",
                  label: "Nama Kerabat",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  
                },
                {
                  view: "text",
                  name: "kinsmanPhone",
                  id: "kinsmanPhone",
                  label: "No. HP Kerabat",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  
                },
                {
                  view: "textarea",
                  id: "kinsmanAddress",
                  name: "kinsmanAddress",
                  height: 120,
                  label: "Alamat Kerabat",
                  labelPosition: "top",
                  required: true,
                  minWidth: 300,
                  
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    header: "Dokumen Penunjang",
    width: 190,
    body: {
      id: "formres2",
      rows: [
        { height: 20 },
        {
          responsive: "formres2",
          cols: [
            {
              margin: 10,
              rows: [
                {
                  id: "row12",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row12",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "pasFoto",
                                  id: "pasFoto",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "text",
                                      name: "pasFotoText",
                                      id: "pasFotoText",
                                      label: "Pas Foto 3x4",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                                        fileInput.accept = 'image/*';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const pasFotoText = $$('pasFotoText');
                                            if (pasFotoText) {
                                              pasFotoText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("pasFoto").setValue(base64File);
                                              console.log(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "pasFoto",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "fullBodyFoto",
                                  id: "fullBodyFoto",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "fullBodyFotoText",
                                      id: "fullBodyFotoText",
                                      label: "Foto Full Body",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                                        fileInput.accept = 'image/*';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const fullBodyFotoText = $$('fullBodyFotoText');
                                            if (fullBodyFotoText) {
                                              fullBodyFotoText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("fullBodyFoto").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "fullBodyFoto",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row13",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row13",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "ktp",
                                  id: "ktp",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "ktpText",
                                      id: "ktpText",
                                      label: "Kartu Tanda Penduduk",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const ktpText = $$('ktpText');
                                            if (ktpText) {
                                              ktpText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("ktp").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "ktp",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "kk",
                                  id: "kk",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "kkText",
                                      id: "kkText",
                                      label: "Kartu Keluarga",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const kkText = $$('kkText');
                                            if (kkText) {
                                              kkText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("kk").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "kk",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row14",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row14",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "akta",
                                  id: "akta",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "aktaText",
                                      id: "aktaText",
                                      label: "Kartu Keluarga",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const aktaText = $$('aktaText');
                                            if (aktaText) {
                                              aktaText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("akta").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "akta",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "ijazah",
                                  id: "ijazah",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "ijazahText",
                                      id: "ijazahText",
                                      label: "Ijazah",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const ijazahText = $$('ijazahText');
                                            if (ijazahText) {
                                              ijazahText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("ijazah").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "ijazah",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row15",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row15",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "sks",
                                  id: "sks",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "sksText",
                                      id: "sksText",
                                      label: "Surat Keterangan Sehat",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const sksText = $$('sksText');
                                            if (sksText) {
                                              sksText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("sks").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "sks",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "vaksin",
                                  id: "vaksin",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "vaksinText",
                                      id: "vaksinText",
                                      label: "Sertifikat Vaksin",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const vaksinText = $$('vaksinText');
                                            if (vaksinText) {
                                              vaksinText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("vaksin").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "vaksin",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row16",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row16",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "sertifikat",
                                  id: "sertifikat",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "sertifikatText",
                                      id: "sertifikatText",
                                      label: "Sertifikat Skill",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const sertifikatText = $$('sertifikatText');
                                            if (sertifikatText) {
                                              sertifikatText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("sertifikat").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "sertifikat",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "paspor",
                                  id: "paspor",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "pasporText",
                                      id: "pasporText",
                                      label: "Paspor",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const pasporText = $$('pasporText');
                                            if (pasporText) {
                                              pasporText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("paspor").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "paspor",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row17",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row17",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "senmonkyuu",
                                  id: "senmonkyuu",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "senmonkyuuText",
                                      id: "senmonkyuuText",
                                      label: "Senmonkyuu",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const senmonkyuuText = $$('senmonkyuuText');
                                            if (senmonkyuuText) {
                                              senmonkyuuText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("senmonkyuu").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "senmonkyuu",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "hyokachoso",
                                  id: "hyokachoso",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "hyokachosoText",
                                      id: "hyokachosoText",
                                      label: "Hyokachoso",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const hyokachosoText = $$('hyokachosoText');
                                            if (hyokachosoText) {
                                              hyokachosoText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("hyokachoso").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "hyokachoso",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row18",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row18",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "jftest",
                                  id: "jftest",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "jftestText",
                                      id: "jftestText",
                                      label: "JFTEST",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const jftestText = $$('jftestText');
                                            if (jftestText) {
                                              jftestText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("jftest").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "jftest",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "capimigrasi",
                                  id: "capimigrasi",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "capimigrasiText",
                                      id: "capimigrasiText",
                                      label: "Cap Imigrasi",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const capimigrasiText = $$('capimigrasiText');
                                            if (capimigrasiText) {
                                              capimigrasiText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("capimigrasi").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "capimigrasi",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "row19",
                  margin: 10,
                  rows: [
                    {
                      responsive: "row19",
                      cols: [
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "ktpJepang",
                                  id: "ktpJepang",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "ktpJepangText",
                                      id: "ktpJepangText",
                                      label: "Kartu Tanda Penduduk Jepang",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const ktpJepangText = $$('ktpJepangText');
                                            if (ktpJepangText) {
                                              ktpJepangText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("ktpJepang").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "ktpJepang",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          rows: [
                            {
                              cols: [
                                {
                                  view: "text",
                                  name: "epmi",
                                  id: "epmi",
                                  hidden: true,
                                },
                                {
                                  rows: [
                                    {
                                      view: "text",
                                      name: "epmiText",
                                      id: "epmiText",
                                      label: "E-PMI",
                                      labelPosition: "top",
                                      readonly: true,
                                      minWidth: 300,
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label: "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:cloud-upload-outline'></iconify-icon></span>",
                                      click: function () {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                
                                        fileInput.click();
                
                                        fileInput.addEventListener('change', function() {
                                          if (fileInput.files.length > 0) {
                                            const file = fileInput.files[0];
                
                                            const epmiText = $$('epmiText');
                                            if (epmiText) {
                                              epmiText.setValue(file.name);
                                            }
                
                                            const reader = new FileReader();
                                            reader.onload = function(event) {
                                              const base64File = event.target.result;
                                              $$("epmi").setValue(base64File);
                                            };
                                            reader.readAsDataURL(file)
                                          }
                                        });
                                      }
                                    },
                                  ],
                                },
                                {
                                  rows: [
                                    {},
                                    {
                                      view: "button",
                                      css: "btnupdown",
                                      width: 30,
                                      label:
                                        "<span class='webix_icon' style='text-align:center;'><iconify-icon icon='solar:download-square-outline'></iconify-icon></span>",
                                      click: function () {
                                        const form = $$("userForm");

                                        const id = form.getValues().id;
                                        const token = form.getValues().token;
                                        const fullName =
                                          form.getValues().fullname;

                                        downloadFile(
                                          "epmi",
                                          fullName,
                                          id,
                                          token
                                        );
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
];

var tab = {
  view: "tabview",
  css: "tabstyle",
  cells: tabcells,
  multiview: { fitBiggest: true },
};

var form = {
  view: "form",
  id: "userForm",
  margin: 40,
  elements: [tab],
};

var btnupdate = {
  id: "row11",
  margin: 10,
  rows: [
    {
      responsive: "row11",
      cols: [
        {
          rows: [
            {
              view: "button",
              value: "Update",
              id: "updateButton",
              css: "update",
              click: function() {
                updateForm();
              },
            },
          ],
        },
      ],
    },
  ],
};

function downloadFile(column, name, id, token) {
  webix.ajax().get(
    `http://localhost:3000/api/icc/peserta/file/download/${column}/${id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
    {
      success: function (text, data, xhr) {
        var datanya = JSON.parse(text);

        var fileName;

        switch (column) {
          case "pasFoto":
            fileName = `${name} - Pas Foto 3x4`;
            break;
          case "fullBodyFoto":
            fileName = `${name} - Foto Full Body`;
            break;
          case "ktp":
            fileName = `${name} - KTP`;
            break;
          case "kk":
            fileName = `${name} - KK`;
            break;
          case "akta":
            fileName = `${name} - Akta Kelahiran`;
            break;
          case "ijazah":
            fileName = `${name} - Ijazah`;
            break;
          case "sks":
            fileName = `${name} - Surat Keterangan Sehat`;
            break;
          case "vaksin":
            fileName = `${name} - Sertifikat Vaksin`;
            break;
          case "sertifikat":
            fileName = `${name} - Sertifikat Skill`;
            break;
          case "paspor":
            fileName = `${name} - Paspor`;
            break;
          case "senmonkyuu":
            fileName = `${name} - Senmonkyuu`;
            break;
          case "hyokachoso":
            fileName = `${name} - Hyokachoso`;
            break;
          case "jftest":
            fileName = `${name} - JFT Test`;
            break;
          case "capimigrasi":
            fileName = `${name} - Cap Imigrasi`;
            break;
          case "ktpJepang":
            fileName = `${name} - KTP Jepang`;
            break;
          case "epmi":
            fileName = `${name} - EPMI`;
            break;
          default:
            break;
        }

        const link = document.createElement("a");
        link.href = datanya.data[column];
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error: function (text, data, xhr) {
        console.log(text);
      },
    }
  );
}

// function getAvatarFoto(id, token, callback) {
//   axios
//     .get(`http://localhost:3000/api/icc/peserta/file/download/pasFoto/${id}`, {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     })
//     .then((res) => {
//       const avatarBase64 = res.data.data.pasFoto || '/icc/images/default-avatar.png';
//       // document.getElementById("avatarImage").src = avatarBase64;

//       if (callback && typeof callback === 'function') {
//         callback(avatarBase64);
//       }
//     })
//     .catch((err) => {
//       console.log("Error loading avatar foto:", err);
//     });
// }

function updateForm() {
  const form = $$("userForm");
  if (form.validate()) {
    const formData = form.getValues();

    console.log(formData);
    axios
      .put(`http://localhost:3000/api/icc/user/peserta/edit/${formData.id}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        webix.message({
          type: "success",
          text: "Data Diri Berhasil Di Update",
        });
        // Optionally reload data after update
        location.reload();
      })
      .catch((error) => {
        webix.message({
          type: "error",
          text: error.response ? error.response.data.data : "An error occurred",
        });
      });
  } else {
    webix.message({
      type: "error",
      text: "Silakan isi semua field yang wajib diisi.",
    });
  }
}

webix.ready(function () {
  grid = webix.ui({
    container: "index-page",
    margin: 10,
    rows: [form, btnupdate],
  });

  webix.event(window, "resize", function () {
    grid.adjust();
  });
  

  loadUserDetailData();
});
