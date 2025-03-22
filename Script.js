// Navigation bar Hamburger
function toggleMenu() {
    document.querySelector(".menu").classList.toggle("active");
}

// Smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Handle smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's not just a "#" link
            if(this.getAttribute('href') !== "#") {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    document.querySelector(".menu").classList.remove("active");
                    
                    // Calculate header height for offset
                    const headerHeight = document.querySelector('nav').offsetHeight;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - (headerHeight + 20), // Offset for fixed header with some padding
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Initialize tabs
    initTabs();
});

// My Works Section Tabs
function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".works-container");

    tabButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Update ARIA attributes
            tabButtons.forEach((btn) => {
                btn.classList.remove("active");
                btn.setAttribute("aria-selected", "false");
            });
            
            // Add active class to clicked button
            this.classList.add("active");
            this.setAttribute("aria-selected", "true");

            // Hide all tab contents
            tabContents.forEach((content) => {
                content.classList.remove("active");
                content.setAttribute("aria-hidden", "true");
            });

            // Show the selected tab
            const target = document.getElementById(this.getAttribute("data-tab"));
            target.classList.add("active");
            target.setAttribute("aria-hidden", "false");
        });
    });
}