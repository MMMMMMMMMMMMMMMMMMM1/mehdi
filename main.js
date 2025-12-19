// ========================================
// Utility Functions
// ========================================

/**
 * Sanitize HTML to prevent XSS attacks
 */
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

/**
 * Debounce function for performance optimization
 */
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

// ========================================
// Navigation
// ========================================

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        // Scroll event for navbar
        window.addEventListener('scroll', debounce(() => {
            this.handleScroll();
        }, 10));

        // Hamburger menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMenu();
            });
        }

        // Navigation link clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleLinkClick(e, link);
            });
        });

        // Update active link on scroll
        window.addEventListener('scroll', debounce(() => {
            this.updateActiveLink();
        }, 100));

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.navMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleLinkClick(e, link) {
        const href = link.getAttribute('href');

        // Only handle internal links
        if (href.startsWith('#')) {
            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Close mobile menu
                this.closeMenu();

                // Scroll to target
                const navbarHeight = this.navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active state
                this.setActiveLink(link);
            }
        }
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + this.navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    this.setActiveLink(activeLink);
                }
            }
        });
    }

    setActiveLink(activeLink) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
}

// ========================================
// Scroll Animations
// ========================================

class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.card-animate');
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.init();
    }

    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally unobserve after animation
                    // this.observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe all animated elements
        this.animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// ========================================
// Smooth Scroll
// ========================================

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Handle all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const navbar = document.getElementById('navbar');
                        const navbarHeight = navbar ? navbar.offsetHeight : 0;
                        const targetPosition = target.offsetTop - navbarHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// ========================================
// Skill Tags Animation
// ========================================

class SkillTagsAnimation {
    constructor() {
        this.skillTags = document.querySelectorAll('.skill-tag');
        this.init();
    }

    init() {
        this.skillTags.forEach((tag, index) => {
            // Add stagger animation delay
            tag.style.animationDelay = `${index * 0.05}s`;
        });
    }
}

// ========================================
// CV Download Tracking
// ========================================

class CVDownload {
    constructor() {
        this.downloadButton = document.querySelector('a[download]');
        this.init();
    }

    init() {
        if (this.downloadButton) {
            this.downloadButton.addEventListener('click', () => {
                this.trackDownload();
            });
        }
    }

    trackDownload() {
        // Log download event (can be extended with analytics)
        console.log('CV downloaded:', new Date().toISOString());

        // Show confirmation message
        this.showDownloadConfirmation();
    }

