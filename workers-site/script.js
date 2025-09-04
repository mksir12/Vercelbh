// Simple ApexCharts example
let options = {
    chart: {
        type: 'line',
        height: 350
    },
    series: [{
        name: 'Sales',
        data: [10, 41, 35, 51, 49, 62, 69]
    }],
    xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
};

let chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

// Update chart on button click
document.getElementById("updateBtn").addEventListener("click", () => {
    chart.updateSeries([{
        data: Array.from({length: 7}, () => Math.floor(Math.random() * 100))
    }]);
});
