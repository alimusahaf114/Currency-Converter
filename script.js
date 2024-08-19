const url = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD&to=EUR%';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'e74798e4b8mshbb55ec409a0227ap133863jsn50fc1ff53d66',
        'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
    }
};

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const froCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");

// Populate dropdown options (assuming countryList is predefined)
for (let select of dropdown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        if (select.name === "to" && currCode === "PKR") {
            newOption.selected = "selected";
        }
        select.appendChild(newOption);
    }

    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let msgDisplay = document.getElementById("msg");
    let amountvl = amount.value;
    if (amountvl === "" || amountvl < 1) {
        amountvl = 1;
        amount.value = "1";
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        const rates = data.rates;  // Assuming 'rates' contains the exchange rates
        const fromCurrency = froCur.value;
        const toCurrency = toCur.value;

        if (rates[fromCurrency] && rates[toCurrency]) {
            const rateFrom = rates[fromCurrency];
            const rateTo = rates[toCurrency];
            const conversionRate = rateTo / rateFrom;
            const convertedAmount = (amountvl * conversionRate).toFixed(2);
            msgDisplay.textContent = ` Converted Amount:  ${convertedAmount} ${toCurrency}`;


        } else {
            console.error("Currency not found in the exchange rates.");
        }
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
    }
});
