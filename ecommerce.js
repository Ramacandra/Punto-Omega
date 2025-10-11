// ETAPA 3.2: Sistema de E-Commerce para El Libro

const prices = {
  digital: '$19.99 USD',
  impreso: '$34.99 USD',
  premium: '$49.99 USD'
};

// Funcionalidad de selección de formato
document.addEventListener('DOMContentLoaded', function() {
  const formatOptions = document.querySelectorAll('.format-option');

  formatOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remover selección previa
      formatOptions.forEach(opt => opt.classList.remove('selected'));

      // Seleccionar nueva opción
      this.classList.add('selected');

      // Marcar radio button
      const radio = this.querySelector('input[type="radio"]');
      radio.checked = true;

      // Actualizar precio
      const format = this.dataset.format;
      updatePrice(format);
    });
  });
});

// Actualizar precio según formato
function updatePrice(format) {
  const priceElement = document.getElementById('productPrice');
  if (priceElement && prices[format]) {
    priceElement.textContent = prices[format];

    // Animación de cambio de precio
    priceElement.style.transform = 'scale(1.1)';
    priceElement.style.color = 'var(--accent-hover)';

    setTimeout(() => {
      priceElement.style.transform = 'scale(1)';
      priceElement.style.color = 'var(--accent)';
    }, 300);
  }
}

// Función de compra
function handlePurchase() {
  const selectedFormat = document.querySelector('.format-option.selected');

  if (!selectedFormat) {
    showNotification('Por favor, selecciona un formato antes de comprar.', 'error');
    return;
  }

  const format = selectedFormat.dataset.format;
  const formatName = selectedFormat.querySelector('strong').textContent;
  const price = prices[format];

  // Mostrar notificación de procesamiento
  showNotification('🔄 Redirigiendo al proceso de pago seguro...', 'info');

  // Simular redirección a pasarela de pago
  setTimeout(() => {
    // En producción, aquí iría la integración con Stripe, PayPal, etc.
    // window.location.href = '/checkout?format=' + format;

    // O iniciar checkout de Stripe:
    // stripe.redirectToCheckout({
    //   lineItems: [{price: PRICE_ID, quantity: 1}],
    //   mode: 'payment',
    //   successUrl: window.location.origin + '/success',
    //   cancelUrl: window.location.origin + '/el-libro.html',
    // });

    showNotification(
      `✅ ¡Gracias por tu interés en ${formatName}! La pasarela de pago se abrirá pronto. (Función en desarrollo)`,
      'success'
    );

    // Guardar intento de compra en analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'begin_checkout', {
        currency: 'USD',
        value: parseFloat(price.replace('$', '').replace(' USD', '')),
        items: [{
          item_name: 'Punto Omega: El Libro',
          item_variant: format,
          price: parseFloat(price.replace('$', '').replace(' USD', '')),
          quantity: 1
        }]
      });
    }
  }, 1000);
}

// Exportar funciones globales
window.handlePurchase = handlePurchase;
window.updatePrice = updatePrice;
