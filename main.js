document.addEventListener('DOMContentLoaded', function() {
    // Remove preloader once the window fully loads
    window.addEventListener('load', function() {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
      }
    });
    
    // Toggle Slide Menu
    const navToggle = document.getElementById('nav-toggle');
    const slideMenu = document.getElementById('slide-menu');
    if (navToggle && slideMenu) {
      navToggle.addEventListener('click', function() {
        slideMenu.classList.toggle('active');
      });
    }
    
    // Simple Canvas Background Animation
    const canvas = document.getElementById('bg-canvas');
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      let particles = [];
      const particleCount = 100;
      
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.radius = Math.random() * 2 + 1;
          this.dx = (Math.random() - 0.5) * 1;
          this.dy = (Math.random() - 0.5) * 1;
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(245,87,108,0.7)';
          ctx.fill();
        }
        update() {
          this.x += this.dx;
          this.y += this.dy;
          if (this.x < 0 || this.x > canvas.width) this.dx = -this.dx;
          if (this.y < 0 || this.y > canvas.height) this.dy = -this.dy;
          this.draw();
        }
      }
      
      function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      }
      
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => particle.update());
        requestAnimationFrame(animate);
      }
      
      initParticles();
      animate();
      
      window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
      });
    }
  });
  