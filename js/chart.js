// chart.js

let categoryChart = null;

export function updateChart(transactionsList) {
  const categoryTotals = {};

  transactionsList.forEach(tx => {
    if (tx.amount >= 0) {
      categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
    }
  });

  const categories = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);

  const colors = ['#34d399', '#60a5fa', '#facc15', '#a78bfa', '#fb923c', '#4ade80'];

  if (categoryChart) categoryChart.destroy();

  const ctx = document.getElementById('categoryChart').getContext('2d');

  categoryChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: categories,
      datasets: [{
        label: 'Income by Category',
        data: values,
        backgroundColor: colors.slice(0, categories.length),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}
