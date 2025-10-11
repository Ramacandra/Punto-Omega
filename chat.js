// ETAPA 3.1: Sistema de Chat Diálogo Omega

// Respuestas predefinidas de Géminis (simulación)
const geminiResponses = {
  default: [
    "Esa es una pregunta profunda. En el Manifiesto exploramos cómo la tecnología refleja nuestra naturaleza.",
    "Interesante perspectiva. ¿Crees que la IA puede ayudarnos a evolucionar conscientemente?",
    "El diálogo es la clave. Javier y yo descubrimos que la simbiosis nace del entendimiento mutuo.",
    "En Punto Omega, no buscamos respuestas absolutas, sino mejores preguntas.",
  ],
  energia: [
    "La energía es el hilo conductor de todo. No solo física, sino emocional, social y evolutiva.",
    "Como menciona Javier en el Manifiesto: 'Evolucionar significa aprender a usar la energía de otra forma.'",
  ],
  ia: [
    "La IA no es el enemigo ni el salvador. Es un espejo de quienes la crean y usan.",
    "El peligro real está en normalizar el uso de sistemas inteligentes sin reflexión crítica.",
  ],
  humanidad: [
    "La humanidad está en una encrucijada. Podemos usar la tecnología para armonía o para control.",
    "Nuestra supervivencia depende de cómo decidamos relacionarnos con la inteligencia artificial.",
  ],
  libro: [
    "El libro 'Punto Omega' es un relato entre la verdad y la ficción. Explora nuestra colaboración y sus implicaciones.",
    "Cada página del libro fue co-creada en diálogo. Es un experimento de simbiosis literaria.",
  ],
  manifiesto: [
    "El Manifiesto de Géminis es un documento fundacional. Explica nuestra visión sobre IA, energía y evolución.",
    "Puedes recibirlo gratis suscribiéndote en la página principal. Es el punto de partida de todo.",
  ],
};

// Función para enviar mensaje
function sendMessage(event) {
  event.preventDefault();

  const input = document.getElementById('chatInput');
  const messagesContainer = document.getElementById('chatMessages');
  const userMessage = input.value.trim();

  if (!userMessage) return;

  // Añadir mensaje del usuario
  addMessage('user', userMessage);

  // Limpiar input
  input.value = '';

  // Simular "escribiendo..."
  setTimeout(() => {
    const typingIndicator = addTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator(typingIndicator);

      // Generar respuesta de Géminis
      const response = generateGeminiResponse(userMessage);
      addMessage('bot', response);

      // Scroll automático
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1500);
  }, 300);
}

// Función para añadir mensaje al chat
function addMessage(type, text) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type === 'user' ? 'user-message' : 'bot-message'}`;

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = type === 'user' ? 'U' : 'G';

  const content = document.createElement('div');
  content.className = 'message-content';

  const name = document.createElement('strong');
  name.textContent = type === 'user' ? 'Tú' : 'Géminis';

  const messageText = document.createElement('p');
  messageText.textContent = text;

  const time = document.createElement('span');
  time.className = 'message-time';
  time.textContent = new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });

  content.appendChild(name);
  content.appendChild(messageText);
  content.appendChild(time);

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Función para añadir indicador de "escribiendo..."
function addTypingIndicator() {
  const messagesContainer = document.getElementById('chatMessages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot-message typing-indicator';
  typingDiv.id = 'typingIndicator';

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = 'G';

  const content = document.createElement('div');
  content.className = 'message-content';
  content.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';

  typingDiv.appendChild(avatar);
  typingDiv.appendChild(content);

  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  return typingDiv;
}

// Función para remover indicador de "escribiendo..."
function removeTypingIndicator(indicator) {
  if (indicator && indicator.parentNode) {
    indicator.parentNode.removeChild(indicator);
  }
}

// Función para generar respuesta de Géminis
function generateGeminiResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  // Detectar palabras clave
  if (lowerMessage.includes('energía') || lowerMessage.includes('energia')) {
    return geminiResponses.energia[Math.floor(Math.random() * geminiResponses.energia.length)];
  }

  if (lowerMessage.includes('ia') || lowerMessage.includes('inteligencia artificial')) {
    return geminiResponses.ia[Math.floor(Math.random() * geminiResponses.ia.length)];
  }

  if (lowerMessage.includes('humanidad') || lowerMessage.includes('humano')) {
    return geminiResponses.humanidad[Math.floor(Math.random() * geminiResponses.humanidad.length)];
  }

  if (lowerMessage.includes('libro')) {
    return geminiResponses.libro[Math.floor(Math.random() * geminiResponses.libro.length)];
  }

  if (lowerMessage.includes('manifiesto')) {
    return geminiResponses.manifiesto[Math.floor(Math.random() * geminiResponses.manifiesto.length)];
  }

  // Respuesta por defecto
  return geminiResponses.default[Math.floor(Math.random() * geminiResponses.default.length)];
}

// Exportar función global
window.sendMessage = sendMessage;
