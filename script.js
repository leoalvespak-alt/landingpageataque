// ===== FUNCIONALIDADES PRINCIPAIS =====

// Função para scroll suave para seções
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== ANIMAÇÕES DE ENTRADA =====

// Intersection Observer para animações quando elementos entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// ===== EFEITOS DE HOVER AVANÇADOS =====

// Efeito de brilho nos botões CTA
function addButtonEffects() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efeito de click
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
}

// ===== CONTADOR DE TEMPO LIMITADO =====

// Simula uma contagem regressiva para criar urgência
function createUrgencyTimer() {
    const timerElements = document.querySelectorAll('.timer-display');
    
    // Define um tempo de 24 horas a partir de agora
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            timerElements.forEach(element => {
                element.textContent = timeString;
            });
        } else {
            timerElements.forEach(element => {
                element.textContent = 'OFERTA ENCERRADA';
            });
        }
    }
    
    // Atualiza a cada segundo
    setInterval(updateTimer, 1000);
    updateTimer(); // Primeira execução
}

// ===== EFEITOS DE PARALLAX SUTIL =====

function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        const guaranteeSeal = document.querySelector('.guarantee-seal');
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        if (guaranteeSeal) {
            guaranteeSeal.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
}

// ===== ANIMAÇÃO DE CONTADORES =====

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// ===== EFEITO DE DIGITAÇÃO NO HERO =====

function typewriterEffect() {
    const headline = document.querySelector('.hero-headline');
    if (!headline) return;
    
    const text = headline.innerHTML;
    headline.innerHTML = '';
    headline.style.borderRight = '2px solid #c1121f';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            headline.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            headline.style.borderRight = 'none';
        }
    }, 50);
}

// ===== VALIDAÇÃO DE FORMULÁRIO (se houver) =====

function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]');
            const name = form.querySelector('input[type="text"]');
            
            let isValid = true;
            
            // Validação básica
            if (email && !isValidEmail(email.value)) {
                showError(email, 'Por favor, insira um email válido');
                isValid = false;
            }
            
            if (name && name.value.trim().length < 2) {
                showError(name, 'Por favor, insira um nome válido');
                isValid = false;
            }
            
            if (isValid) {
                // Aqui você adicionaria a lógica para enviar o formulário
                showSuccess('Formulário enviado com sucesso!');
            }
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#c1121f';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    
    // Remove mensagem de erro anterior
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#c1121f';
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        font-family: var(--font-text);
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// ===== SMOOTH SCROLLING PARA LINKS INTERNOS =====

function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== LAZY LOADING PARA IMAGENS =====

function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== EFEITO DE FADE IN PARA SEÇÕES =====

function setupFadeInAnimations() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
}

// ===== TRACKING DE EVENTOS (Analytics) =====

function trackEvent(eventName, eventData = {}) {
    // Aqui você pode integrar com Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', eventName, eventData);
    
    // Exemplo para Google Analytics (gtag)
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Exemplo para Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
}

// ===== SETUP DE TRACKING PARA BOTÕES CTA =====

function setupCTATracking() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const sectionName = this.closest('section').id || 'unknown';
            
            trackEvent('cta_click', {
                button_text: buttonText,
                section: sectionName,
                button_position: index + 1
            });
        });
    });
}

// ===== DETECÇÃO DE SCROLL PARA ANALYTICS =====

function setupScrollTracking() {
    let scrollMilestones = [25, 50, 75, 90];
    let trackedMilestones = [];
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        scrollMilestones.forEach(milestone => {
            if (scrollPercent >= milestone && !trackedMilestones.includes(milestone)) {
                trackedMilestones.push(milestone);
                trackEvent('scroll_depth', {
                    percentage: milestone
                });
            }
        });
    });
}

// ===== PERFORMANCE OPTIMIZATION =====

// Debounce function para otimizar eventos que disparam frequentemente
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== INICIALIZAÇÃO =====

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades
    console.log('🚀 Rota de Ataque - Landing Page carregada!');
    
    // Funcionalidades básicas
    addButtonEffects();
    setupSmoothScrolling();
    setupFormValidation();
    setupLazyLoading();
    
    // Animações
    setupFadeInAnimations();
    
    // Analytics e tracking
    setupCTATracking();
    setupScrollTracking();
    
    // Efeitos especiais (opcional - pode ser removido se causar problemas de performance)
    if (window.innerWidth > 768) {
        addParallaxEffect();
    }
    
    // Timer de urgência (opcional)
    // createUrgencyTimer();
    
    // Efeito de digitação (opcional - comentado por padrão)
    // setTimeout(typewriterEffect, 1000);
    
    console.log('✅ Todas as funcionalidades foram inicializadas com sucesso!');
});

// ===== TRATAMENTO DE ERROS GLOBAIS =====

window.addEventListener('error', function(e) {
    console.error('Erro detectado:', e.error);
    // Aqui você pode enviar erros para um serviço de monitoramento
});

// ===== OTIMIZAÇÕES DE PERFORMANCE =====

// Preload de recursos críticos
function preloadCriticalResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Teko:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(registrationError) {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}
