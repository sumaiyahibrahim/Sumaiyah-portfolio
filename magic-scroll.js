// Scroll-based animations
document.addEventListener('DOMContentLoaded', function() {
  // Variables to track scroll position and rotation
  let lastScrollTop = 0;
  let candyRotation = 0;
  const candy = document.querySelector('.spiral-candy');
  const funFactItems = document.querySelectorAll('.fun-facts-list li');
  const funFactsList = document.querySelector('.fun-facts-list');
  
  // Hide all fun fact items initially
  funFactItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Function to check element position relative to viewport
  function getElementVisibility(element) {
    if (!element) return 0;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // If element is not in viewport at all
    if (rect.bottom < 0 || rect.top > windowHeight) {
      return 0;
    }
    
    // Calculate how much of the element is visible (0 to 1)
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const elementHeight = rect.height;
    
    return visibleHeight / elementHeight;
  }

  // Scroll event listener
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Rotate candy based on scroll direction and amount
    if (candy) {
      // Calculate how much we scrolled since last time
      const scrollDiff = scrollTop - lastScrollTop;
      
      // Update rotation based on scroll amount (adjust multiplier for sensitivity)
      candyRotation += scrollDiff * 0.5;
      
      // Apply rotation
      candy.style.transform = `rotate(${candyRotation}deg)`;
    }
    
    // Handle fun facts visibility based on scroll position
    if (funFactsList) {
      const listVisibility = getElementVisibility(funFactsList);
      
      // If list is at least partially visible
      if (listVisibility > 0) {
        // Calculate which items should be visible based on scroll position
        const totalItems = funFactItems.length;
        const itemsToShow = Math.ceil(listVisibility * totalItems);
        
        // Show or hide items based on scroll position
        funFactItems.forEach((item, index) => {
          if (index < itemsToShow) {
            // Show this item
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          } else {
            // Hide this item
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
          }
        });
      } else {
        // Hide all items if list is not visible
        funFactItems.forEach(item => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
        });
      }
    }
    
    // Update last scroll position
    lastScrollTop = scrollTop;
  });
  
  // Trigger initial check
  window.dispatchEvent(new Event('scroll'));
});
