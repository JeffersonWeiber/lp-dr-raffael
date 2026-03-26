/**
 * Script para carregar avaliações do Google Meu Negócio usando o Google Maps JS SDK
 * Suporta múltiplos containers (Home e Página de Depoimentos)
 */

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const GOOGLE_PLACE_ID =
  import.meta.env.VITE_GOOGLE_PLACE_ID || "ChIJ3-QEbBHV85QRsaacwNcB2xY";

function loadGoogleMapsScript() {
  if (window.google?.maps?.places) return Promise.resolve();

  if (!GOOGLE_MAPS_API_KEY) {
    return Promise.reject(
      new Error("VITE_GOOGLE_MAPS_API_KEY não configurada.")
    );
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById("google-maps-sdk");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", () =>
        reject(new Error("Falha ao carregar Google Maps SDK."))
      );
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-sdk";
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      GOOGLE_MAPS_API_KEY
    )}&libraries=places`;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Falha ao carregar Google Maps SDK."));

    document.head.appendChild(script);
  });
}

async function initReviews() {
  // Inicializa em todos os containers de review do Google
  const containers = [
    document.getElementById('google-reviews-dynamic'), // Depoimentos.html
    document.getElementById('google-reviews-home')    // Index.html
  ];

  try {
    await loadGoogleMapsScript();
  } catch (error) {
    console.error("Erro ao inicializar Google Maps:", error);
    containers.forEach((container) => {
      if (container)
        container.innerHTML =
          '<p class="text-center text-red-500">Não foi possível carregar as avaliações no momento.</p>';
    });
    return;
  }

  const mapElement = document.createElement('div');
  const service = new google.maps.places.PlacesService(mapElement);

  const request = {
    placeId: GOOGLE_PLACE_ID,
    fields: ['reviews', 'name', 'rating']
  };

  service.getDetails(request, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
      containers.forEach(container => {
        if (container) renderReviews(place.reviews, container);
      });
    } else {
      console.error('Erro no Google Places:', status);
      containers.forEach(container => {
        if (container) container.innerHTML = '<p class="text-center text-red-500">Não foi possível carregar as avaliações no momento.</p>';
      });
    }
  });
}

function renderReviews(reviews, container) {
  if (!reviews || reviews.length === 0) {
    container.innerHTML = `
      <div class="no-reviews-box" style="grid-column: 1/-1; text-align: center; padding: 2rem;">
        <p style="color: #8c94a5; font-style: italic; margin-bottom: 1rem;">Ainda não há avaliações públicas recentes no Google.</p>
        <a href="https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}" target="_blank" class="btn-primary" style="font-size: 0.9rem; padding: 0.8rem 1.5rem;">
          Seja o primeiro a avaliar
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = '';

  reviews.forEach(review => {
    const rating = Math.round(review.rating);
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    const reviewText = (review.text || '').trim();
    
    const card = document.createElement('article');
    card.classList.add('testimonial-card-carousel', 'google-review-card');
    
    // Se for na home, talvez queiramos uma classe adicional ou específica
    if (container.id === 'google-reviews-home') {
      card.classList.add('home-review-card');
    }

    card.innerHTML = `
      <div class="testimonial-stars" style="color: #fab005;">${stars}</div>
      <div class="google-author">
        <img src="${review.profile_photo_url}" alt="${review.author_name}" class="author-avatar" loading="lazy" referrerpolicy="no-referrer" />
        <div class="author-info">
          <strong>${review.author_name}</strong>
          <span class="review-date">${review.relative_time_description}</span>
        </div>
      </div>
      <div class="google-review-body">
        <p class="testimonial-text google-review-text">"${reviewText}"</p>
      </div>
      <button class="google-review-more">Ver mais</button>
      <div class="google-badge-small">
        <svg viewBox="0 0 24 24" style="width: 14px; height: 14px;" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Via Google Reviews
      </div>
    `;
    container.appendChild(card);

    const needsCollapse = reviewText.length > 180;
    const moreButton = card.querySelector('.google-review-more');
    if (needsCollapse && moreButton) {
      card.classList.add('has-google-collapse');
      moreButton.setAttribute('aria-expanded', 'false');
      moreButton.addEventListener('click', () => {
        const expanded = card.classList.toggle('google-expanded');
        moreButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        moreButton.textContent = expanded ? 'Ver menos' : 'Ver mais';
      });
    } else if (moreButton) {
      moreButton.remove();
    }
  });

  // Notifica o sistema de carrossel se necessário
  window.dispatchEvent(new CustomEvent('reviewsLoaded', { detail: { containerId: container.id } }));
}

window.addEventListener('load', () => {
  setTimeout(initReviews, 500);
});
