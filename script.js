document.addEventListener("DOMContentLoaded", () => {
  // Detect folder depth (root = 0, /about/ = 1, /collections/ = 1, etc.)
  const depth = window.location.pathname.split("/").length - 2;
  const prefix = "../".repeat(depth);
// --------------------
  // Load Header
  // --------------------
  fetch(prefix + "header.html")
    .then((r) => r.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;

      // Hamburger menu toggle
      const menuToggle = document.getElementById("menu-toggle");
      const navLinks = document.getElementById("nav-links");
      if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
          navLinks.classList.toggle("active");
          menuToggle.classList.toggle("open"); // toggle icon ☰ ↔ ✖
        });

        // Optional: close menu when link clicked (mobile)
        navLinks.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
              navLinks.classList.remove("active");
              menuToggle.classList.remove("open");
            }
          });
        });
      }

      // Active nav link highlighting
      const links = document.querySelectorAll(".nav-links a");
      let currentPath = window.location.pathname.replace(/\/$/, "") || "/";

      // Remove active from all
      links.forEach((link) => link.classList.remove("active"));

      // Add active to current
      links.forEach((link) => {
        let linkPath = link.getAttribute("href").replace(/\/$/, "") || "/";
        if (currentPath === linkPath) {
          link.classList.add("active");
        }
      });

      // Logo click -> go to home
      const logo = document.querySelector(".logo a");
      if (logo) {
        logo.addEventListener("click", (e) => {
          e.preventDefault();
          window.location.href = "/";
        });
      }
    });


  // --------------------
  // Load Footer
  // --------------------
  fetch(prefix + "footer.html")
    .then((r) => r.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;

      // Auto update year (if not already set in footer.html)
      const yearSpan = document.getElementById("year");
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
    });
});




