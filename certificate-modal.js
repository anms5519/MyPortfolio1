// Legendary Certificate Modal JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('certificate-modal');
    const closeBtn = document.querySelector('.close-btn');
  
    // Function to open modal with certificate details
    function openCertificateModal(title, date, imageSrc, downloadLink, verifyLink) {
      document.getElementById('certificate-modal-title').textContent = title;
      document.getElementById('certificate-modal-date').textContent = date;
      document.getElementById('certificate-image').src = imageSrc;
      document.getElementById('download-certificate').href = downloadLink;
      document.getElementById('verify-certificate').href = verifyLink;
      modal.style.display = 'block';
    }
  
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    // Example: Attach event listeners to certificate cards for demo purposes
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
      card.addEventListener('click', () => {
        // Extract dynamic data from attributes and inner elements
        const title = card.getAttribute('data-title');
        const date = card.querySelector('.cert-date') ? card.querySelector('.cert-date').textContent : '';
        const imageSrc = card.getAttribute('data-img');
        // Use placeholder links or update as needed
        const downloadLink = '#';
        const verifyLink = '#';
        
        openCertificateModal(title, date, imageSrc, downloadLink, verifyLink);
      });
    });
  });
  