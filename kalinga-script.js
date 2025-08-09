// Kalinga - Professional Mental Health Services Page
// Handles theme switching, mobile menu, booking system, and interactions

// Global variables
let currentTheme = 'light';
let currentStep = 1;
let selectedProfessional = null;
let selectedDate = null;
let selectedTime = null;

// DOM elements
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    loadTheme();
    setupBookingSystem();
});

// Initialize page elements
function initializePage() {
    // Initialize mobile menu backdrop
    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
    }
}

// Set up event listeners
function setupEventListeners() {
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openMobileMenu();
        });
        
        // Touch support for mobile devices
        menuToggle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            openMobileMenu();
        });
    }
    
    if (menuClose && mobileMenu) {
        // Close menu on click
        menuClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
        
        // Touch support for close button
        menuClose.addEventListener('touchstart', (e) => {
            e.preventDefault();
            closeMobileMenu();
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle swipe gestures for mobile
    let startX = 0;
    let currentX = 0;
    
    mobileMenu?.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    mobileMenu?.addEventListener('touchmove', (e) => {
        currentX = e.touches[0].clientX;
    });
    
    mobileMenu?.addEventListener('touchend', (e) => {
        const swipeDistance = startX - currentX;
        if (swipeDistance > 50 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Theme management
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    saveTheme();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
        icon.setAttribute('aria-label', 'Switch to light theme');
    } else {
        icon.className = 'fas fa-moon';
        icon.setAttribute('aria-label', 'Switch to dark theme');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('kalinga-theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.body.setAttribute('data-theme', currentTheme);
        updateThemeIcon();
    }
}

function saveTheme() {
    localStorage.setItem('kalinga-theme', currentTheme);
}

// Mobile menu management
function openMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add backdrop
        if (mobileMenuBackdrop) {
            mobileMenuBackdrop.classList.add('active');
        }
        
        // Focus management
        const firstMenuItem = mobileMenu.querySelector('.mobile-nav-item');
        if (firstMenuItem) {
            firstMenuItem.focus();
        }
        
        // Announce to screen reader
        announceToScreenReader('Mobile menu opened');
    }
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove backdrop
        if (mobileMenuBackdrop) {
            mobileMenuBackdrop.classList.remove('active');
        }
        
        // Return focus to menu toggle
        if (menuToggle) {
            menuToggle.focus();
        }
        
        // Announce to screen reader
        announceToScreenReader('Mobile menu closed');
    }
}

// Booking system
function setupBookingSystem() {
    // Professional selection
    const professionalOptions = document.querySelectorAll('.professional-option');
    professionalOptions.forEach(option => {
        // Click event
        option.addEventListener('click', function() {
            selectProfessional(this.dataset.professional);
        });
        
        // Touch event for mobile
        option.addEventListener('touchstart', function(e) {
            e.preventDefault();
            selectProfessional(this.dataset.professional);
        });
    });
    
    // Date selection
    const dateDays = document.querySelectorAll('.calendar-day.available');
    dateDays.forEach(day => {
        // Click event
        day.addEventListener('click', function() {
            selectDate(this);
        });
        
        // Touch event for mobile
        day.addEventListener('touchstart', function(e) {
            e.preventDefault();
            selectDate(this);
        });
    });
    
    // Time selection
    const timeSlots = document.querySelectorAll('.time-slot.available');
    timeSlots.forEach(slot => {
        // Click event
        slot.addEventListener('click', function() {
            selectTime(this);
        });
        
        // Touch event for mobile
        slot.addEventListener('touchstart', function(e) {
            e.preventDefault();
            selectTime(this);
        });
    });
    
    // Step navigation buttons
    const nextButtons = document.querySelectorAll('[onclick^="nextStep"]');
    const prevButtons = document.querySelectorAll('[onclick^="prevStep"]');
    
    nextButtons.forEach(button => {
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            // Extract step number from onclick attribute
            const stepMatch = this.getAttribute('onclick').match(/nextStep\((\d+)\)/);
            if (stepMatch) {
                nextStep(parseInt(stepMatch[1]));
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            // Extract step number from onclick attribute
            const stepMatch = this.getAttribute('onclick').match(/prevStep\((\d+)\)/);
            if (stepMatch) {
                prevStep(parseInt(stepMatch[1]));
            }
        });
    });
    
    // Confirm booking button
    const confirmButton = document.querySelector('[onclick="confirmBooking()"]');
    if (confirmButton) {
        confirmButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            confirmBooking();
        });
    }
}

