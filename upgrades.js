// --- 1. GSAP Animations ---
// Make sure to include GSAP in your HTML head, e.g.:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
gsap.from(".section-title", { duration: 1, y: -50, opacity: 0, ease: "power2.out", stagger: 0.2 });
gsap.from(".section-subtitle", { duration: 1, y: 50, opacity: 0, ease: "power2.out", delay: 0.5 });

// --- 2. Dark Mode Toggle ---
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}
// On load, check theme preference
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}

// --- 3. Smooth Navigation Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- 4. Parallax Effect ---
// Add class "parallax" and data attribute "data-parallax-speed" (e.g., 0.5) to elements you want to animate.
window.addEventListener('scroll', function() {
  const parallaxElements = document.querySelectorAll('.parallax');
  parallaxElements.forEach(el => {
    const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.5;
    el.style.transform = `translateY(${window.scrollY * speed}px)`;
  });
});

// --- 5. PWA Service Worker Registration ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
});
