// Work Experience Section JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Animate Experience Meters: fill to specified width
    const meters = document.querySelectorAll('.experience-meter .meter-fill');
    meters.forEach(meter => {
      const targetWidth = meter.style.width;
      meter.style.width = '0';
      setTimeout(() => {
        meter.style.width = targetWidth;
      }, 300);
    });
  
    // Timeline Progress Indicator: update progress ball position on scroll
    const workSection = document.getElementById('work');
    const progressBall = workSection.querySelector('.progress-ball');
    const timelineIndicator = workSection.querySelector('.timeline-progress-indicator');
  
    function updateProgressBall() {
      const sectionRect = workSection.getBoundingClientRect();
      const progress = Math.min(Math.max(-sectionRect.top, 0), sectionRect.height);
      progressBall.style.transform = `translateY(${progress - 9}px)`; // Adjust ball offset for centering
    }
  
    window.addEventListener('scroll', updateProgressBall);
    window.addEventListener('resize', updateProgressBall);
    updateProgressBall();
  
    // Optional: Re-trigger AOS animations on timeline cards when they enter view
    const timelineCards = document.querySelectorAll('.timeline-card');
    const observerOptions = {
      threshold: 0.3
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.setAttribute('data-aos', 'fade-up');
        }
      });
    }, observerOptions);
    timelineCards.forEach(card => observer.observe(card));
  });
  