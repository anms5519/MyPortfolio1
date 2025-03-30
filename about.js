// About Section Interactivity
document.addEventListener('DOMContentLoaded', () => {
    /* Typing Effect */
    const typedText = document.querySelector('#about .typed-text');
    const cursor = document.querySelector('#about .cursor');
    const textArray = [
      'Innovator.',
      'Tech Enthusiast.',
      'Digital Artisan.',
      'Future Architect.'
    ];
    const typingDelay = 150;
    const erasingDelay = 80;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
  
    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        if (!cursor.classList.contains('typing')) cursor.classList.add('typing');
        typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        cursor.classList.remove('typing');
        setTimeout(erase, newTextDelay);
      }
    }
  
    function erase() {
      if (charIndex > 0) {
        if (!cursor.classList.contains('typing')) cursor.classList.add('typing');
        typedText.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        cursor.classList.remove('typing');
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, typingDelay + 1100);
      }
    }
  
    if (typedText) {
      setTimeout(type, newTextDelay + 250);
    }
  
    /* Counter Animation */
    const counters = document.querySelectorAll('#about .counter-number');
    const animateCounters = () => {
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-count');
          const count = +counter.innerText;
          const increment = target / 200;
          if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
    };
  
    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(aboutSection);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(aboutSection);
  
    /* Particle Effect on Canvas */
    const canvas = document.querySelector('#about .image-particles');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let particles = [];
      const particleCount = 50;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
  
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.radius = Math.random() * 2 + 1;
          this.dx = (Math.random() - 0.5) * 1.5;
          this.dy = (Math.random() - 0.5) * 1.5;
          this.alpha = Math.random();
        }
        draw() {
          ctx.save();
          ctx.globalAlpha = this.alpha;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          ctx.fillStyle = '#fff';
          ctx.fill();
          ctx.restore();
        }
        update() {
          if (this.x < 0 || this.x > canvas.width) this.dx = -this.dx;
          if (this.y < 0 || this.y > canvas.height) this.dy = -this.dy;
          this.x += this.dx;
          this.y += this.dy;
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
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        initParticles();
      });
    }
  });
  