    showDownloadConfirmation() {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            animation: slideInUp 0.3s ease;
        `;
        notification.textContent = 'CV téléchargé avec succès !';

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// ========================================
// Form Validation (if forms are added)
// ========================================

class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.submitForm();
            }
        });
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateInput(input) {
        const value = input.value.trim();

        // Remove existing error message
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Check if empty
        if (value === '') {
            this.showError(input, 'Ce champ est requis');
            return false;
        }

        // Email validation
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(input, 'Veuillez entrer une adresse email valide');
                return false;
            }
        }

        // Sanitize input
        input.value = sanitizeHTML(value);

        return true;
    }

    showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
        input.style.borderColor = '#ef4444';
    }

    submitForm() {
        // Handle form submission
        console.log('Form submitted successfully');
        // Add your form submission logic here
    }
}

// ========================================
// Performance Optimization
// ========================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();

        // Preload critical resources
        this.preloadCriticalResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    preloadCriticalResources() {
        // Preload CV PDF
        const cvLink = document.querySelector('a[href*="CV_Mehdi_EL-ALLAM"]');
        if (cvLink) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'document';
            preloadLink.href = cvLink.getAttribute('href');
            document.head.appendChild(preloadLink);
        }
    }
}

// ========================================
// Accessibility Enhancements
// ========================================

class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        // Add skip to main content link
        this.addSkipLink();

        // Enhance keyboard navigation
        this.enhanceKeyboardNav();

        // Add ARIA labels
        this.addAriaLabels();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#presentation';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Aller au contenu principal';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    enhanceKeyboardNav() {
        // Add focus visible styles
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    addAriaLabels() {
        // Ensure all interactive elements have proper ARIA labels
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (!button.getAttribute('aria-label')) {
                button.setAttribute('aria-label', button.textContent || 'Button');
            }
        });
    }
}

// ========================================
// Security Headers
// ========================================

class SecurityManager {
    constructor() {
        this.init();
    }

    init() {
        // Prevent XSS attacks
        this.preventXSS();

        // Validate external links
        this.secureExternalLinks();
    }

    preventXSS() {
        // Sanitize all user inputs (if any forms exist)
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const sanitized = sanitizeHTML(e.target.value);
                if (sanitized !== e.target.value) {
                    e.target.value = sanitized;
                }
            });
        });
    }

    secureExternalLinks() {
        // Add security attributes to external links
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            // Prevent tabnabbing
            if (!link.hasAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }
}

// ========================================
// Language Manager
// ========================================

class LanguageManager {
    constructor() {
        this.langToggle = document.getElementById('lang-toggle');
        this.currentLang = 'fr'; // French by default

        this.translations = {
            fr: {
                // Navigation
                'nav.home': 'Accueil',
                'nav.about': 'Présentation',
                'nav.cv': 'CV',
                'nav.projects': 'Réalisations',
                'nav.contact': 'Contact',

                // Hero
                'hero.greeting': 'Bonjour, je suis',
                'hero.subtitle': 'Étudiant en 2ème année de BUT Informatique',
                'hero.description': 'Passionné par le développement logiciel, les bases de données et les systèmes.',
                'hero.description2': 'Réserviste au 4ᵉ régiment de chasseurs alpins',
                'hero.years': 'Années d\'études',
                'hero.projects': 'Projets réalisés',
                'hero.languages': 'Langages maîtrisés',
                'hero.projects-btn': 'Mes projets',
                'hero.contact-btn': 'Me contacter',
                'hero.scroll': 'Découvrir mon parcours',

                // Sections
                'section.about': 'À propos de moi',
                'section.cv': 'Curriculum Vitae',
                'section.projects': 'Mes réalisations',
                'section.contact': 'Me contacter',
                'section.projects-subtitle': 'Découvrez mes projets académiques et personnels',
                'section.contact-subtitle': 'N\'hésitez pas à me contacter pour toute opportunité de stage ou collaboration',

                // Contact
                'contact.email': 'Email',
                'contact.location': 'Localisation',
                'contact.availability': 'Disponibilité',
                'contact.stage': 'Stage : 20 avril - 29 juin 2026 (10-12 semaines)',

                // CV
                'cv.download': 'Télécharger le CV',
                'cv.skills': 'Compétences techniques',
                'cv.formation': 'Formation',
                'cv.experience': 'Parcours professionnel & Militaire',
                'cv.interests': 'Centres d\'intérêt'
            },
            en: {
                // Navigation
                'nav.home': 'Home',
                'nav.about': 'About',
                'nav.cv': 'Resume',
                'nav.projects': 'Projects',
                'nav.contact': 'Contact',

                // Hero
                'hero.greeting': 'Hello, I\'m',
                'hero.subtitle': '2nd Year Computer Science Student',
                'hero.description': 'Passionate about software development, databases and systems.',
                'hero.description2': 'Reservist at the 4th Alpine Hunters Regiment',
                'hero.years': 'Years of study',
                'hero.projects': 'Completed projects',
                'hero.languages': 'Programming languages',
                'hero.projects-btn': 'My projects',
                'hero.contact-btn': 'Contact me',
                'hero.scroll': 'Discover my journey',

                // Sections
                'section.about': 'About Me',
                'section.cv': 'Resume',
                'section.projects': 'My Projects',
                'section.contact': 'Contact Me',
                'section.projects-subtitle': 'Discover my academic and personal projects',
                'section.contact-subtitle': 'Feel free to contact me for any internship or collaboration opportunity',

                // Contact
                'contact.email': 'Email',
                'contact.location': 'Location',
                'contact.availability': 'Availability',
                'contact.stage': 'Internship: April 20 - June 29, 2026 (10-12 weeks)',

                // CV
                'cv.download': 'Download Resume',
                'cv.skills': 'Technical Skills',
                'cv.formation': 'Education',
                'cv.experience': 'Professional & Military Background',
                'cv.interests': 'Interests'
            }
        };

        this.init();
    }

    init() {
        // Apply saved language
        this.setLanguage(this.currentLang, false);

        if (this.langToggle) {
            this.langToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'fr' ? 'en' : 'fr';
        this.setLanguage(newLang);
    }

    setLanguage(lang, save = true) {
        this.currentLang = lang;

        if (save) {
            localStorage.setItem('language', lang);
        }

        // Update button text
        const langText = this.langToggle?.querySelector('.lang-text');
        if (langText) {
            langText.textContent = lang === 'fr' ? 'EN' : 'FR';
        }

        // Update all translatable elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translations[lang][key];
            if (translation) {
                element.textContent = translation;
            }
        });
    }
}

// ========================================
// Snow Manager (Replaces Theme Manager)
// ========================================

class SnowManager {
    constructor() {
        this.snowToggle = document.getElementById('snow-toggle');
        this.snowEffect = null; // Will be linked to SnowEffect instance
        this.init();
    }

    init() {
        if (this.snowToggle) {
            this.snowToggle.addEventListener('click', () => {
                this.toggleSnow();
            });
        }
    }

    setSnowEffect(snowEffectInstance) {
        this.snowEffect = snowEffectInstance;
    }

    toggleSnow() {
        if (this.snowEffect) {
            const isSnowing = this.snowEffect.toggle();
            if (isSnowing) {
                this.snowToggle.classList.add('active');
                this.snowToggle.style.color = '#38bdf8'; // Active color
            } else {
                this.snowToggle.classList.remove('active');
                this.snowToggle.style.color = ''; // Reset color
            }
        }
    }
}

// ========================================
// Interactive Background (Canvas)
// ========================================

class WavePoint {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.baseY = y;
        this.baseZ = z;
        this.screenX = 0;
        this.screenY = 0;
        this.scale = 0;
        this.size = 0;
    }

    project(width, height, fov, viewDistance) {
        // Perspective projection
        const scale = fov / (viewDistance + this.z);
        this.scale = scale;
        this.screenX = width / 2 + (this.x * scale);
        this.screenY = height / 2 + (this.y * scale);
        this.size = scale * 3; // Base size multiplier
    }
}

class InteractiveBackground {
    constructor() {
        this.canvas = document.getElementById('stars-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.points = [];
        this.width = 0;
        this.height = 0;
        this.mouse = { x: 0, y: 0 };
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.rotationX = 0;
        this.rotationY = 0;

        // 3D Grid Configuration
        this.fov = 300;
        this.viewDistance = 400;
        this.gridSizeX = 50; // Number of points X
        this.gridSizeZ = 50; // Number of points Z
        this.spacing = 40;   // Space between points

        this.time = 0;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            // Normalize mouse position -1 to 1
            this.mouse.x = (e.clientX / this.width) * 2 - 1;
            this.mouse.y = (e.clientY / this.height) * 2 - 1;

            // Tilt effect target
            this.targetRotationY = this.mouse.x * 0.3; // Rotate around Y axis
            this.targetRotationX = this.mouse.y * 0.2; // Rotate around X axis
        });

        this.createGrid();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    createGrid() {
        this.points = [];
        const startX = -(this.gridSizeX * this.spacing) / 2;
        const startZ = 0; // Start slightly in front

        for (let z = 0; z < this.gridSizeZ; z++) {
            for (let x = 0; x < this.gridSizeX; x++) {
                const px = startX + x * this.spacing;
                const py = 100; // Floor level
                const pz = startZ + z * this.spacing;
                this.points.push(new WavePoint(px, py, pz));
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Smooth rotation
        this.rotationX += (this.targetRotationX - this.rotationX) * 0.05;
        this.rotationY += (this.targetRotationY - this.rotationY) * 0.05;

        this.time += 0.1;

        // Update and Draw Points
        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i];

            // Wave Math
            // Calculate distance from center for radial wave or simple linear wave
            const distance = Math.sqrt(p.x * p.x + p.z * p.z);

            // Complex wave function: Combination of sine waves
            const waveY = Math.sin(distance * 0.02 - this.time) * 30
                + Math.sin(p.x * 0.03 + this.time) * 20;

            // Apply rotation (Basic 3D rotation matrix simplified)
            // Rotate around Y
            let rx = p.x * Math.cos(this.rotationY) - p.z * Math.sin(this.rotationY);
            let rz = p.x * Math.sin(this.rotationY) + p.z * Math.cos(this.rotationY);

            // Rotate around X
            let ry = (p.baseY + waveY) * Math.cos(this.rotationX) - rz * Math.sin(this.rotationX);
            rz = (p.baseY + waveY) * Math.sin(this.rotationX) + rz * Math.cos(this.rotationX);

            // Update point position for projection
            // We use a temporary object or modify properties directly if careful
            // Here we just project the calculated rotated coordinates

            // Project
            const scale = this.fov / (this.viewDistance + rz);
            const screenX = this.width / 2 + (rx * scale);
            const screenY = this.height / 2 + (ry * scale);
            const size = scale * 3;
            const alpha = scale; // Fade out in distance

            if (scale > 0) {
                this.ctx.beginPath();
                this.ctx.arc(screenX, screenY, size, 0, Math.PI * 2);

                // Color based on height/wave
                const hue = 200 + (waveY * 2); // Blue/Cyan range
                this.ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${alpha})`;
                this.ctx.fill();
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// Scroll Progress Indicator
// ========================================

class ScrollProgress {
    constructor() {
        this.progressBar = document.getElementById('scroll-progress');
        if (!this.progressBar) return;

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => this.updateProgress());
        });
    }

    updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // Update bar width
        this.progressBar.style.width = `${scrollPercent}%`;
    }
}

