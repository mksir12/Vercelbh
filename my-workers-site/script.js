document.addEventListener("DOMContentLoaded", () => {
  const options = {
    chart: {
      type: 'line'
    },
    series: [{
      name: 'Visitors',
      data: [10, 20, 15, 25, 30, 40, 35]
    }],
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  };

  const chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
});
