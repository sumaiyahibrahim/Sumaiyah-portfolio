// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navSocial = document.querySelector('.nav-social');
    const body = document.body;
    
    // Toggle mobile menu when hamburger is clicked
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        navSocial.classList.toggle('active');
        body.classList.toggle('menu-open'); // Prevent scrolling when menu is open
    });
    
    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navSocial.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickInsideHamburger = hamburger.contains(event.target);
        
        if (navLinks.classList.contains('active') && !isClickInsideNav && !isClickInsideHamburger) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navSocial.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Add body class for menu open state
    function addBodyClass() {
        const style = document.createElement('style');
        style.textContent = `
            body.menu-open {
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
    
    addBodyClass();
});