// ========================================
// Animated Snow Particles
// ========================================

class SnowEffect {
    constructor() {
        this.container = document.getElementById('snow-container');
        this.isSnowing = false;
        this.snowflakes = [];
        this.interval = null;
    }

    toggle() {
        this.isSnowing = !this.isSnowing;
        if (this.isSnowing) {
            this.start();
        } else {
            this.stop();
        }
        return this.isSnowing;
    }

    start() {
        if (!this.container) return;
        this.container.style.display = 'block';

        // Create snowflakes periodically
        this.interval = setInterval(() => {
            this.createSnowflake();
        }, 100);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        // Clear existing snowflakes
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄'; // Use text character for better visibility with new CSS

        // Random properties
        const size = Math.random() * 15 + 10; // 10-25px
        const startX = Math.random() * 100;
        const duration = Math.random() * 3 + 2; // 2-5s

        snowflake.style.cssText = `
            position: absolute;
            top: -20px;
            left: ${startX}%;
            font-size: ${size}px;
            color: white;
            opacity: ${Math.random() * 0.5 + 0.5};
            pointer-events: none;
            animation: snowfall ${duration}s linear infinite;
            z-index: 9999;
        `;

        this.container.appendChild(snowflake);

        // Remove after animation
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.remove();
            }
        }, duration * 1000);
    }
}

