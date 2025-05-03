// Floating Elements Animation
document.addEventListener('DOMContentLoaded', function() {
  // Create floating elements container
  const floatingContainer = document.createElement('div');
  floatingContainer.className = 'floating-container';
  
  // Define floating elements with specific positions
  const floatingElements = [
    { 
      name: 'teddy', 
      src: './assets/teddyfloat.png', 
      class: 'teddy',
      startX: -30, // Less off-screen to make more of teddy visible
      startY: -20  // Less off-screen to make more of teddy visible
    },
    { 
      name: 'wheel', 
      src: './assets/wheel candy.png', 
      class: 'wheel',
      startX: 70, // Right side
      startY: 70
    },
    { 
      name: 'sparkle', 
      src: './assets/sparklefloat.png', 
      class: 'sparkle',
      startX: 25, // Left of Sumaiyah picture
      startY: 40
    },
    { 
      name: 'ribbon', 
      src: './assets/ribbonfloat.png', 
      class: 'ribbon',
      startX: 45, // Top of "Hi" text
      startY: 15
    },
    { 
      name: 'cloud', 
      src: './assets/cloudfloat.png', 
      class: 'cloud',
      startX: 80, // Far right
      startY: 10
    },
    { 
      name: 'heart', 
      src: './assets/heartfloat.png', 
      class: 'heart',
      startX: 40, // Bottom middle
      startY: 80
    },
    { 
      name: 'doggy', 
      src: './assets/doggy.png', 
      class: 'doggy',
      startX: -10, // Start from left side
      startY: 60   // Middle-bottom area
    },
    { 
      name: 'chocolate', 
      src: './assets/chocolate.png', 
      class: 'chocolate',
      startX: 90, // Start from right side
      startY: 30  // Middle-top area
    }
  ];
  
  // Create and append elements with specific initial positions
  const elementObjects = [];
  
  floatingElements.forEach(element => {
    const img = document.createElement('img');
    img.src = element.src;
    img.alt = element.name;
    img.className = `floating-element ${element.class}`;
    
    // Set initial position
    img.style.left = `${element.startX}%`;
    img.style.top = `${element.startY}%`;
    
    // Generate random end position (in the about section)
    const endX = Math.random() * 80 + 10; // 10% to 90%
    const endY = Math.random() * 80 + 120; // 120% to 200% (beyond viewport)
    
    // Store element data
    elementObjects.push({
      element: img,
      startX: element.startX,
      startY: element.startY,
      endX: endX,
      endY: endY,
      // Create random control points for curved path
      controlPoint1X: Math.random() * 100,
      controlPoint1Y: Math.random() * 100 + 50,
      controlPoint2X: Math.random() * 100,
      controlPoint2Y: Math.random() * 100 + 50
    });
    
    floatingContainer.appendChild(img);
  });
  
  // Add the container to the body
  document.body.appendChild(floatingContainer);
  
  // Get the about section position for reference
  const aboutSection = document.getElementById('about');
  const aboutSectionTop = aboutSection ? aboutSection.offsetTop : 1000;
  
  // Handle scroll events
  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const maxScroll = aboutSectionTop;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    
    // Update each element position based on scroll progress
    elementObjects.forEach(obj => {
      // Calculate position along Bezier curve
      const t = scrollProgress;
      const t1 = 1 - t;
      
      // Cubic Bezier curve formula
      const x = t1*t1*t1*obj.startX + 
               3*t1*t1*t*obj.controlPoint1X + 
               3*t1*t*t*obj.controlPoint2X + 
               t*t*t*obj.endX;
               
      const y = t1*t1*t1*obj.startY + 
               3*t1*t1*t*obj.controlPoint1Y + 
               3*t1*t*t*obj.controlPoint2Y + 
               t*t*t*obj.endY;
      
      // Apply the new position
      obj.element.style.left = `${x}%`;
      obj.element.style.top = `${y}%`;
      
      // Make elements fade out as user scrolls down
      obj.element.style.opacity = 1 - scrollProgress;
      
      // Prevent heart from scaling
      if (obj.element.className.includes('heart')) {
        obj.element.style.transform = 'scale(1)';
      }
    });
  });
});
