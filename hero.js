// Hero Section JavaScript - Particle Animation & Interactive Effects

document.addEventListener('DOMContentLoaded', () => {
    /* Particle Animation */
    const particleContainer = document.querySelector('.particle-container');
    if (particleContainer) {
      const canvas = document.createElement('canvas');
      canvas.width = particleContainer.offsetWidth;
      canvas.height = particleContainer.offsetHeight;
      particleContainer.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      
      let particles = [];
      const particleCount = 80;
      
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.radius = Math.random() * 2 + 1;
          this.dx = (Math.random() - 0.5) * 2;
          this.dy = (Math.random() - 0.5) * 2;
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
          
          // Wrap around edges
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
        particles.forEach(particle => particle.update());
        requestAnimationFrame(animateParticles);
      }
      
      initParticles();
      animateParticles();
      
      window.addEventListener('resize', () => {
        canvas.width = particleContainer.offsetWidth;
        canvas.height = particleContainer.offsetHeight;
        initParticles();
      });
    }
    
    /* Smooth Scroll for Navigation Bubbles */
    const navBubbles = document.querySelectorAll('.nav-bubble');
    navBubbles.forEach(bubble => {
      bubble.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionID = bubble.getAttribute('href');
        document.querySelector(sectionID).scrollIntoView({ behavior: 'smooth' });
      });
    });
  });
  