// Legendary Interests Section JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Tab Switching Functionality
  const interestTabs = document.querySelectorAll('.interest-tab');
  const tabContents = document.querySelectorAll('.tabs-content .tab-content');
  
  interestTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Remove active state from all tabs
      interestTabs.forEach(t => t.classList.remove('active'));
      // Add active state to clicked tab
      this.classList.add('active');
      
      // Get the target tab content id from data-tab attribute
      const target = this.getAttribute('data-tab') + '-content';
      
      // Show only the target tab content
      tabContents.forEach(content => {
        if (content.id === target) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
  
  // (Optional) Initialize VanillaTilt for card tilt effects if the library is loaded
  if (typeof VanillaTilt !== 'undefined') {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    VanillaTilt.init(tiltElements, {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3
    });
  }
  
  // (Optional) Floating Elements Parallax Effect
  // This demo uses a simple scroll event to add a parallax feel.
  const floatElements = document.querySelectorAll('.float-element');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    floatElements.forEach(el => {
      const depth = el.getAttribute('data-depth');
      // Adjust the translation based on scroll position and data-depth value
      el.style.transform = `translateY(${scrollY * depth}px) translateX(0)`;
    });
  });
});
