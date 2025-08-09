// Tara, Kape! - Anonymous Listener Chat System
// JavaScript functionality for the coffee chat platform

// Global variables
let currentTheme = 'light';
let isCallActive = false;
let callTimer = null;
let callStartTime = null;
let selectedCoffeeAmount = 0;

// DOM elements
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
const callModal = document.getElementById('callModal');
const coffeeModal = document.getElementById('coffeeModal');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    loadTheme();
});

// Initialize page functionality
function initializePage() {
    // Set up smooth scrolling for navigation
    setupSmoothScrolling();
    
    // Initialize listener filtering
    initializeListenerFiltering();
    
    // Set up coffee package interactions
    setupCoffeePackages();
}

// Set up event listeners
function setupEventListeners() {
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (callModal && callModal.classList.contains('active') && 
            !callModal.contains(e.target)) {
            closeCallModal();
        }
        
        if (coffeeModal && coffeeModal.classList.contains('active') && 
            !coffeeModal.contains(e.target)) {
            closeCoffeeModal();
        }
    });
}

// Theme management
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', currentTheme);
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    }
    
    // Save theme preference
    localStorage.setItem('theme', currentTheme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    currentTheme = savedTheme;
    document.body.setAttribute('data-theme', currentTheme);
    
    // Update icon
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to light theme');
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        }
    }
}

// Mobile menu
function toggleMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        
        // Update menu button
        const icon = menuToggle.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
            menuToggle.setAttribute('aria-label', 'Close menu');
        } else {
            icon.className = 'fas fa-bars';
            menuToggle.setAttribute('aria-label', 'Toggle menu');
        }
    }
}

// Smooth scrolling
function setupSmoothScrolling() {
    // Handle smooth scrolling for anchor links
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
}

// Scroll to section function (for button clicks)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Listener filtering
function initializeListenerFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Apply filter
            filterListeners(filter);
        });
    });
}

function filterListeners(filter) {
    const listenerCards = document.querySelectorAll('.listener-card');
    
    listenerCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Coffee package interactions
function setupCoffeePackages() {
    const coffeePackages = document.querySelectorAll('.coffee-package');
    
    coffeePackages.forEach(package => {
        const button = package.querySelector('button');
        if (button) {
            button.addEventListener('click', function() {
                const amount = this.getAttribute('onclick').match(/\d+/)[0];
                sendCoffee(parseInt(amount));
            });
        }
    });
}

// Coffee sending functionality
function sendCoffee(amount) {
    selectedCoffeeAmount = amount;
    
    // Show success message
    showNotification(`Coffee credits sent! ₱${amount}`, 'success');
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Coffee credits delivered successfully!', 'success');
    }, 1000);
}

