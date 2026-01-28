// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }
});

// Typing Animation
const typedText = document.getElementById('typedText');
if (typedText) {
    const texts = ['Senior Technical Writer', 'Documentation Expert', 'Content Strategist', 'AI Writing Specialist'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Animated Statistics Counter
const animateCounter = (element, target, duration = 2000) => {
    let startTime = null;
    const startValue = 0;
    
    const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const currentValue = Math.floor(progress * target);
        element.textContent = currentValue + (target >= 100 ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = target + '+';
        }
    };
    
    requestAnimationFrame(animate);
};

// Statistics Observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.statistics');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Active nav link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Fade in animation for elements on scroll using Intersection Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-bar-item')) {
                const fillBar = entry.target.querySelector('.skill-bar-fill');
                if (fillBar) {
                    const percentage = fillBar.getAttribute('data-percentage');
                    fillBar.style.setProperty('--bar-width', percentage + '%');
                }
            }
        }
    });
}, observerOptions);

// Observe all fade-in sections and skill bars
document.querySelectorAll('.fade-in-section, .skill-bar-item').forEach(el => {
    observer.observe(el);
});

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show success message (in a real application, you would send this to a server)
        formStatus.textContent = 'Thank you for your message! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
        
        // Log form data (for demonstration - remove in production)
        console.log('Form submitted:', formData);
    });
}

// Toggle Category for Tools Section
function toggleCategory(header) {
    const wrapper = header.parentElement;
    const content = wrapper.querySelector('.category-content');
    const expandIcon = header.querySelector('.expand-icon');
    
    // Toggle active class
    wrapper.classList.toggle('active');
    
    // Toggle content visibility
    if (wrapper.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
        expandIcon.style.transform = 'rotate(180deg)';
    } else {
        content.style.maxHeight = '0';
        expandIcon.style.transform = 'rotate(0deg)';
    }
}

// Initialize first category as open
document.addEventListener('DOMContentLoaded', () => {
    const firstCategory = document.querySelector('.tool-category-wrapper');
    if (firstCategory) {
        const firstHeader = firstCategory.querySelector('.category-header');
        if (firstHeader) {
            toggleCategory(firstHeader);
        }
    }
});
