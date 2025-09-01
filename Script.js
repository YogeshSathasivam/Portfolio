// Toggle mobile menu
function toggleMenu() {
    const menu = document.querySelector(".menu")
    menu.classList.toggle("active")
  
    // Toggle hamburger animation
    const hamburger = document.querySelector(".hamburger")
    hamburger.classList.toggle("active")
  }
  
  // Close development banner
  function closeBanner() {
    const banner = document.querySelector(".dev-banner")
    const body = document.body
    
    if (banner) {
      banner.classList.add("hidden")
      body.classList.add("banner-hidden")
      
      // Remove banner from DOM after animation
      setTimeout(() => {
        banner.remove()
      }, 300)
      
      // Note: Removed localStorage - banner will show again on page refresh
    }
  }
  
  // Note: Removed the DOMContentLoaded listener that checked localStorage
  // Banner will now always show on page load
  
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
  
  // Tab switching functionality - Commented out for single shots section
  /*
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
  */
  
  // Main initialization
  document.addEventListener("DOMContentLoaded", () => {
  
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
  
  // Handle all anchor link clicks for smooth scrolling with proper offset
  document.addEventListener("DOMContentLoaded", () => {
    // Get all anchor links that point to sections on the page (including menu items and buttons)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Check if the link is an anchor link (starts with #)
        const href = link.getAttribute('href');
        if (href.startsWith('#') && href !== '#') {
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

// Shot Modal Functionality
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("shot-modal");
  const modalImage = document.getElementById("modal-image");
  const modalClose = document.querySelector(".modal-close");
  const modalBackdrop = document.querySelector(".modal-backdrop");
  const modalNavPrev = document.querySelector(".modal-nav-prev");
  const modalNavNext = document.querySelector(".modal-nav-next");
  const body = document.body;

  // Get all shot thumbnails and create shots array
  const shotThumbnails = document.querySelectorAll(".shot-thumbnail");
  const shotsArray = Array.from(shotThumbnails).map(thumbnail => ({
    src: thumbnail.src,
    alt: thumbnail.alt
  }));

  let currentShotIndex = 0;

  // Function to open modal
  function openModal(imageSrc, imageAlt, index = 0) {
    currentShotIndex = index;
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden"; // Prevent body scroll
  }

  // Function to navigate shots
  function navigateShot(direction) {
    if (direction === 'next') {
      currentShotIndex = (currentShotIndex + 1) % shotsArray.length;
    } else if (direction === 'prev') {
      currentShotIndex = (currentShotIndex - 1 + shotsArray.length) % shotsArray.length;
    }
    
    const currentShot = shotsArray[currentShotIndex];
    modalImage.src = currentShot.src;
    modalImage.alt = currentShot.alt;
  }

  // Function to close modal
  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    body.style.overflow = ""; // Restore body scroll
    
    // Clear the image src after animation
    setTimeout(() => {
      modalImage.src = "";
      modalImage.alt = "";
    }, 300);
  }

  // Add click event listeners to all shot thumbnails
  shotThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", (e) => {
      e.preventDefault();
      const imageSrc = thumbnail.src;
      const imageAlt = thumbnail.alt;
      openModal(imageSrc, imageAlt, index);
    });

    // Add keyboard support for accessibility
    thumbnail.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const imageSrc = thumbnail.src;
        const imageAlt = thumbnail.alt;
        openModal(imageSrc, imageAlt, index);
      }
    });

    // Make thumbnails focusable for keyboard navigation
    thumbnail.setAttribute("tabindex", "0");
  });

  // Navigation button event listeners
  modalNavPrev.addEventListener("click", () => navigateShot('prev'));
  modalNavNext.addEventListener("click", () => navigateShot('next'));

  // Close modal when clicking close button
  modalClose.addEventListener("click", closeModal);

  // Close modal when clicking backdrop
  modalBackdrop.addEventListener("click", closeModal);

  // Close modal when clicking anywhere in the modal container (outside the image)
  const modalContainer = document.querySelector(".modal-container");
  modalContainer.addEventListener("click", closeModal);

  // Handle keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("active")) {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateShot('prev');
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateShot('next');
      }
    }
  });

  // Prevent modal from closing when clicking on the image or its container
  const modalImageContainer = document.querySelector(".modal-image-container");
  modalImage.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  
  modalImageContainer.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Handle focus trapping within modal for better accessibility
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && modal.classList.contains("active")) {
      // Simple focus trapping - keep focus on close button
      if (document.activeElement !== modalClose) {
        modalClose.focus();
      }
    }
  });
});