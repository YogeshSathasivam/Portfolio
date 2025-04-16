// Toggle mobile menu
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
    
    // Toggle hamburger animation
    const hamburger = document.querySelector('.hamburger');
    hamburger.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (menu.classList.contains('active') && 
        !event.target.closest('.menu') && 
        !event.target.closest('.hamburger')) {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.works-container');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Update ARIA attributes
            tabButtons.forEach(btn => {
                const isSelected = btn === button;
                btn.setAttribute('aria-selected', isSelected);
            });
        });
    });
});

// Update copyright year
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});