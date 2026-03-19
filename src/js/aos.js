import AOS from "aos";
import "aos/dist/aos.css";

export function initAOS() {
  AOS.init({
    once: true,
    duration: 800,
    offset: 120,
  });
}
