// Legendary Skills Section JavaScript
document.addEventListener('DOMContentLoaded', () => {
  /* CATEGORY FILTERING */
  const skillTabs = document.querySelectorAll('.skill-category-tabs .skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Update active tab
      skillTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const selectedCategory = this.getAttribute('data-category');

      // Show/hide cards based on data-category
      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* DISPLAY MODE TOGGLING */
  const displayButtons = document.querySelectorAll('.skill-display-toggle .display-btn');
  const gridDisplay = document.querySelector('.skills-grid-display');
  const chartDisplay = document.querySelector('.skills-chart-display');
  const timelineDisplay = document.querySelector('.skills-timeline-display');

  function updateDisplay(displayMode) {
    // Remove active class from all display containers
    [gridDisplay, chartDisplay, timelineDisplay].forEach(display => {
      display.classList.remove('active');
    });
    // Show selected display container
    if (displayMode === 'grid') gridDisplay.classList.add('active');
    else if (displayMode === 'chart') chartDisplay.classList.add('active');
    else if (displayMode === 'timeline') timelineDisplay.classList.add('active');
  }

  displayButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      displayButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const displayMode = this.getAttribute('data-display');
      updateDisplay(displayMode);
    });
  });

  /* CHART DISPLAY INITIALIZATION */
  let skillsChart;
  const chartCanvas = document.getElementById('skills-chart');

  // Sample data – adjust these values and labels as needed
  const chartData = {
    labels: ['Technical', 'Design', 'Programming', 'Data', 'Interpersonal'],
    datasets: [{
      label: 'Skill Proficiency (%)',
      data: [90, 85, 88, 89, 92],
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
      borderColor: '#007BFF',
      borderWidth: 2,
      pointBackgroundColor: '#007BFF'
    }]
  };

  // Default chart type is Radar
  function initSkillsChart(chartType = 'radar') {
    if (skillsChart) skillsChart.destroy();
    skillsChart = new Chart(chartCanvas, {
      type: chartType,
      data: chartData,
      options: {
        responsive: true,
        scales: (chartType === 'bar' || chartType === 'polar') ? {
          r: { 
            beginAtZero: true,
            max: 100
          }
        } : {}
      }
    });
  }

  // Initialize chart if canvas exists
  if (chartCanvas) initSkillsChart();

  // Chart type toggle
  const chartTypeButtons = document.querySelectorAll('.chart-types button');
  chartTypeButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      chartTypeButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const newType = this.getAttribute('data-chart');
      initSkillsChart(newType);
    });
  });

  // (Optional) Chart category filtering – update chart data if needed
  const chartCategoryButtons = document.querySelectorAll('.chart-categories button');
  chartCategoryButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      chartCategoryButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      // For demo, this example doesn’t change the chart dataset.
      // You could update chartData.datasets[0].data here based on category selection and then call skillsChart.update();
    });
  });
});
