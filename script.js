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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Add scroll animations to elements
document.addEventListener('DOMContentLoaded', function() {
    // Elements to animate on scroll
    const elementsToAnimate = document.querySelectorAll('.slide-in, .slide-in-left, .slide-in-right, .slide-in-up, .fade-in, .fade-in-delay, .fade-in-delay-2');
    
    elementsToAnimate.forEach(element => {
        // Remove initial animation classes
        element.classList.remove('slide-in', 'slide-in-left', 'slide-in-right', 'slide-in-up', 'fade-in', 'fade-in-delay', 'fade-in-delay-2');
        
        // Add data attributes to track original animation
        if (element.classList.contains('slide-in-left')) {
            element.dataset.animation = 'slide-in-left';
        } else if (element.classList.contains('slide-in-right')) {
            element.dataset.animation = 'slide-in-right';
        } else if (element.classList.contains('slide-in-up')) {
            element.dataset.animation = 'slide-in-up';
        } else if (element.classList.contains('fade-in-delay')) {
            element.dataset.animation = 'fade-in-delay';
        } else if (element.classList.contains('fade-in-delay-2')) {
            element.dataset.animation = 'fade-in-delay-2';
        } else if (element.classList.contains('fade-in')) {
            element.dataset.animation = 'fade-in';
        } else {
            element.dataset.animation = 'slide-in';
        }
        
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = getInitialTransform(element.dataset.animation);
        
        // Observe the element
        observer.observe(element);
    });
    
    // Hero elements start animated
    const heroElements = document.querySelectorAll('.hero .fade-in, .hero .fade-in-delay');
    heroElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
});

// Helper function to get initial transform based on animation type
function getInitialTransform(animationType) {
    switch(animationType) {
        case 'slide-in-left':
            return 'translateX(-50px)';
        case 'slide-in-right':
            return 'translateX(50px)';
        case 'slide-in-up':
            return 'translateY(50px)';
        case 'fade-in':
        case 'fade-in-delay':
        case 'fade-in-delay-2':
        case 'slide-in':
        default:
            return 'translateY(30px)';
    }
}

// Enhanced intersection observer callback
const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const animationType = element.dataset.animation;
            
            // Apply the animation
            element.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0) translateY(0)';
            
            // Add staggered animation for service cards and testimonials
            if (element.classList.contains('service-card') || element.classList.contains('testimonial-card')) {
                const siblings = Array.from(element.parentElement.children);
                const index = siblings.indexOf(element);
                element.style.transitionDelay = `${index * 0.2}s`;
            }
            
            // Stop observing this element
            enhancedObserver.unobserve(element);
        }
    });
}, observerOptions);

// Re-observe elements with enhanced observer
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure DOM is fully loaded
    setTimeout(() => {
        const elementsToAnimate = document.querySelectorAll('[data-animation]');
        elementsToAnimate.forEach(element => {
            enhancedObserver.observe(element);
        });
    }, 100);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Testimonial card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Mobile menu toggle (if needed)
document.addEventListener('DOMContentLoaded', function() {
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

// Mobile Hamburger Menu Functionality
(function() {
    const hamburger = document.getElementById('nav-hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (!hamburger || !navMenu) return;

    // Toggle menu function
    function toggleMenu(forceState) {
        console.log('toggleMenu');
        const isOpen = navMenu.classList.contains('active');
        const shouldOpen = forceState !== undefined ? forceState : !isOpen;
        if (shouldOpen) {
            navMenu.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            hamburger.setAttribute('aria-label', 'Close navigation menu');
        } else {
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation menu');
        }
    }

    // Click/touch event
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    hamburger.addEventListener('touchstart', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Keyboard accessibility
    hamburger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close menu when clicking a nav link (mobile only)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 980) {
                toggleMenu(false);
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 980) return;
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            console.log('clicked outside');
            toggleMenu(false);
        }
    });

    // Responsive: close menu if resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 980) {
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation menu');
        }
    });
})();

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Preload images for better performance
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const imageUrl = img.src;
        const imageLoader = new Image();
        imageLoader.src = imageUrl;
    });
});