// Himpil - Anonymous Community Venting Page
// Handles theme switching, mobile menu, vent filtering, and interactions

// Global variables
let currentTheme = 'light';
let currentFilter = 'all';
let vents = [];

// DOM elements
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
const ventsGrid = document.getElementById('ventsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    loadTheme();
    setupVentFiltering();
});

// Initialize page elements
function initializePage() {
    // Get all vent cards for filtering
    const ventCards = document.querySelectorAll('.vent-card');
    vents = Array.from(ventCards);
    
    // Update filter button states
    updateFilterButtons();
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
        menuClose.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            setActiveFilter(filter);
        });
    });
    
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreVents);
    }
    
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
    const savedTheme = localStorage.getItem('himpil-theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.body.setAttribute('data-theme', currentTheme);
        updateThemeIcon();
    }
}

function saveTheme() {
    localStorage.setItem('himpil-theme', currentTheme);
}

// Mobile menu management
function toggleMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Update aria-expanded
        const isExpanded = mobileMenu.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    }
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
}

// Vent filtering system
function setupVentFiltering() {
    // Show all vents initially
    filterVents('all');
}

function setActiveFilter(filter) {
    currentFilter = filter;
    
    // Update filter button states
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    // Filter vents
    filterVents(filter);
}

function filterVents(filter) {
    vents.forEach(vent => {
        const category = vent.dataset.category;
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            vent.style.display = 'block';
            vent.classList.add('fade-in');
        } else {
            vent.style.display = 'none';
            vent.classList.remove('fade-in');
        }
    });
    
    // Update load more button visibility
    updateLoadMoreVisibility();
}

