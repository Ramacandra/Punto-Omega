// ETAPA 3.3: Sistema de Blog - Reflexiones Omega

// Filtrado de artículos por categoría
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.dataset.category;

      // Actualizar botones activos
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filtrar artículos
      blogCards.forEach(card => {
        const cardCategory = card.dataset.category;

        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

// Suscripción al newsletter
function handleNewsletterSubscribe(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const email = formData.get('email');

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.textContent = 'Suscribiendo...';
  submitBtn.disabled = true;

  setTimeout(() => {
    // En producción: integrar con MailChimp, ConvertKit, etc.
    // fetch('/api/newsletter-subscribe', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email })
    // });

    showNotification(`✅ ¡Gracias! Te has suscrito a Reflexiones Omega. Revisa ${email} para confirmar.`, 'success');

    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Guardar en localStorage
    localStorage.setItem('punto_omega_newsletter_subscribed', 'true');
    localStorage.setItem('punto_omega_newsletter_email', email);
  }, 1200);
}

// Exportar funciones globales
window.handleNewsletterSubscribe = handleNewsletterSubscribe;
