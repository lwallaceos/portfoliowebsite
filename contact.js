document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !message) {
        e.preventDefault();
        alert("Please fill in all required fields.");
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        return;
      }

      contactForm.addEventListener("formspree", function (event) {
        if (event.detail.success) {
          alert("Thank you for your message! I'll get back to you soon.");
          contactForm.reset();
        } else {
          alert(
            "There was an error sending your message. Please try again later.",
          );
        }
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      });
    });
  }
});
