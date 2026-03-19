export function renderSlides(track, slides) {
  track.innerHTML = slides
    .map(
      (slide) => `
      <div class="testimonial-slide shrink-0 w-full flex items-stretch">
        <div class="testimonial-card-blue">
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
