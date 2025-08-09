// Practitioner Dashboard JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeNotifications();
    initializeMobileMenu();
    initializeAppointmentFilters();
    initializeSearch();
    initializeAccessibility();
    initializeAnimations();
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('mello-practitioner-theme') || 'light';
    
    setTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }
}

function setTheme(theme) {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    body.setAttribute('data-theme', theme);
    localStorage.setItem('mello-practitioner-theme', theme);
    
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Announce theme change for screen readers
    announceToScreenReader(`Theme changed to ${theme} mode`);
}

// Navigation Management
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item
            item.classList.add('active');
            
            // Show corresponding section
            const targetSection = item.getAttribute('data-section');
            const section = document.getElementById(targetSection);
            if (section) {
                section.classList.add('active');
                section.focus();
            }
            
            // Announce navigation for screen readers
            const sectionName = item.querySelector('span').textContent;
            announceToScreenReader(`Navigated to ${sectionName} section`);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', handlePopState);
}

function handlePopState() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    const navItem = document.querySelector(`[data-section="${hash}"]`);
    if (navItem) {
        navItem.click();
    }
}

// Notifications Management
function initializeNotifications() {
    const notificationsBtn = document.getElementById('notificationsBtn');
    const notificationsPanel = document.getElementById('notificationsPanel');
    const closeNotifications = document.getElementById('closeNotifications');
    
    if (notificationsBtn && notificationsPanel) {
        notificationsBtn.addEventListener('click', () => {
            notificationsPanel.classList.toggle('active');
            
            if (notificationsPanel.classList.contains('active')) {
                notificationsPanel.focus();
                announceToScreenReader('Notifications panel opened');
            } else {
                announceToScreenReader('Notifications panel closed');
            }
        });
    }
    
    if (closeNotifications && notificationsPanel) {
        closeNotifications.addEventListener('click', () => {
            notificationsPanel.classList.remove('active');
            announceToScreenReader('Notifications panel closed');
        });
    }
    
    // Close notifications panel when clicking outside
    document.addEventListener('click', (e) => {
        if (notificationsPanel && notificationsPanel.classList.contains('active')) {
            if (!notificationsPanel.contains(e.target) && !notificationsBtn.contains(e.target)) {
                notificationsPanel.classList.remove('active');
            }
        }
    });
    
    // Close notifications panel with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && notificationsPanel && notificationsPanel.classList.contains('active')) {
            notificationsPanel.classList.remove('active');
            notificationsBtn.focus();
        }
    });
}

// Mobile Menu Management
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    
    // Open mobile menu
    if (mobileMenuToggle && mobileMenuOverlay) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            mobileMenuOverlay.focus();
            announceToScreenReader('Mobile menu opened');
        });
    }
    
    // Close mobile menu
    if (mobileMenuClose && mobileMenuOverlay) {
        mobileMenuClose.addEventListener('click', () => {
            closeMobileMenu();
        });
    }
    
    // Close mobile menu when clicking overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }
    
    // Mobile navigation
    mobileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all mobile nav items
            mobileNavItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Navigate to section
            const targetSection = item.getAttribute('data-section');
            navigateToSection(targetSection);
            
            // Close mobile menu
            closeMobileMenu();
            
            // Announce navigation
            const sectionName = item.querySelector('span').textContent;
            announceToScreenReader(`Navigated to ${sectionName} section`);
        });
    });
    
    // Mobile theme toggle
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            
            // Update mobile theme toggle icon
            const mobileThemeIcon = mobileThemeToggle.querySelector('i');
            if (mobileThemeIcon) {
                mobileThemeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        });
    }
    
    // Close mobile menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.focus();
        }
        announceToScreenReader('Mobile menu closed');
    }
}

// Appointment Filters
function initializeAppointmentFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all filter buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            filterAppointments(filter);
            
            // Announce filter change for screen readers
            announceToScreenReader(`Filtered appointments to show ${filter}`);
        });
    });
}

function filterAppointments(filter) {
    const appointmentCards = document.querySelectorAll('.appointment-card');
    
    appointmentCards.forEach(card => {
        // This is a simplified filter - in a real app, you'd filter based on actual data
        switch(filter) {
            case 'today':
                // Show only today's appointments
                card.style.display = card.classList.contains('upcoming') ? 'flex' : 'none';
                break;
            case 'week':
                // Show this week's appointments
                card.style.display = 'flex';
                break;
            case 'month':
                // Show this month's appointments
                card.style.display = 'flex';
                break;
            case 'all':
                // Show all appointments
                card.style.display = 'flex';
                break;
        }
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            searchPatients(searchTerm);
        });
        
        // Add search functionality to other search inputs
        const allSearchInputs = document.querySelectorAll('input[type="text"], input[type="email"]');
        allSearchInputs.forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.target.blur();
                }
            });
        });
    }
}

