// Legendary Languages Section JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // FLIP FUNCTIONALITY FOR LANGUAGE CARDS
    const languageCards = document.querySelectorAll('.language-card');
    
    languageCards.forEach(card => {
      card.addEventListener('click', function (e) {
        // Prevent propagation if click is on a link inside the card (if any)
        if (e.target.tagName.toLowerCase() === 'a') return;
        this.classList.toggle('flipped');
      });
    });
    
    // INITIALIZE RADAR CHART USING Chart.js
    const radarCanvas = document.getElementById('languageRadarChart');
    if (radarCanvas) {
      // Sample data for each language (values match proficiency shown in the cards)
      const radarData = {
        labels: ['Bengali', 'English', 'Hindi', 'Urdu', 'Arabic'],
        datasets: [{
          label: 'Proficiency (%)',
          data: [100, 93, 82, 68, 38],
          backgroundColor: 'rgba(255, 193, 7, 0.2)',
          borderColor: '#ffc107',
          borderWidth: 2,
          pointBackgroundColor: '#ffc107'
        }]
      };
  
      const radarOptions = {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              backdropColor: 'transparent',
              color: '#ccc'
            },
            grid: {
              color: 'rgba(255,255,255,0.1)'
            },
            angleLines: {
              color: 'rgba(255,255,255,0.1)'
            },
            pointLabels: {
              color: '#ffc107',
              font: {
                size: 14
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#ccc'
            }
          }
        }
      };
  
      // Create Radar Chart
      new Chart(radarCanvas, {
        type: 'radar',
        data: radarData,
        options: radarOptions
      });
    }
  });
  