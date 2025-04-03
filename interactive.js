document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".tech-carousel");
  const wrapper = document.querySelector(".tech-carousel-wrapper");

  // Pause animation on hover
  wrapper.addEventListener("mouseenter", () => {
    carousel.style.animationPlayState = "paused";
  });

  wrapper.addEventListener("mouseleave", () => {
    carousel.style.animationPlayState = "running";
  });

  // Touch support for mobile
  wrapper.addEventListener("touchstart", () => {
    carousel.style.animationPlayState = "paused";
  });

  wrapper.addEventListener("touchend", () => {
    carousel.style.animationPlayState = "running";
  });
});
