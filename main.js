// Main JavaScript File
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-link");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (navLinks.classList.contains("active")) {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Back to top button
  const backToTop = document.querySelector(".back-to-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Filter projects
      projectCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Project modal
  const projectLinks = document.querySelectorAll(".project-link");
  const modal = document.getElementById("project-modal");
  const modalClose = document.querySelector(".modal-close");
  const modalBody = document.querySelector(".modal-body");

  // Function to close modal
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  projectLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const projectCard = this.closest(".project-card");
      const projectTitle =
        projectCard.querySelector(".project-title").textContent;
      const projectDesc =
        projectCard.querySelector(".project-desc").textContent;
      const projectImage = projectCard.querySelector(".project-image img").src;
      const githubUrl = this.getAttribute("href");

      modalBody.innerHTML = `
          <div class="modal-image">
            <img src="${projectImage}" alt="${projectTitle}" loading="lazy">
          </div>
          <div class="modal-text">
            <h3>${projectTitle}</h3>
            <p>${projectDesc}</p>
            <div class="project-tech">
              ${projectCard.querySelector(".project-tech").innerHTML}
            </div>
            <a href="${githubUrl}" class="btn btn-primary" target="_blank" style="margin-top: 2rem;">
              View on GitHub
            </a>
          </div>
        `;

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal with close button
  modalClose.addEventListener("click", closeModal);

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-level");

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0";

      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }

  // Check if skills section is in view
  const skillsSection = document.querySelector(".skills");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  if (skillsSection) {
    observer.observe(skillsSection);
  }

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();
});
