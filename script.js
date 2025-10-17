const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


// Currency codes selection
for(let select of dropdowns) {
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"; 
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (eve) => {
        updateFlag(eve.target);
    });
}

// EX - 
// currCode = "INR"
// countryCode = "IN"

// Update flags based on currency codes 
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// UpdateExchange Rate function
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1 ){
        amtVal = 1;
        amount.value = 1;
    }
    
    // console.log(fromCurr.value, toCurr.value);
    let fromCurrVal = fromCurr.value;
    let toCurrVal = toCurr.value;
    const URL = `${BASE_URL}/${fromCurrVal.toLowerCase()}/${toCurrVal.toLowerCase()}.json`;
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    let rate = data[toCurrVal.toLowerCase()];
    
    let FinalAmount = amtVal * rate;
    // 1USD = 82.23INR
    msg.innerText = `${amtVal} ${fromCurrVal} = ${FinalAmount} ${toCurrVal}`;
};


// Get the exchange rate on button click
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
   updateExchangeRate();
});