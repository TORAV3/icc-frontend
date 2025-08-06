document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const mobileNav = document.getElementById("mobile-nav-menu");

  menuToggle.addEventListener("click", function () {
    if (mobileNav.style.display === "block") {
      mobileNav.style.display = "none";
    } else {
      mobileNav.style.display = "block";
    }
  });
});

$(document).ready(function() {
    let availableTags = [
        { name: "Artikel", link: "/home#artikel" },
        { name: "Charity", link: "/home#charity" },
        { name: "Contact", link: "/home#contact" },
        { name: "Home", link: "/home" },
        { name: "FAQ", link: "/faq" }
    ];

    if (typeof userData !== 'undefined' && userData) {
        if (userData.type === 'tsk' || userData.type === 'kumiai' || userData.type === 'langsung') {
            availableTags.push(
                { name: "Dashboard", link: "/dashboard/perusahaan" },
                { name: "Peserta ISO", link: "/pesertaiso" },
                { name: "Manajemen SO/P3MI", link: "/list/perusahaan" },
                { name: "Lowongan Kerja", link: "/loker/perusahaan" }
            );
        }

        if (userData.type === 'so') {
            availableTags.push(
                { name: "Dashboard", link: "/dashboard/mitra" },
                { name: "Monitoring Lokasi", link: "/monitoring/so" },
            );
        }

        if (userData.type === 'p3mi') {
            availableTags.push(
                { name: "Dashboard", link: "/dashboard/mitra" },
                { name: "Monitoring Lokasi", link: "/monitoring/p3mi" },
            );
        }

        if (userData.type === 'peserta') {
            availableTags.push(
                { name: "Dashboard", link: "/dashboard/peserta" },
                { name: "Kelas Online", link: "/kelasonline" },
                { name: "Teman", link: "/teman" },
                { name: "Komunitas", link: "/dkomunitas" },
                { name: "Lowongan Kerja", link: "/lowongankerja" },
                { name: "Aduan", link: "/aduan" }
            );
        }

        if (userData.type === 'internal') {
            availableTags.push(
                { name: "Dashboard", link: "/dashboard/admin" },
                { name: "Monitoring Lokasi", link: "/monitoring/lokasi" },
            );
            if (userData.access.muser === '1') {
                availableTags.push({ name: "Manajemen Peserta", link: "/manajemen/peserta" });
            }
            if (userData.access.mperusahaan === '1') {
                availableTags.push({ name: "Manajemen Perusahaan", link: "/manajemen/perusahaan" });
            }
            if (userData.access.martikel === '1') {
                availableTags.push({ name: "Manajemen Artikel", link: "/manajemen/artikel" });
            }
            if (userData.access.mcharity === '1') {
                availableTags.push({ name: "Manajemen Charity", link: "/manajemen/charity" });
            }
            if (userData.access.mkomunitas === '1') {
                availableTags.push({ name: "Manajemen Komunitas", link: "/manajemen/komunitas" });
            }
            if (userData.access.mloker === '1') {
                availableTags.push({ name: "Manajemen Lowongan Kerja", link: "/manajemen/loker" });
            }
            if (userData.access.maduan === '1') {
                availableTags.push({ name: "Manajemen Aduan", link: "/manajemen/aduan" });
            }
            if (userData.access.mpanic === '1') {
                availableTags.push({ name: "Manajemen Panic Button", link: "/manajemen/panic" });
            }
            if (userData.access.usaccess === '1') {
                availableTags.push({ name: "User Access", link: "/user-access" });
            }
        }
    }

    $(".search-bar input").on("keyup", function() {
        let query = $(this).val().toLowerCase();
        let suggestionsBox = $("#suggestionsBox");
        suggestionsBox.empty();

        if (query.length > 0) {
            let filteredSuggestions = availableTags.filter(function(item) {
                return item.name.toLowerCase().includes(query);
            });

            if (filteredSuggestions.length > 0) {
                suggestionsBox.show();
                filteredSuggestions.forEach(function(suggestion) {
                    let suggestionItem = $('<div></div>')
                        .addClass('suggestion-item')
                        .text(suggestion.name)
                        .css({
                            padding: '8px',
                            cursor: 'pointer'
                        });

                    suggestionItem.on('click', function() {
                        window.location.href = suggestion.link;
                    });

                    suggestionsBox.append(suggestionItem);
                });
            } else {
                suggestionsBox.hide();
            }
        } else {
            suggestionsBox.hide();
        }
    });

    $(document).on("click", function(event) {
        if (!$(event.target).closest(".search-bar").length && !$(event.target).closest("#suggestionsBox").length) {
            $("#suggestionsBox").hide();
        }
    });
});