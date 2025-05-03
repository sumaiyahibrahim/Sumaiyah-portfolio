import { gsap } from "https://cdn.skypack.dev/gsap@3.11.5";

document.addEventListener("DOMContentLoaded", () => {
    const facts = [
        "🤖 I like building things that make people go: 'Wait… you built that?'",
        "🚀 My side projects are either 90% done or 0.1% started. No in-between.",
        "🎉 I quietly celebrate when something works on the first try — rare, but god-tier satisfying.",
        "🔧 I keep improving projects even after they're 'done.'",
        "🗂️ My desktop has 30 folders named: final, final2, final_final, thisOneFr.",
        "🤖 I always ask AI for advice… like it's my therapist AND life coach.",
        "🌙 I rethink every design decision like it's a life crisis — always at 2 AM.",
        "🔁 I refresh Dribbble for 'inspiration'... then redo everything."
    ];

    const fact1 = document.getElementById("fact1");
    const fact2 = document.getElementById("fact2");

    function getRandomFacts() {
        const shuffled = facts.sort(() => 0.5 - Math.random());
        return [shuffled[0], shuffled[1]];
    }

    function showFacts() {
        const [f1, f2] = getRandomFacts();
        fact1.textContent = f1;
        fact2.textContent = f2;
    }

    // Display initial facts
    showFacts();
    
    // Fun Facts Card Animation
    const funFactCard = document.querySelector('.fun-fact-card');
    const factsItems = document.querySelectorAll('.fun-facts-list li');

    // Only proceed if elements exist
    if (funFactCard && factsItems.length > 0) {
        // Initially hide all facts
        factsItems.forEach(fact => {
            fact.classList.remove('visible');
        });
        funFactCard.classList.remove('show');

        // Detect when the card is in the viewport
        const cardInView = () => {
            const rect = funFactCard.getBoundingClientRect();
            return rect.top <= window.innerHeight && rect.bottom >= 0;
        };

        // Show facts when the card is in the viewport
        const revealFacts = () => {
            if (cardInView()) {
                funFactCard.classList.add('show'); // Show the pink card and expand it
                factsItems.forEach((fact, index) => {
                    setTimeout(() => {
                        fact.classList.add('visible'); // Fade in the facts one by one
                    }, index * 300); // Stagger the animations by 300ms
                });
            }
        };

        // Hide facts when they scroll out of view
        const hideFacts = () => {
            if (!cardInView()) {
                funFactCard.classList.remove('show'); // Collapse the pink card
                factsItems.forEach(fact => {
                    fact.classList.remove('visible'); // Fade out the facts
                });
            }
        };

        // Listen for the scroll event to trigger the animations
        window.addEventListener('scroll', () => {
            revealFacts();
            hideFacts();
        });

        // Check on page load and resize
        setTimeout(revealFacts, 500);
        window.addEventListener('resize', () => {
            revealFacts();
        });
    }
  
  // Fun Facts Scroll Effect
  const funFactsList = document.querySelector('.fun-facts-list');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // If we're scrolling down and past the fun facts section
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      funFactsList.classList.add('hidden');
    } else {
      // If we're scrolling back up to the top
      if (scrollTop < 100) {
        funFactsList.classList.remove('hidden');
      }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // Learning & Growing Section - Scroll Reveal
  // Get  // Register GSAP ScrollTrigger plugin if not already registered
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Get all learning items
    const learningItems = document.querySelectorAll('.learning-item');
    
    // Apply active class to the first learning item by default
    if (learningItems.length > 0) {
      learningItems[0].classList.add('active');
      
      // Animate the progress bar in the first item if it exists
      const firstProgressFill = learningItems[0].querySelector('.progress-fill');
      if (firstProgressFill) {
        gsap.fromTo(firstProgressFill, 
          { width: '0%' },
          { width: firstProgressFill.style.width || '42%', duration: 1.5, ease: 'power2.out', delay: 0.5 }
        );
      }
    }
    
    // Create scroll triggers for each learning item
    learningItems.forEach((item, index) => {
      // Create a scroll trigger for each item
      ScrollTrigger.create({
        trigger: item,
        start: 'top 60%', // When the top of the item is 60% from the top of the viewport
        end: 'bottom 20%', // When the bottom of the item is 20% from the top of the viewport
        onEnter: () => {
          // Add active class to current item, remove from others
          learningItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          
          // Animate the progress bar if it exists
          const progressFill = item.querySelector('.progress-fill');
          if (progressFill && index !== 0) { // Skip first item as it's already animated
            gsap.fromTo(progressFill, 
              { width: '0%' },
              { width: progressFill.style.width || '42%', duration: 1.5, ease: 'power2.out' }
            );
          }
          
          // Animate the heatmap cells if they exist
          const heatmapCells = item.querySelectorAll('.heatmap-cell');
          if (heatmapCells.length) {
            gsap.from(heatmapCells, {
              scale: 0,
              opacity: 0,
              duration: 0.5,
              stagger: 0.02,
              ease: 'back.out(1.7)'
            });
          }
        },
        onEnterBack: () => {
          // Add active class to current item, remove from others
          learningItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
        }
      });
      
      // Create parallax effect for the background
      gsap.to(item.querySelector('.learning-background'), {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
    
    // Create a scroll-linked animation for the floating icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
      gsap.to(icon, {
        y: -10 + (index * 5),
        x: 5 - (index * 3),
        rotation: 5 - (index * 2),
        scrollTrigger: {
          trigger: icon.parentElement,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1
        }
      });
    });
  }
  
  // Typewriter effect for the title
  const learningTitle = document.querySelector('.learning-title');
  if (learningTitle) {
    // The title animation is handled with CSS, but we can add a class when it's in view
    ScrollTrigger.create({
      trigger: '.learning-title-container',
      start: 'top 80%',
      onEnter: () => learningTitle.classList.add('visible')
    });
  }

  // Skills Progress Bar Animation
  const skillRows = document.querySelectorAll('.skill-row');
  
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  // Initially set width to 0
  skillRows.forEach(row => {
    const progressFill = row.querySelector('.skill-progress-fill');
    const targetWidth = progressFill.style.width;
    progressFill.style.width = '0';
    progressFill.dataset.targetWidth = targetWidth;
  });
  
  // Function to animate progress bars
  function animateProgressBars() {
    skillRows.forEach(row => {
      if (isInViewport(row)) {
        const progressFill = row.querySelector('.skill-progress-fill');
        if (progressFill.style.width === '0px') {
          setTimeout(() => {
            progressFill.style.width = progressFill.dataset.targetWidth;
          }, 300);
        }
      }
    });
  }
  
  // Run on page load
  setTimeout(animateProgressBars, 500);
  
  // Run on scroll
  window.addEventListener('scroll', animateProgressBars);

  // Tech Toolbox Card Animation
  const techToolboxCard = document.querySelector('.card:nth-child(5)');
  
  function handleScroll() {
    const cardRect = techToolboxCard.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if card is in viewport
    if (cardRect.top < windowHeight * 0.7 && cardRect.top > -cardRect.height * 0.3) {
      techToolboxCard.classList.add('enlarged');
    } else {
      techToolboxCard.classList.remove('enlarged');
    }
  }
  
  // Initial check
  handleScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Hire Me Card Fullscreen Transition
  const hireCard = document.getElementById('hire-me-card');
  const closeButton = document.getElementById('close-fullscreen');
  let scrollPosition = 0;
  
  if (!hireCard || !closeButton) return;
  
  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When card is 70% visible
      if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
        // Store current scroll position before going fullscreen
        scrollPosition = window.scrollY;
        
        // Add fullscreen class with a small delay for better UX
        setTimeout(() => {
          hireCard.classList.add('fullscreen');
          document.body.classList.add('no-scroll');
        }, 200);
      }
    });
  }, {
    threshold: 0.7 // Trigger when 70% visible
  });
  
  // Start observing the hire me card
  observer.observe(hireCard);
  
  // Close fullscreen when clicking the close button
  closeButton.addEventListener('click', () => {
    hireCard.classList.remove('fullscreen');
    document.body.classList.remove('no-scroll');
    
    // Restore scroll position after a short delay
    setTimeout(() => {
      window.scrollTo({
        top: scrollPosition,
        behavior: 'auto'
      });
    }, 100);
  });
  
  // Close fullscreen when pressing ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && hireCard.classList.contains('fullscreen')) {
      closeButton.click();
    }
  });
});