function searchPatients(searchTerm) {
    const patientCards = document.querySelectorAll('.patient-card');
    
    patientCards.forEach(card => {
        const patientName = card.querySelector('h4').textContent.toLowerCase();
        const patientInfo = card.querySelector('p').textContent.toLowerCase();
        
        if (patientName.includes(searchTerm) || patientInfo.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Quick Actions
function initializeQuickActions() {
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('click', () => {
            const action = card.querySelector('span').textContent;
            handleQuickAction(action);
        });
    });
}

function handleQuickAction(action) {
    switch(action) {
        case 'New Consultation':
            // Navigate to consultations section and show new consultation form
            navigateToSection('consultations');
            showNewConsultationModal();
            break;
        case 'Schedule Appointment':
            // Navigate to appointments section
            navigateToSection('appointments');
            break;
        case 'View Reports':
            // Navigate to reports section
            navigateToSection('reports');
            break;
        case 'Update Availability':
            // Navigate to schedule section
            navigateToSection('schedule');
            break;
    }
}

function navigateToSection(sectionName) {
    const navItem = document.querySelector(`[data-section="${sectionName}"]`);
    if (navItem) {
        navItem.click();
    }
}

// Modal Management
function showNewConsultationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>New Consultation</h3>
                <button class="btn-icon modal-close" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form class="consultation-form">
                    <div class="form-group">
                        <label for="patient-select">Select Patient</label>
                        <select id="patient-select" required>
                            <option value="">Choose a patient...</option>
                            <option value="ana">Ana Dela Cruz</option>
                            <option value="carlos">Carlos Mendoza</option>
                            <option value="maria">Maria Garcia</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="consultation-type">Consultation Type</label>
                        <select id="consultation-type" required>
                            <option value="">Select type...</option>
                            <option value="initial">Initial Consultation</option>
                            <option value="follow-up">Follow-up Session</option>
                            <option value="emergency">Emergency Session</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="consultation-date">Date & Time</label>
                        <input type="datetime-local" id="consultation-date" required>
                    </div>
                    <div class="form-group">
                        <label for="consultation-notes">Notes</label>
                        <textarea id="consultation-notes" rows="4" placeholder="Add any preliminary notes..."></textarea>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn-secondary modal-cancel">Cancel</button>
                        <button type="submit" class="btn-primary">Create Consultation</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background-color: var(--bg-card);
            border-radius: var(--radius-lg);
            box-shadow: 0 20px 60px var(--shadow-medium);
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideIn 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px;
            border-bottom: 1px solid var(--border-color);
        }
        
        .modal-header h3 {
            font-weight: 600;
            margin: 0;
        }
        
        .modal-body {
            padding: 24px;
        }
        
        .consultation-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .modal-actions {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 20px;
        }
        
        @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(modalStyles);
    
    // Handle modal interactions
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = modal.querySelector('.modal-cancel');
    const form = modal.querySelector('.consultation-form');
    
    function closeModal() {
        modal.remove();
        modalStyles.remove();
    }
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle form submission
        announceToScreenReader('New consultation created successfully');
        closeModal();
    });
    
    // Focus management
    modal.focus();
    modal.setAttribute('tabindex', '-1');
}

// Accessibility Features
function initializeAccessibility() {
    // Skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
    
    // Keyboard navigation for sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.addEventListener('keydown', (e) => {
            const navItems = sidebar.querySelectorAll('.nav-item');
            const currentIndex = Array.from(navItems).findIndex(item => item === document.activeElement);
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % navItems.length;
                    navItems[nextIndex].focus();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = currentIndex === 0 ? navItems.length - 1 : currentIndex - 1;
                    navItems[prevIndex].focus();
                    break;
                case 'Home':
                    e.preventDefault();
                    navItems[0].focus();
                    break;
                case 'End':
                    e.preventDefault();
                    navItems[navItems.length - 1].focus();
                    break;
            }
        });
    }
    
    // Announce dynamic content changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check for important content changes
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const ariaLive = node.getAttribute('aria-live');
                        if (ariaLive) {
                            // Content will be announced automatically
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
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
    
    // Observe cards and sections for animation
    const animatedElements = document.querySelectorAll('.stat-card, .action-card, .patient-card, .consultation-card, .fee-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Hover animations for interactive elements
    const interactiveElements = document.querySelectorAll('.btn-primary, .btn-secondary, .action-card, .patient-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
                el.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
                el.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Utility Functions
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

// Add screen reader only styles
const srOnlyStyles = document.createElement('style');
srOnlyStyles.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(srOnlyStyles);

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Dashboard error:', e.error);
    // In a real app, you might want to send this to an error tracking service
});

// Performance Monitoring
window.addEventListener('load', () => {
    // Measure page load performance
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Dashboard loaded in ${loadTime}ms`);
    }
});

// Export functions for potential external use
window.MelloPractitionerDashboard = {
    setTheme,
    navigateToSection,
    showNewConsultationModal,
    announceToScreenReader
}; 