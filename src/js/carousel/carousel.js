export function initCarousel(container, slides) {
  const track = container.querySelector("[data-carousel]");
  const prevBtn = container.querySelector(".carousel-prev");
  const nextBtn = container.querySelector(".carousel-next");

  let index = 0;
  let intervalId;

  const visibleDesktop = Number(track.dataset.visibleDesktop || 4);
  const visibleMobile = Number(track.dataset.visibleMobile || 1);

  function getVisible() {
    return window.innerWidth < 768 ? visibleMobile : visibleDesktop;
  }

  function update() {
    const slideWidth = track.children[0].offsetWidth;
    const gap = 40;
    track.style.transform = `translateX(-${index * (slideWidth + gap)}px)`;
  }

  function next() {
    const visible = getVisible();
    index = index >= track.children.length - visible ? 0 : index + 1;
    update();
  }

  function prev() {
    const visible = getVisible();
    index = index <= 0 ? track.children.length - visible : index - 1;
    update();
  }

  function start() {
    stop();
    intervalId = setInterval(next, 5000);
  }

  function stop() {
    if (intervalId) clearInterval(intervalId);
  }

  prevBtn?.addEventListener("click", () => {
    prev();
    start();
  });

  nextBtn?.addEventListener("click", () => {
    next();
    start();
  });

  container.addEventListener("mouseenter", stop);
  container.addEventListener("mouseleave", start);

  window.addEventListener("resize", () => {
    index = 0;
    update();
  });

  update();
  start();
}
