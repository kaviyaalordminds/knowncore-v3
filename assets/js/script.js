(function () {
    "use strict";

    // ========================
    // DARK / LIGHT THEME TOGGLE
    // ========================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    function updateThemeIcon(theme) {
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.classList.remove('bi-moon-fill');
                themeIcon.classList.add('bi-sun-fill');
            } else {
                themeIcon.classList.remove('bi-sun-fill');
                themeIcon.classList.add('bi-moon-fill');
            }
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Add a subtle animation to the button
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    }

    // ========================
    // PRELOADER
    // ========================
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.js-preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            }, 2000); // Show preloader for 2 seconds to enjoy the animation
        }
    });

    // ========================
    // HEADER STICKY ON SCROLL
    // ========================
    const header = document.querySelector('.header-area');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('header-sticky');
            } else {
                header.classList.remove('header-sticky');
            }
        });
    }

    // ========================
    // SMOOTH SCROLL FOR NAVIGATION
    // ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });

    // ========================
    // ACTIVE NAVIGATION LINK ON SCROLL
    // ========================
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ========================
    // SCROLL TO TOP BUTTON
    // ========================
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========================
    // CONTACT FORM HANDLER
    // ========================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you! Your message has been sent successfully. Our team will contact you soon.');
                this.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // ========================
    // COUNTER ANIMATION
    // ========================
    function animateCounter(el, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                el.innerText = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                el.innerText = target.toLocaleString();
            }
        }
        updateCounter();
    }

    // ========================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ========================
    const animateElements = document.querySelectorAll('.service-item, .course-item-scholar, .work-item, .gallery-item, .client-logo, .stat-item, .faq-item-scholar, .team-item, .event-item');
    
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

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter Observer
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ========================
    // NAVBAR TOGGLER ANIMATION
    // ========================
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    // ========================
    // GALLERY LIGHTBOX
    // ========================
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const titleEl = this.querySelector('h5');
            const title = titleEl ? titleEl.innerText : 'Gallery Image';
            
            const lightbox = document.createElement('div');
            lightbox.className = 'gallery-lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-overlay" style="
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.9);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    padding: 20px;
                    cursor: pointer;
                ">
                    <img src="${img.src}" alt="${title}" style="
                        max-width: 90%;
                        max-height: 80vh;
                        border-radius: 15px;
                        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                    ">
                    <h4 style="
                        color: white;
                        margin-top: 20px;
                        font-size: 20px;
                        font-weight: 600;
                    ">${title}</h4>
                    <span style="
                        color: rgba(255,255,255,0.6);
                        font-size: 14px;
                        margin-top: 5px;
                    ">Click anywhere to close</span>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            lightbox.addEventListener('click', function() {
                lightbox.remove();
                document.body.style.overflow = '';
            });
        });
    });

    // ========================
    // NEWSLETTER FORM
    // ========================
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input.value) {
                alert('Thank you for subscribing! You will receive updates at ' + input.value);
                input.value = '';
            }
        });
    });

    // ========================
    // WORK ITEM CLICK
    // ========================
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!e.target.closest('.btn-view')) return;
            const title = this.querySelector('h4').innerText;
            alert('Project: ' + title + '\\n\\nThis would open the project details page.');
        });
    });

    // ========================
    // PASSWORD TOGGLE
    // ========================
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.closest('.input-group').querySelector('input');
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            } else {
                input.type = 'password';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            }
        });
    });

    // ========================
    // AUTH FORM HANDLERS
    // ========================
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('.auth-btn');
            btn.innerText = 'Signing In...';
            btn.disabled = true;
            setTimeout(() => {
                alert('Welcome back! You have successfully logged in.');
                btn.innerText = 'Sign In';
                btn.disabled = false;
            }, 1500);
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('.auth-btn');
            btn.innerText = 'Creating Account...';
            btn.disabled = true;
            setTimeout(() => {
                alert('Account created successfully! Welcome to Knowncore Edutech.');
                btn.innerText = 'Create Account';
                btn.disabled = false;
            }, 1500);
        });
    }

    // ========================
    // FAQ ACCORDION ENHANCEMENT (SCHOLAR STYLE)
    // ========================
    const faqQuestions = document.querySelectorAll('.faq-question-scholar');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other items
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.setAttribute('aria-expanded', 'false');
                    q.classList.add('collapsed');
                }
            });
            
            // Toggle current item
            this.setAttribute('aria-expanded', !isExpanded);
            if (isExpanded) {
                this.classList.add('collapsed');
            } else {
                this.classList.remove('collapsed');
            }
        });
    });

    // ========================
    // COURSE FILTER TABS
    // ========================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseWrappers = document.querySelectorAll('.course-item-wrapper');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            courseWrappers.forEach(wrapper => {
                const category = wrapper.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    wrapper.style.display = 'block';
                    wrapper.style.opacity = '0';
                    wrapper.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        wrapper.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        wrapper.style.opacity = '1';
                        wrapper.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    wrapper.style.opacity = '0';
                    wrapper.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        wrapper.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // ========================
    // 3D WAVE PARALLAX EFFECT
    // ========================
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const waves = document.querySelectorAll('.wave');
            
            waves.forEach((wave, index) => {
                const speed = (index + 1) * 0.3;
                wave.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // ========================
    // HERO CARD 3D TILT EFFECT
    // ========================
    const heroCards = document.querySelectorAll('.hero-card');
    heroCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(0deg)';
        });
    });

})();