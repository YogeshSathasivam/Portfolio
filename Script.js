// Toggle mobile menu
function toggleMenu() {
    const menu = document.querySelector(".menu")
    menu.classList.toggle("active")
  
    // Toggle hamburger animation
    const hamburger = document.querySelector(".hamburger")
    hamburger.classList.toggle("active")
  }
  
  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    const menu = document.querySelector(".menu")
    const hamburger = document.querySelector(".hamburger")
  
    if (menu.classList.contains("active") && !event.target.closest(".menu") && !event.target.closest(".hamburger")) {
      menu.classList.remove("active")
      hamburger.classList.remove("active")
    }
  })
  
  // Global variables to track scroll position and direction
  let lastScrollTop = 0
  let scrollDirection = "down"
  
  // Update scroll direction
  window.addEventListener("scroll", () => {
    const st = window.scrollY || document.documentElement.scrollTop
    scrollDirection = st > lastScrollTop ? "down" : "up"
    lastScrollTop = st <= 0 ? 0 : st // For Mobile or negative scrolling
  })
  
  // Tab switching functionality
  document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabContents = document.querySelectorAll(".works-container")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabContents.forEach((content) => content.classList.remove("active"))
  
        // Add active class to clicked button and corresponding content
        button.classList.add("active")
        const tabId = button.getAttribute("data-tab")
        document.getElementById(tabId).classList.add("active")
  
        // Update ARIA attributes
        tabButtons.forEach((btn) => {
          const isSelected = btn === button
          btn.setAttribute("aria-selected", isSelected)
        })
  
        // Initialize animations for the newly active tab
        initWorkCardAnimations()
      })
    })
  
    // Update copyright year
    const yearElement = document.getElementById("current-year")
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear()
    }
  
    // Add a class to body to indicate JS is loaded and animations can start
    document.body.classList.add("js-animation-ready")
  
    // Initialize work card animations with a slight delay to ensure cards are visible first
    setTimeout(() => {
      initWorkCardAnimations()
      initBlogCardAnimations()
    }, 100)
  })
  
  // Function to initialize work card animations
  function initWorkCardAnimations() {
    // Get all work cards
    const workCards = document.querySelectorAll(".work-card")
  
    // Create an Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if the element is intersecting (visible)
          if (entry.isIntersecting) {
            // If scrolling down or initial load, add the animate class
            entry.target.classList.add("animate")
          } else {
            // If scrolling up and element is no longer visible, remove the animate class
            if (scrollDirection === "up") {
              entry.target.classList.remove("animate")
            }
          }
        })
      },
      {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% of the card is visible
        rootMargin: "0px", // no margin
      },
    )
  
    // Observe each work card
    workCards.forEach((card) => {
      observer.observe(card)
    })
  }
  
  // Function to initialize blog card animations
  function initBlogCardAnimations() {
    // Get all blog cards
    const blogCards = document.querySelectorAll('.blog-card')
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add animation class when card is visible
          if (entry.isIntersecting) {
            // If scrolling down or initial load, add the animate class
            entry.target.classList.add('animate')
          } else {
            // If scrolling up and element is no longer visible, reset animation
            if (scrollDirection === "up") {
              entry.target.classList.remove('animate')
            }
          }
        })
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: '0px',
      }
    )
    
    // Add delay data attribute and observe each blog card
    blogCards.forEach((card, index) => {
      card.dataset.delay = index * 100 // Stagger animation by 100ms per card
      observer.observe(card)
    })
  }
  
  // Handle menu item clicks for smooth scrolling with proper offset
  document.addEventListener("DOMContentLoaded", () => {
    // Get all menu items that link to sections on the page
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // Check if the link is an anchor link (starts with #)
        const href = item.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          
          // Get the target element
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            // Close the mobile menu if it's open
            const menu = document.querySelector(".menu");
            const hamburger = document.querySelector(".hamburger");
            if (menu.classList.contains("active")) {
              menu.classList.remove("active");
              hamburger.classList.remove("active");
            }
            
            // Calculate the actual navbar height
            const navbar = document.querySelector('nav');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const additionalOffset = 20; // Add some extra spacing
            
            // Get the element's position
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - navbarHeight - additionalOffset;
            
            // Scroll to the element with proper offset
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  });