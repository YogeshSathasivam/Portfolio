// Navigation bar Hamburger

function toggleMenu() {
    document.querySelector(".menu").classList.toggle("active");
}


// My Works Section
document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".works-container");

    tabButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons
            tabButtons.forEach((btn) => btn.classList.remove("active"));
            // Add active class to clicked button
            this.classList.add("active");

            // Hide all tab contents
            tabContents.forEach((content) => content.classList.remove("active"));

            // Show the selected tab
            const target = document.getElementById(this.getAttribute("data-tab"));
            target.classList.add("active");
        });
    });
});
