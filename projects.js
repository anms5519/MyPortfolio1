// Projects Section JavaScript
document.addEventListener('DOMContentLoaded', () => {
    /* --- View Toggle Functionality --- */
    const viewButtons = document.querySelectorAll('.project-view-toggle .view-btn');
    const projectsGrid = document.querySelector('.projects-grid-view');
    
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state on view buttons
        viewButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Retrieve selected view (grid, list, carousel, 3d)
        const view = btn.getAttribute('data-view');
        
        // Set data attribute or class on container for styling
        projectsGrid.setAttribute('data-view', view);
        
        // (Optional) Additional logic for specific view modes
        if(view === '3d'){
          // Activate 3D scene view if needed
          console.log('3D view activated');
        } else {
          console.log(view + ' view activated');
        }
      });
    });
  
    /* --- Project Filters --- */
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(filterBtn => {
      filterBtn.addEventListener('click', () => {
        // Set active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        filterBtn.classList.add('active');
        
        const filter = filterBtn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category').split(' ');
          if(filter === 'all' || categories.includes(filter)) {
            card.style.display = 'block';
            card.setAttribute('data-aos', 'fade-up'); // re-trigger animation if using AOS
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
    
    /* --- Details Button Modal (Simple Alert) --- */
    const detailButtons = document.querySelectorAll('.details-btn');
    detailButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const title = btn.getAttribute('data-title');
        const description = btn.getAttribute('data-description');
        alert(title + "\n\n" + description);
      });
    });
    
    /* --- Background Particles Effect --- */
    const bgParticlesContainer = document.querySelector('.bg-particles');
    if (bgParticlesContainer) {
      const canvas = document.createElement('canvas');
      canvas.width = bgParticlesContainer.offsetWidth;
      canvas.height = bgParticlesContainer.offsetHeight;
      bgParticlesContainer.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      
      let particles = [];
      const particleCount = 60;
      
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.radius = Math.random() * 2 + 1;
          this.dx = (Math.random() - 0.5) * 1.2;
          this.dy = (Math.random() - 0.5) * 1.2;
          this.alpha = Math.random() * 0.5 + 0.5;
        }
        draw() {
          ctx.save();
          ctx.globalAlpha = this.alpha;
          ctx.fillStyle = '#f5576c';
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
        particles.forEach(p => p.update());
        requestAnimationFrame(animateParticles);
      }
      
      initParticles();
      animateParticles();
      
      window.addEventListener('resize', () => {
        canvas.width = bgParticlesContainer.offsetWidth;
        canvas.height = bgParticlesContainer.offsetHeight;
        initParticles();
      });
    }
  });
  