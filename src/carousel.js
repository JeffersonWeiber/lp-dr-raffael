/**
 * Lógica funcional para múltiplos carrosséis (Página de Depoimentos e Home)
 */

function initCarousel(containerId, prevSelector, nextSelector, dotsId) {
  const container = document.getElementById(containerId);
  const prevBtn = document.querySelector(prevSelector);
  const nextBtn = document.querySelector(nextSelector);
  const dotsContainer = document.getElementById(dotsId);

  if (!container || !prevBtn || !nextBtn) return;

  // Limpa dots existentes se houver
  if (dotsContainer) dotsContainer.innerHTML = '';

  const updateCarousel = () => {
    const cards = container.querySelectorAll('.testimonial-card-carousel');
    if (cards.length === 0) return;

    // Recria dots se necessário
    if (dotsContainer && dotsContainer.innerHTML === '') {
      cards.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (idx === 0 ? ' active' : '');
        dot.addEventListener('click', () => {
          container.scrollTo({
            left: cards[idx].offsetLeft - container.offsetLeft,
            behavior: 'smooth'
          });
        });
        dotsContainer.appendChild(dot);
      });
    }

    // Botões
    nextBtn.onclick = () => {
      container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
    };

    prevBtn.onclick = () => {
      container.scrollBy({ left: -container.offsetWidth, behavior: 'smooth' });
    };

    // Scroll listener para dots
    container.onscroll = () => {
      const scrollPos = container.scrollLeft;
      const cardWidth = cards[0].offsetWidth + 16;
      const activeIdx = Math.round(scrollPos / cardWidth);
      
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.dot').forEach((dot, idx) => {
          dot.classList.toggle('active', idx === activeIdx);
        });
      }
    };
  };

  // Inicializa imediatamente
  updateCarousel();

  // Re-inicializa se reviews forem carregados dinamicamente
  window.addEventListener('reviewsLoaded', (e) => {
    if (e.detail.containerId === containerId) {
      setTimeout(updateCarousel, 100);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa carrossel da página de depoimentos (se existir)
  initCarousel('testimonials-carousel', '.carousel-btn.prev', '.carousel-btn.next', 'carousel-dots');
  
  // Inicializa carrossel da home (se existir)
  initCarousel('google-reviews-home', '#google-prev-home', '#google-next-home', 'google-dots-home');
});
