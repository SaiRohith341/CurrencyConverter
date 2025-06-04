
let dropdowns = document.querySelectorAll("select");
let fromcurr=document.querySelector(".from select")
let tocurr=document.querySelector(".to select")

for (let select of dropdowns) {
 for (let currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if(select.name==="from" && currcode==="USD"){
      newOption.selected="selected";
    }
    else if(select.name==="to" && currcode==='INR'){
       newOption.selected="selected"
    }
    select.appendChild(newOption);
  }
  select.addEventListener('change',(evt)=>{
    changeFlag(evt.target)
  })
}

const changeFlag=(event)=>{
  let cucode=event.value;
  let countrycode=countryList[cucode];
  let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`
  let img=event.parentElement.querySelector("img")
  img.src=newsrc
};

document.querySelector(".btn").addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amtval = document.querySelector(".amount input").value;
  let fromcurr = document.querySelector(".from select").value.toLowerCase();
  let tocurr = document.querySelector(".to select").value.toLowerCase();

  const date = "2025-06-03"; // You can also make this dynamic
  const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${fromcurr}.json`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    const rate = data[fromcurr][tocurr];
    const finalAmount = amtval * rate;

    document.querySelector(".msg").innerText =
      `${amtval} ${fromcurr.toUpperCase()} = ${finalAmount.toFixed(2)} ${tocurr.toUpperCase()}`;
  } catch (error) {
    console.error("API error:", error);
    document.querySelector(".msg").innerText = "Error fetching exchange rate.";
  }
});


