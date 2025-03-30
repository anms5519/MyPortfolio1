// Footer Section JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Update current year dynamically
    const currentYearElem = document.getElementById('current-year');
    if (currentYearElem) {
      currentYearElem.textContent = new Date().getFullYear();
    }
    
    // Scroll to Top functionality
    const scrollTopButton = document.getElementById('footer-scroll-top');
    if (scrollTopButton) {
      scrollTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    
    // Footer Particles Effect
    const particlesContainer = document.querySelector('.footer-particles');
    if (particlesContainer) {
      const canvas = document.createElement('canvas');
      canvas.width = particlesContainer.offsetWidth;
      canvas.height = particlesContainer.offsetHeight;
      particlesContainer.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      let particles = [];
      const particleCount = 50;
      
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.radius = Math.random() * 2 + 1;
          this.dx = (Math.random() - 0.5) * 1.5;
          this.dy = (Math.random() - 0.5) * 1.5;
          this.alpha = Math.random() * 0.5 + 0.5;
        }
        draw() {
          ctx.save();
          ctx.globalAlpha = this.alpha;
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        update() {
          this.x += this.dx;
          this.y += this.dy;
          if (this.x < 0) this.x = canvas.width;
          if (this.x > canvas.width) this.x = 0;
          if (this.y < 0) this.y = canvas.height;
          if (this.y > canvas.height) this.y = 0;
          this.draw();
        }
      }
      
      function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      }
      
      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => p.update());
        requestAnimationFrame(animateParticles);
      }
      
      initParticles();
      animateParticles();
      
      window.addEventListener('resize', () => {
        canvas.width = particlesContainer.offsetWidth;
        canvas.height = particlesContainer.offsetHeight;
        initParticles();
      });
    }
  });
  