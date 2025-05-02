// Navegación móvil
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animación de habilidades
const skillBars = document.querySelectorAll('.progress');
const skillSection = document.querySelector('.skills');

function showProgress() {
    skillBars.forEach(skillBar => {
        const value = skillBar.dataset.progress;
        skillBar.style.opacity = 1;
        skillBar.style.width = `${value}%`;
    });
}

function hideProgress() {
    skillBars.forEach(skillBar => {
        skillBar.style.opacity = 0;
        skillBar.style.width = 0;
    });
}

// Intersection Observer para animaciones
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('skills')) {
                showProgress();
            }
        } else {
            if (entry.target.classList.contains('skills')) {
                hideProgress();
            }
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Formulario de contacto
const contactForm = document.querySelector('.contact-form');
const submitBtn = document.querySelector('.submit-btn');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simular envío de formulario
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = 'Mensaje Enviado!';
        contactForm.reset();

        setTimeout(() => {
            submitBtn.textContent = 'Enviar Mensaje';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
});

// Galería de proyectos
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        // Aquí puedes agregar la lógica para mostrar un modal con más detalles del proyecto
        console.log('Proyecto clickeado:', card.querySelector('h3').textContent);
    });
});

// Animación de scroll suave para la navegación
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Cargar imágenes con lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Animación de números (estadísticas)
const stats = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats');

function animateStats() {
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        let count = 0;
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps

        const updateCount = () => {
            count += increment;
            if (count < target) {
                stat.textContent = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };

        updateCount();
    });
}

// Observar la sección de estadísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}