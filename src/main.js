import { initCarousel } from "./js/carousel/carousel";
import { testimonials } from "./js/carousel/carousel.data";
import { renderSlides } from "./js/carousel/carousel.renderer";
import { initAOS } from "./js/aos";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("article").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel]");
    if (!track) return;

    renderSlides(track, testimonials);
    initCarousel(carousel, testimonials);
  });
  initAOS();

  // Cookie Consent Logic
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptButton = document.getElementById("accept-cookies");

  if (cookieBanner && acceptButton) {
    if (!localStorage.getItem("cookiesAccepted")) {
      setTimeout(() => {
        cookieBanner.classList.add("show");
      }, 1000);
    }

    acceptButton.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      cookieBanner.classList.remove("show");
    });
  }
});
