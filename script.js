// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeMobileMenu();
    initializeCoffeeModal();
    initializeAccessibility();
    initializeAnimations();
    initializeStreak();
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('mello-theme') || 'light';
    
    setTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            announceToScreenReader(`Switched to ${newTheme} theme`);
        });
    }
}

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('mello-theme', theme);
    
    const themeIcon = document.getElementById('themeToggle')?.querySelector('i');
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Mobile Menu Management
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose = document.getElementById('menuClose');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            menuClose?.focus();
            announceToScreenReader('Mobile menu opened');
        });
    }
    
    if (menuClose && mobileMenu) {
        menuClose.addEventListener('click', () => {
            closeMobileMenu();
        });
    }
    
    // Close menu when clicking outside
    mobileMenu?.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('menuToggle')?.focus();
        announceToScreenReader('Mobile menu closed');
    }
}

// Coffee Modal Management
function initializeCoffeeModal() {
    const coffeeModal = document.getElementById('coffeeModal');
    const coffeeOptions = document.querySelectorAll('.coffee-option');
    
    // Coffee option selection
    coffeeOptions.forEach(option => {
        option.addEventListener('click', () => {
            coffeeOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            announceToScreenReader(`Selected ${option.querySelector('span').textContent}`);
        });
    });
    
    // Close modal when clicking outside
    coffeeModal?.addEventListener('click', (e) => {
        if (e.target === coffeeModal) {
            closeCoffeeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && coffeeModal?.classList.contains('active')) {
            closeCoffeeModal();
        }
    });
}

function openCoffeeModal() {
    const coffeeModal = document.getElementById('coffeeModal');
    if (coffeeModal) {
        coffeeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        coffeeModal.focus();
        announceToScreenReader('Coffee credits modal opened');
    }
}

function closeCoffeeModal() {
    const coffeeModal = document.getElementById('coffeeModal');
    if (coffeeModal) {
        coffeeModal.classList.remove('active');
        document.body.style.overflow = '';
        document.querySelector('.coffee-btn')?.focus();
        announceToScreenReader('Coffee credits modal closed');
    }
}

function sendCoffee() {
    const selectedOption = document.querySelector('.coffee-option.selected');
    if (selectedOption) {
        const amount = selectedOption.getAttribute('data-amount');
        const coffeeText = selectedOption.querySelector('span').textContent;
        
        // Simulate sending coffee
        showNotification(`☕ Sent ${coffeeText} for ₱${amount}!`, 'success');
        closeCoffeeModal();
        
        // Reset selection
        document.querySelectorAll('.coffee-option').forEach(opt => opt.classList.remove('selected'));
        
        announceToScreenReader(`Coffee sent successfully`);
    } else {
        showNotification('Please select a coffee option', 'error');
    }
}

// Streak Management
function initializeStreak() {
    const streakCount = document.querySelector('.streak-count');
    const streakFill = document.querySelector('.streak-fill');
    const streakText = document.querySelector('.streak-text');
    
    // Get streak from localStorage or set default
    let currentStreak = parseInt(localStorage.getItem('mello-streak')) || 7;
    let lastVentDate = localStorage.getItem('mello-last-vent');
    const today = new Date().toDateString();
    
    // Check if user vented today
    if (lastVentDate === today) {
        // User already vented today, streak continues
        updateStreakDisplay(currentStreak);
    } else if (lastVentDate) {
        // Check if user missed a day
        const lastDate = new Date(lastVentDate);
        const todayDate = new Date();
        const diffTime = Math.abs(todayDate - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 2) {
            // Streak broken (missed more than 1 day)
            currentStreak = 0;
            localStorage.setItem('mello-streak', currentStreak);
        }
    }
    
    updateStreakDisplay(currentStreak);
}

function updateStreakDisplay(streak) {
    const streakCount = document.querySelector('.streak-count');
    const streakFill = document.querySelector('.streak-fill');
    const streakText = document.querySelector('.streak-text');
    
    if (streakCount) streakCount.textContent = streak;
    
    if (streakFill) {
        const percentage = Math.min((streak / 10) * 100, 100); // Max 10 days for full bar
        streakFill.style.width = `${percentage}%`;
    }
    
    if (streakText) {
        if (streak === 0) {
            streakText.textContent = 'Start your venting streak today!';
        } else if (streak === 1) {
            streakText.textContent = '1 day streak! Keep going!';
        } else {
            streakText.textContent = `${streak} day streak! Keep going!`;
        }
    }
}

function incrementStreak() {
    let currentStreak = parseInt(localStorage.getItem('mello-streak')) || 0;
    const today = new Date().toDateString();
    const lastVentDate = localStorage.getItem('mello-last-vent');
    
    if (lastVentDate !== today) {
        currentStreak++;
        localStorage.setItem('mello-streak', currentStreak);
        localStorage.setItem('mello-last-vent', today);
        updateStreakDisplay(currentStreak);
        
        // Show streak celebration
        if (currentStreak % 7 === 0) {
            showNotification(`🎉 ${currentStreak} day streak! Amazing progress!`, 'success');
        } else if (currentStreak % 3 === 0) {
            showNotification(`🔥 ${currentStreak} day streak! You're on fire!`, 'success');
        }
    }
}

// Accessibility Features
function initializeAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(skipLink.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
                announceToScreenReader('Skipped to main content');
            }
        });
    }
    
    // Focus management for modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (firstElement && lastElement) {
            // Trap focus within modal
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            });
        }
    });
    
    // Announce page changes to screen readers
    announceToScreenReader('Mello landing page loaded');
}

// Animation Management
function initializeAnimations() {
    // Intersection Observer for scroll animations
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .safety-item, .coffee-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--border-light);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
        box-shadow: 0 8px 32px var(--shadow-medium);
        z-index: var(--z-tooltip);
        max-width: 400px;
        transform: translateX(100%);
        transition: transform var(--transition-normal);
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    `;
    
    const icon = notification.querySelector('i');
    icon.style.color = getNotificationColor(type);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        padding: var(--spacing-xs);
        border-radius: var(--radius-sm);
        margin-left: auto;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Announce to screen reader
    announceToScreenReader(message);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return 'var(--success-color)';
        case 'error': return 'var(--error-color)';
        case 'warning': return 'var(--warning-color)';
        default: return 'var(--primary-color)';
    }
}

// Screen Reader Announcements
function announceToScreenReader(message) {
    // Create or update aria-live region
    let liveRegion = document.getElementById('sr-announcements');
    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'sr-announcements';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
    }
    
    // Update the content to trigger announcement
    liveRegion.textContent = message;
    
    // Clear after a short delay
    setTimeout(() => {
        liveRegion.textContent = '';
    }, 1000);
}

// Service Card Interactions
document.addEventListener('click', (e) => {
    const serviceCard = e.target.closest('.service-card');
    if (serviceCard) {
        // Add click animation
        serviceCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            serviceCard.style.transform = '';
        }, 150);
        
        // If it's the Himpil card, increment streak
        if (serviceCard.classList.contains('himpil-card')) {
            incrementStreak();
        }
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Enter key on service cards
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('service-card')) {
            focusedElement.click();
        }
    }
    
    // Space key on service cards
    if (e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('service-card')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// Performance Optimization
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

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Handle scroll-based animations or effects here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for global access
window.openCoffeeModal = openCoffeeModal;
window.closeCoffeeModal = closeCoffeeModal;
window.sendCoffee = sendCoffee;
window.incrementStreak = incrementStreak; 