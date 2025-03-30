// Legendary Trainings & Activities JavaScript

document.addEventListener('DOMContentLoaded', () => {
    /* ------------- Trainings Section Filtering ------------- */
    const trainingFilterBtns = document.querySelectorAll('.trainings-filter .filter-btn');
    const trainingCards = document.querySelectorAll('.training-card');
  
    trainingFilterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        // Update active filter button
        trainingFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filterValue = this.getAttribute('data-filter');
  
        trainingCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (filterValue === 'all' || cardCategory === filterValue) {
            card.style.display = 'block';
            // Optional: add fade-in animation class if desired
            card.classList.remove('hide');
            card.classList.add('show');
          } else {
            card.style.display = 'none';
            card.classList.remove('show');
            card.classList.add('hide');
          }
        });
      });
    });
  
    /* ------------- Activities Section Tabs ------------- */
    const tabButtons = document.querySelectorAll('.activities-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.activities-content .tab-content');
  
    tabButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        tabButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
  
        tabContents.forEach(content => {
          if (content.id === tabId) {
            content.classList.add('active');
          } else {
            content.classList.remove('active');
          }
        });
      });
    });
  
    /* ------------- Activities Section Search & Filter ------------- */
    const searchInput = document.getElementById('activity-search');
    const activityFilterSelect = document.getElementById('activity-filter');
  
    // Function to filter activity cards based on search text and dropdown selection
    function filterActivityCards() {
      const searchText = searchInput.value.toLowerCase();
      const filterType = activityFilterSelect.value; // e.g., 'all', 'leadership', etc.
  
      // Get currently active tab content
      const activeTab = document.querySelector('.activities-content .tab-content.active');
      if (!activeTab) return;
      const activityCards = activeTab.querySelectorAll('.activity-card');
  
      activityCards.forEach(card => {
        const cardText = card.getAttribute('data-activity-search').toLowerCase();
        const cardType = card.getAttribute('data-activity-type') || '';
        // Check if search text is included and if card type matches filter (or filter is 'all')
        const matchesSearch = cardText.includes(searchText);
        const matchesFilter = (filterType === 'all' || cardType === filterType);
        
        if (matchesSearch && matchesFilter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
  
    // Search input event
    if (searchInput) {
      searchInput.addEventListener('input', filterActivityCards);
    }
    // Filter dropdown event
    if (activityFilterSelect) {
      activityFilterSelect.addEventListener('change', filterActivityCards);
    }
  
    /* ------------- (Optional) Map Functionality ------------- */
    // This is a placeholder for integrating an interactive map.
    // You can integrate a mapping library (e.g., Leaflet or Google Maps) to display markers in the .map-markers container.
  });
  