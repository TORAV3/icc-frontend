
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("a.nav-link");
    links.forEach(link => {
    link.addEventListener("click", function(e) {
        const targetId = this.getAttribute("href").split("#")[1];
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
        e.preventDefault();
        window.scrollTo({
            top: targetSection.offsetTop - 60,
            behavior: "smooth"
        });
        }
    });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const trigger = document.getElementById("count-header");
    const target = document.getElementById("countinfo");

    if (trigger && target) {
    trigger.style.cursor = "pointer";
    trigger.addEventListener("click", () => {
        target.scrollIntoView({ behavior: "smooth" });
    });
    }
});