function updateFilterButtons() {
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateLoadMoreVisibility() {
    const visibleVents = vents.filter(vent => 
        vent.style.display !== 'none'
    );
    
    if (loadMoreBtn) {
        loadMoreBtn.style.display = visibleVents.length >= 6 ? 'block' : 'none';
    }
}

// Load more vents functionality
function loadMoreVents() {
    // Simulate loading more vents
    const loadingText = loadMoreBtn.innerHTML;
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate API delay
    setTimeout(() => {
        // Add more sample vents
        addSampleVents();
        
        // Reset button
        loadMoreBtn.innerHTML = loadingText;
        loadMoreBtn.disabled = false;
        
        // Update filtering
        filterVents(currentFilter);
    }, 1500);
}

function addSampleVents() {
    const additionalVents = [
        {
            category: 'recent',
            time: '3d',
            username: 'grad_school_bound',
            userHandle: '@future_phd',
            profileInitial: 'G',
            content: 'Just got accepted into my dream graduate program! After two years of applications and rejections, this feels amazing. Don\'t give up on your goals! 🎓',
            likes: 89,
            comments: 21
        },
        {
            category: 'trending',
            time: '4d',
            username: 'exam_survivor',
            userHandle: '@study_struggler',
            profileInitial: 'E',
            content: 'Finals week is killing me. I have 4 exams in 3 days and I feel like I\'m forgetting everything I studied. Anyone else in the same boat? 😫',
            likes: 156,
            comments: 47
        },
        {
            category: 'recent',
            time: '5d',
            username: 'boundary_setter',
            userHandle: '@self_care_advocate',
            profileInitial: 'B',
            content: 'I finally stood up to my toxic friend today. It was scary but I feel so much lighter now. Setting boundaries is self-care, not selfishness. 💪',
            likes: 203,
            comments: 38
        },
        {
            category: 'trending',
            time: '1d',
            username: 'midnight_owl',
            userHandle: '@night_thinker',
            profileInitial: 'M',
            content: 'Can\'t sleep again. My mind is racing with all the things I need to do tomorrow. Anyone else struggle with overthinking at night? 🌙',
            likes: 67,
            comments: 31
        },
        {
            category: 'recent',
            time: '6h',
            username: 'coffee_addict_42',
            userHandle: '@caffeine_queen',
            profileInitial: 'C',
            content: 'Third cup of coffee today and I\'m still exhausted. Why does adulting have to be so tiring? 😴',
            likes: 45,
            comments: 18
        },
        {
            category: 'trending',
            time: '2d',
            username: 'introvert_warrior',
            userHandle: '@quiet_strength',
            profileInitial: 'I',
            content: 'Had to cancel plans again because of social anxiety. I feel guilty but I know I need to prioritize my mental health. Anyone else relate? 🤍',
            likes: 134,
            comments: 52
        },
        {
            category: 'recent',
            time: '1w',
            username: 'creative_soul',
            userHandle: '@artistic_mind',
            profileInitial: 'C',
            content: 'Started painting again after months of creative block. Sometimes you just need to pick up the brush and let your emotions flow onto the canvas. Art therapy is real! 🎨',
            likes: 78,
            comments: 25
        },
        {
            category: 'trending',
            time: '3d',
            username: 'fitness_journey',
            userHandle: '@wellness_seeker',
            profileInitial: 'F',
            content: 'Hit the gym for the first time in months today. I was so nervous but everyone was actually really supportive. Remember, everyone starts somewhere! 💪',
            likes: 95,
            comments: 33
        }
    ];
    
    additionalVents.forEach(ventData => {
        const ventCard = createVentCard(ventData);
        ventsGrid.appendChild(ventCard);
        vents.push(ventCard);
    });
}

function createVentCard(ventData) {
    const ventCard = document.createElement('div');
    ventCard.className = 'vent-card fade-in';
    ventCard.dataset.category = ventData.category;
    
    ventCard.innerHTML = `
        <div class="vent-avatar">
            <div class="avatar-circle">
                ${ventData.profileInitial || 'U'}
            </div>
        </div>
        <div class="vent-content-wrapper">
            <div class="vent-header">
                <div class="user-info">
                    <span class="username">${ventData.username}</span>
                    <span class="user-handle">${ventData.userHandle}</span>
                    <span class="vent-time">${ventData.time}</span>
                </div>
                <button class="more-options" aria-label="More options">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
            <div class="vent-content">
                <p>${ventData.content}</p>
            </div>
            <div class="vent-actions">
                <button class="action-btn like-btn" onclick="reactToVent(this, 'like')">
                    <i class="far fa-heart"></i>
                    <span class="count">${ventData.likes}</span>
                </button>
                <button class="action-btn comment-btn" onclick="reactToVent(this, 'comment')">
                    <i class="far fa-comment"></i>
                    <span class="count">${ventData.comments}</span>
                </button>
            </div>
        </div>
    `;
    
    return ventCard;
}

// Vent interaction functions
function reactToVent(button, action) {
    const countElement = button.querySelector('.count');
    let currentCount = parseInt(countElement.textContent);
    
    if (action === 'like') {
        // Toggle like state
        const icon = button.querySelector('i');
        if (button.classList.contains('liked')) {
            // Unlike
            button.classList.remove('liked');
            icon.className = 'far fa-heart';
            currentCount--;
            showReactionFeedback('unliked');
        } else {
            // Like
            button.classList.add('liked');
            icon.className = 'fas fa-heart';
            currentCount++;
            showReactionFeedback('liked');
        }
    } else if (action === 'comment') {
        // Show comment feedback
        showReactionFeedback('comment');
        currentCount++;
    }
    
    // Update count
    countElement.textContent = currentCount;
    
    // Add animation class
    button.classList.add('reacted');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        button.classList.remove('reacted');
    }, 600);
}

function showReactionFeedback(action) {
    const messages = {
        'liked': '💖 Liked!',
        'unliked': '💔 Unliked',
        'comment': '💭 Comment added!'
    };
    
    // Create temporary feedback element
    const feedback = document.createElement('div');
    feedback.className = 'reaction-feedback';
    feedback.textContent = messages[action];
    
    // Add to page
    document.body.appendChild(feedback);
    
    // Animate and remove
    setTimeout(() => {
        feedback.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 2000);
}

// Keyboard shortcuts
function handleKeyboardShortcuts(event) {
    // Escape key closes mobile menu
    if (event.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Number keys for quick filtering
    if (event.key >= '1' && event.key <= '3') {
        const filters = ['all', 'recent', 'trending'];
        const filterIndex = parseInt(event.key) - 1;
        if (filters[filterIndex]) {
            setActiveFilter(filters[filterIndex]);
        }
    }
}

// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.reactToVent = reactToVent;
window.showNotification = showNotification; 