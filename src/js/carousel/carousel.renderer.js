export function renderSlides(track, slides) {
  track.innerHTML = slides
    .map(
      (slide) => `
      <div class="testimonial-slide shrink-0 w-full md:w-[33.333%] flex items-stretch mr-10">
        <div class="testimonial-card">
          <div class="testimonial-stars" aria-label="Avaliação 5 estrelas">${renderStars(
            slide.rating
          )}</div>
          <p class="testimonial-text">"${slide.text}"</p>
        </div>
      </div>
    `
    )
    .join("");
}

function renderStars(rating) {
  return Array.from({ length: rating })
    .map(() => "★")
    .join("");
}
