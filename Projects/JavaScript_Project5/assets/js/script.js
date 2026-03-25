//var global per grafico
let chartInstance;

//convertitore
async function convertCurrency() {
    const inputAmount = parseFloat(document.getElementById('amount').value);
    const selectedCurrency = document.getElementById('currency').value;
    const resultDisplay = document.getElementById('result');

    if (!inputAmount || inputAmount <= 0) {
        resultDisplay.textContent = 'What are you trying to do?';
        return;
    }

    try {
        const response = await fetch('https://mindicador.cl/api/');
        const data = await response.json();

        let conversionRate;

        if (selectedCurrency === 'euro') {
            conversionRate = data.euro.valor;
        }

        else if (selectedCurrency === 'dolar') {
            conversionRate = data.dolar.valor;
        }

        //tofixed per arrotondare a 2 decimali
        const convertedAmount = (inputAmount / conversionRate).toFixed(2);
        resultDisplay.innerText = `Result: ${convertedAmount} ${selectedCurrency === 'euro' ? '€' : '$'}`;

        //chiama funzione grafico
        renderChart(selectedCurrency)
    }

    catch (error) {
        alert('There was an error connecting to the API. Please try again later.');
    }
}

//grafico
async function renderChart(selectedCurrency) {
    try {
    const response = await fetch (`https://mindicador.cl/api/${selectedCurrency}`);
    const data = await response.json();
    console.log("data grafico:",JSON.stringify(data,null,4))
    //ottenere date
    const reverseData = data.serie.slice(0,10).reverse()
    const labels = reverseData.map (item => item.fecha.slice(0,10));
    const values = reverseData.map (item => item.valor);

    if (chartInstance){
    chartInstance.destroy()
    } //elimina grafico se già creato

    const ctx = document.getElementById("myChart").getContext("2d");
    chartInstance = new Chart (ctx,{
        type: "line",
        data: {
        labels: labels,
        datasets: [{
            label: `Trend over the last 10 days (${selectedCurrency}) `,
            data: values,
            borderColor: "rgb(75,192,192)",
            tension: 0.1
        }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 0
                    }
                }
            }
        }

    } )
   }

    catch (error) {
    alert('There was an error connecting to the API. Please try again later.');
    }
}