// ========================================
// Mountain Parallax Effect
// ========================================

class MountainParallax {
    constructor() {
        this.mountains = {
            back: document.querySelector('.mountain-back'),
            mid: document.querySelector('.mountain-mid'),
            front: document.querySelector('.mountain-front')
        };

        if (!this.mountains.back) return;

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Mouse parallax effect
        document.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;

        if (this.mountains.back) {
            this.mountains.back.style.transform = `translateY(${rate * 0.3}px)`;
        }
        if (this.mountains.mid) {
            this.mountains.mid.style.transform = `translateY(${rate * 0.5}px)`;
        }
        if (this.mountains.front) {
            this.mountains.front.style.transform = `translateY(${rate * 0.7}px)`;
        }
    }

    handleMouseMove(e) {
        if (window.pageYOffset > window.innerHeight) return;

        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        if (this.mountains.back) {
            this.mountains.back.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
        }
        if (this.mountains.mid) {
            this.mountains.mid.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        if (this.mountains.front) {
            this.mountains.front.style.transform = `translate(${moveX * 1.5}px, ${moveY * 1.5}px)`;
        }
    }
}

// ========================================
// Profile Image Tilt Effect
// ========================================

class ProfileTilt {
    constructor() {
        this.profileImage = document.querySelector('.profile-image-wrapper');
        if (!this.profileImage) return;

        this.init();
    }

    init() {
        this.profileImage.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });

        this.profileImage.addEventListener('mouseleave', () => {
            this.handleMouseLeave();
        });
    }

    handleMouseMove(e) {
        const rect = this.profileImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        this.profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    }

    handleMouseLeave() {
        this.profileImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
}

// ========================================
// Initialize All Components
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new ScrollAnimations();
    new SmoothScroll();
    new SkillTagsAnimation();
    new CVDownload();
    new PerformanceOptimizer();
    new AccessibilityEnhancer();
    new SecurityManager();

    // Initialize new visual effects
    new LanguageManager();
    const snowManager = new SnowManager();
    // new ThemeManager(); // Removed
    new InteractiveBackground();
    new ScrollProgress();
    const snowEffect = new SnowEffect();
    snowManager.setSnowEffect(snowEffect);
    new MountainParallax();
    new ProfileTilt();

    // Initialize form validator if contact form exists
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        new FormValidator(contactForm);
    }

    // Add CSS animations
    addCustomAnimations();

    console.log('Portfolio initialized successfully with enhanced visuals! ❄️🏔️');
});

// ========================================
// Custom CSS Animations
// ========================================

function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }

        .keyboard-nav *:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }

        .error-message {
            animation: slideInUp 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Service Worker Registration (PWA)
// ========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// ========================================
// Export for testing (if needed)
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sanitizeHTML,
        debounce,
        Navigation,
        ScrollAnimations,
        FormValidator,
        SecurityManager
    };
}
