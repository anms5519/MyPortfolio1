// Legendary Gallery Lightbox JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Get all gallery links (anchors with .gallery-lightbox class)
    const galleryLinks = Array.from(document.querySelectorAll('.gallery-lightbox'));
    const totalImages = galleryLinks.length;
  
    // Modal elements
    const modal = document.getElementById('gallery-lightbox-modal');
    const modalImg = document.getElementById('gallery-modal-img');
    const captionTitle = document.getElementById('gallery-caption-title');
    const captionDescription = document.getElementById('gallery-caption-description');
    const currentCounter = document.getElementById('gallery-current');
    const totalCounter = document.getElementById('gallery-total');
    const btnPrev = document.getElementById('gallery-prev');
    const btnNext = document.getElementById('gallery-next');
    
    let currentIndex = 0;
    
    // Update total counter once
    if (totalCounter) totalCounter.textContent = totalImages;
  
    // Function to open modal for a given index
    function openModal(index) {
      currentIndex = index;
      const link = galleryLinks[index];
      // Use the href as the image source
      const imgSrc = link.getAttribute('href');
      modalImg.src = imgSrc;
      
      // Set captions from data attributes
      captionTitle.textContent = link.dataset.title || '';
      captionDescription.textContent = link.dataset.description || '';
      
      // Update current image counter
      currentCounter.textContent = index + 1;
      
      // Display modal
      modal.style.display = 'flex';
    }
    
    // Function to close modal
    function closeModal() {
      modal.style.display = 'none';
    }
    
    // Navigate to next image
    function showNext() {
      currentIndex = (currentIndex + 1) % totalImages;
      openModal(currentIndex);
    }
    
    // Navigate to previous image
    function showPrev() {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      openModal(currentIndex);
    }
    
    // Attach click event to each gallery link
    galleryLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(index);
      });
    });
    
    // Attach events to navigation buttons
    if (btnNext) {
      btnNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
      });
    }
    
    if (btnPrev) {
      btnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
      });
    }
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Expose closeModal to global scope (for inline close button)
    window.closeLightbox = closeModal;
    
    // Optionally, handle keyboard events for navigation
    document.addEventListener('keydown', (e) => {
      if (modal.style.display === 'flex') {
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'Escape') closeModal();
      }
    });
  });
  