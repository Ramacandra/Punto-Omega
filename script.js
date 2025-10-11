// ETAPA 2.3 y 2.4: Formulario de suscripción y entrega del Manifiesto
function handleSubscribe(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    email: formData.get('email')
  };

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Cambiar estado del botón
  submitBtn.textContent = 'ENVIANDO...';
  submitBtn.disabled = true;

  // Simular envío y entrega automática del PDF
  setTimeout(() => {
    // Aquí iría la integración con servicio de email (ej: MailChimp, SendGrid, EmailJS)
    // fetch('/api/subscribe', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     ...data,
    //     sendManifesto: true,
    //     manifestoUrl: '/assets/manifiesto-geminis.pdf'
    //   })
    // });

    // Mostrar mensaje de éxito
    showNotification(`🎉 ¡Bienvenido a la comunidad, ${data.name}! Revisa ${data.email} - Tu Manifiesto de Géminis + acceso anticipado están en camino.`, 'success');

    // Resetear formulario
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Opcional: Guardar suscripción en localStorage
    localStorage.setItem('punto_omega_subscribed', 'true');
    localStorage.setItem('punto_omega_subscriber_email', data.email);

  }, 1500);
}

// Funcionalidad del formulario de contacto
function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  };

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.textContent = 'Enviando...';
  submitBtn.disabled = true;

  setTimeout(() => {
    showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');

    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Estilos inline para la notificación
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '12px 20px',
    borderRadius: '8px',
    color: '#0A0A0C',
    fontWeight: '600',
    zIndex: '1000',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    maxWidth: '300px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
  });
  
  // Colores según el tipo
  if (type === 'success') {
    notification.style.background = '#F5C86D';
  } else if (type === 'error') {
    notification.style.background = '#ff6b6b';
  } else {
    notification.style.background = '#DFAF48';
  }
  
  // Añadir al DOM
  document.body.appendChild(notification);
  
  // Animar entrada
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remover después de 4 segundos
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Navegación suave mejorada
document.addEventListener('DOMContentLoaded', function() {
  // Añadir smooth scroll a todos los enlaces internos
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Efecto parallax desactivado
  // const heroImage = document.querySelector('.card div[style*="background-image"]');
  // if (heroImage) {
  //   window.addEventListener('scroll', () => {
  //     const scrolled = window.pageYOffset;
  //     const parallax = scrolled * 0.5;
  //     heroImage.style.transform = `translateY(${parallax}px)`;
  //   });
  // }
  
  // Animación de entrada para elementos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observar tarjetas y secciones (excepto la imagen del hero)
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    // No animar el card que contiene la imagen del hero
    const hasHeroImage = card.querySelector('div[style*="background-image"]');
    if (!hasHeroImage) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    }
  });
});

// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav ul a');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');

      // Animar las barras del menú
      const spans = this.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
      if (!event.target.closest('nav')) {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
});

// Validación de formulario en tiempo real
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearValidation);
    });
  }
});

function validateField(event) {
  const field = event.target;
  const value = field.value.trim();
  
  // Remover clases de validación previas
  field.classList.remove('valid', 'invalid');
  
  if (field.hasAttribute('required') && !value) {
    field.classList.add('invalid');
    return false;
  }
  
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      field.classList.add('invalid');
      return false;
    }
  }
  
  if (value) {
    field.classList.add('valid');
  }
  
  return true;
}

function clearValidation(event) {
  const field = event.target;
  field.classList.remove('invalid');
}

// Exportar funciones para uso global
window.handleSubscribe = handleSubscribe;
window.handleSubmit = handleSubmit;
window.showNotification = showNotification;
