// Legendary Certifications JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.certifications-filter .filter-btn');
    const certificateCards = document.querySelectorAll('.certificate-card');
  
    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        // Remove active class from all filter buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
  
        const filterValue = this.getAttribute('data-filter');
  
        certificateCards.forEach(card => {
          const category = card.getAttribute('data-category');
  
          if (filterValue === 'all' || category === filterValue) {
            // Show matching cards
            card.style.display = 'block';
            // Optionally, add animation classes here
            card.classList.remove('hide');
            card.classList.add('show');
          } else {
            // Hide non-matching cards
            card.style.display = 'none';
            card.classList.remove('show');
            card.classList.add('hide');
          }
        });
      });
    });
  });
  