// Call functionality
function startCall() {
    if (isCallActive) return;
    
    // Show call modal
    if (callModal) {
        callModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Start call timer
    startCallTimer();
    
    // Simulate connecting
    setTimeout(() => {
        updateCallStatus('Connected');
        isCallActive = true;
    }, 2000);
}

function endCall() {
    if (!isCallActive) return;
    
    // Stop call timer
    stopCallTimer();
    
    // Update status
    updateCallStatus('Call ended');
    
    // Close call modal after delay
    setTimeout(() => {
        closeCallModal();
        isCallActive = false;
    }, 1000);
}

function closeCallModal() {
    if (callModal) {
        callModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Reset call state
    isCallActive = false;
    stopCallTimer();
    updateCallStatus('Ready to call');
}

function startCallTimer() {
    callStartTime = Date.now();
    callTimer = setInterval(updateCallTimer, 1000);
}

function stopCallTimer() {
    if (callTimer) {
        clearInterval(callTimer);
        callTimer = null;
    }
}

function updateCallTimer() {
    if (!callStartTime) return;
    
    const elapsed = Date.now() - callStartTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    const timerElement = document.querySelector('.call-timer');
    if (timerElement) {
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function updateCallStatus(status) {
    const statusElement = document.querySelector('.call-status');
    if (statusElement) {
        statusElement.textContent = status;
    }
}

// Call controls
function toggleMute() {
    const muteBtn = document.getElementById('muteBtn');
    const icon = muteBtn.querySelector('i');
    const span = muteBtn.querySelector('span');
    
    if (muteBtn.classList.contains('muted')) {
        muteBtn.classList.remove('muted');
        icon.className = 'fas fa-microphone';
        span.textContent = 'Mute';
        showNotification('Microphone unmuted', 'info');
    } else {
        muteBtn.classList.add('muted');
        icon.className = 'fas fa-microphone-slash';
        span.textContent = 'Unmute';
        showNotification('Microphone muted', 'info');
    }
}

function toggleSpeaker() {
    const speakerBtn = document.getElementById('speakerBtn');
    const icon = speakerBtn.querySelector('i');
    const span = speakerBtn.querySelector('span');
    
    if (speakerBtn.classList.contains('active')) {
        speakerBtn.classList.remove('active');
        icon.className = 'fas fa-volume-up';
        span.textContent = 'Speaker';
        showNotification('Speaker off', 'info');
    } else {
        speakerBtn.classList.add('active');
        icon.className = 'fas fa-volume-mute';
        span.textContent = 'Speaker Off';
        showNotification('Speaker on', 'info');
    }
}

// Coffee modal functionality
function openCoffeeModal() {
    if (coffeeModal) {
        coffeeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCoffeeModal() {
    if (coffeeModal) {
        coffeeModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function sendCoffeeAfterCall() {
    openCoffeeModal();
}

function confirmCoffee() {
    if (selectedCoffeeAmount > 0) {
        sendCoffee(selectedCoffeeAmount);
        closeCoffeeModal();
        showNotification(`Coffee credits sent! ₱${selectedCoffeeAmount}`, 'success');
    }
}

// Coffee option selection
document.addEventListener('DOMContentLoaded', function() {
    const coffeeOptions = document.querySelectorAll('.coffee-option-modal');
    
    coffeeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selection from all options
            coffeeOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Select clicked option
            this.classList.add('selected');
            
            // Get amount
            selectedCoffeeAmount = parseInt(this.getAttribute('data-amount'));
        });
    });
});

// Utility functions
function reportIssue() {
    showNotification('Issue reported. We\'ll look into it.', 'info');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--border-light);
        border-radius: var(--radius-md);
        padding: var(--spacing-md);
        box-shadow: 0 4px 20px var(--shadow-medium);
        z-index: var(--z-modal);
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification {
        font-size: var(--font-size-sm);
        color: var(--text-primary);
    }
    
    .notification-success {
        border-left: 4px solid var(--success-color);
    }
    
    .notification-error {
        border-left: 4px solid var(--error-color);
    }
    
    .notification-warning {
        border-left: 4px solid var(--warning-color);
    }
    
    .notification-info {
        border-left: 4px solid var(--primary-color);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        padding: var(--spacing-xs);
        border-radius: var(--radius-sm);
        transition: all var(--transition-fast);
    }
    
    .notification-close:hover {
        background: var(--bg-secondary);
        color: var(--text-primary);
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key closes modals
    if (e.key === 'Escape') {
        if (callModal && callModal.classList.contains('active')) {
            closeCallModal();
        }
        if (coffeeModal && coffeeModal.classList.contains('active')) {
            closeCoffeeModal();
        }
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
    
    // Space bar toggles mute during call
    if (e.key === ' ' && isCallActive) {
        e.preventDefault();
        toggleMute();
    }
});

// Page visibility handling
document.addEventListener('visibilitychange', function() {
    if (document.hidden && isCallActive) {
        // Pause call timer when page is hidden
        if (callTimer) {
            clearInterval(callTimer);
        }
    } else if (!document.hidden && isCallActive && callStartTime) {
        // Resume call timer when page becomes visible
        startCallTimer();
    }
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.startCall = startCall;
window.endCall = endCall;
window.toggleMute = toggleMute;
window.toggleSpeaker = toggleSpeaker;
window.sendCoffeeAfterCall = sendCoffeeAfterCall;
window.reportIssue = reportIssue;
window.closeCoffeeModal = closeCoffeeModal;
window.confirmCoffee = confirmCoffee; 