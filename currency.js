const baseurl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")


for (let select of dropdown) {
    for (curCode in countrylist) {
        let newOption = document.createElement("option");
        newOption.value = curCode;
        newOption.innerText = curCode;
        if (select.name === "from" && curCode === "USD") {
            newOption.selected = "selected";
        } if (select.name === "to" && curCode === "INR") {
            newOption.selected = "select";
        }
        select.append(newOption);

    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    let currcode = element.value
    let countrycode = countrylist[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = newsrc;
}

const updateExchangeRate = async function () {
    let amount = document.querySelector(".amount input")
    let amtval = amount.value;
    // console.log(amtval);
    if (amtval === "" || amtval < 1) {
        amount.value = 1;
        amtval = 1;
    }

    const url = `${baseurl}/${fromcurr.value.toLowerCase()}.json`;

    let response = await fetch(url)
    let data = await response.json()
    let rate = data[`${fromcurr.value.toLowerCase()}`][`${tocurr.value.toLowerCase()}`]
    // console.log(rate)

    let finalamount = amtval * rate;
    msg.innerText = `${amtval}${fromcurr.value} = ${finalamount}${tocurr.value}`
    // console.log(finalamount)
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate()

})

window.addEventListener("load", () => {
    updateExchangeRate()
})