function selectProfessional(professionalId) {
    // Remove previous selection
    document.querySelectorAll('.professional-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Select new professional
    const selected = document.querySelector(`[data-professional="${professionalId}"]`);
    if (selected) {
        selected.classList.add('selected');
        selectedProfessional = professionalId;
    }
}

function selectDate(dateElement) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    
    // Select new date
    dateElement.classList.add('selected');
    selectedDate = dateElement.querySelector('.day-number').textContent;
}

function selectTime(timeElement) {
    // Remove previous selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Select new time
    timeElement.classList.add('selected');
    selectedTime = timeElement.textContent;
}

function nextStep(step) {
    if (step === 2 && !selectedProfessional) {
        showNotification('Please select a professional first', 'warning');
        return;
    }
    
    if (step === 3 && (!selectedDate || !selectedTime)) {
        showNotification('Please select both date and time', 'warning');
        return;
    }
    
    currentStep = step;
    showStep(step);
    
    // Add visual feedback for mobile
    const currentStepEl = document.getElementById(`step${step}`);
    if (currentStepEl) {
        currentStepEl.style.animation = 'none';
        currentStepEl.offsetHeight; // Trigger reflow
        currentStepEl.style.animation = 'fadeIn 0.3s ease';
    }
}

function prevStep(step) {
    currentStep = step;
    showStep(step);
    
    // Add visual feedback for mobile
    const currentStepEl = document.getElementById(`step${step}`);
    if (currentStepEl) {
        currentStepEl.style.animation = 'none';
        currentStepEl.offsetHeight; // Trigger reflow
        currentStepEl.style.animation = 'fadeIn 0.3s ease';
    }
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.booking-step').forEach(stepEl => {
        stepEl.style.display = 'none';
        stepEl.classList.remove('active');
    });
    
    // Show current step
    const currentStepEl = document.getElementById(`step${step}`);
    if (currentStepEl) {
        currentStepEl.style.display = 'block';
        currentStepEl.classList.add('active');
        
        // Scroll to top of the step for mobile
        if (window.innerWidth <= 768) {
            currentStepEl.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }
    
    // Update step indicators
    updateStepIndicators(step);
}

function updateStepIndicators(activeStep) {
    const indicators = document.querySelectorAll('.step-indicator');
    indicators.forEach((indicator, index) => {
        if (index + 1 <= activeStep) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function confirmBooking() {
    if (!selectedProfessional || !selectedDate || !selectedTime) {
        showNotification('Please complete all booking details', 'warning');
        return;
    }
    
    // Show success modal
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
        
        // Update modal content with selected details
        const professionalName = document.querySelector(`[data-professional="${selectedProfessional}"] .professional-name`)?.textContent || 'Selected Professional';
        const dateDisplay = document.querySelector('.calendar-day.selected .day-number')?.textContent || selectedDate;
        const timeDisplay = document.querySelector('.time-slot.selected')?.textContent || selectedTime;
        
        // Update modal details if elements exist
        const modalDetails = modal.querySelectorAll('.detail-item span');
        if (modalDetails.length >= 3) {
            modalDetails[0].textContent = professionalName;
            modalDetails[1].textContent = `Dec ${dateDisplay}, 2024 at ${timeDisplay}`;
        }
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Utility functions
function handleKeyboardShortcuts(event) {
    // Escape key closes mobile menu
    if (event.key === 'Escape') {
        if (mobileMenu?.classList.contains('active')) {
            closeMobileMenu();
        }
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        error: 'fa-times-circle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

// Initialize step display
document.addEventListener('DOMContentLoaded', function() {
    showStep(1);
}); 