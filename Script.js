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
    setTimeout(initWorkCardAnimations, 100)
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
  
  // Re-initialize animations when page is refreshed or when switching tabs
  document.addEventListener("DOMContentLoaded", () => {
    // Set initial scroll position
    lastScrollTop = window.scrollY || document.documentElement.scrollTop
  
    // Initialize animations
    initWorkCardAnimations()
  })  