const billAmountInput = document.querySelector("#bill-amount");
const cashGivenInput = document.querySelector("#cash-given");
const cashGivenLabel = document.querySelector("#cash-given-label");
const checkButton = document.querySelector(".check-button");
const image = document.querySelector(".image");

const output = document.querySelector(".output");

let billAmount = "";
let cashGiven = "";
// cashGivenInput.style.display = "none";
// cashGivenLabel.style.display = "none";
//  cashGivenInput.style.display = "visible";
//  cashGivenLabel.style.display = "visible";
billAmountInput.addEventListener("change", function (e) {
  billAmount = e.target.value;
});

cashGivenInput.addEventListener("change", function (e) {
  cashGiven = e.target.value;
});

let availableCurrency = {
  TWO_THOUSAND: 2000,
  FIVE_HUNDRED: 500,
  HUNDRED: 100,
  TWENTY: 20,
  TEN: 10,
  FIVE: 5,
  ONE: 1,
};

/**
 * bill = 7
 * cash = 200
 *  ? retuns = 193
 *  * hundred = 1, twenty=4,ten=1,one=3
 */

function calculateReturn(billAmount, cashGiven) {
  let returnCash = {
    TWO_THOUSAND: 0,
    FIVE_HUNDRED: 0,
    HUNDRED: 0,
    TWENTY: 0,
    TEN: 0,
    FIVE: 0,
    ONE: 0,
  };
  const currency = Object.keys(availableCurrency);
  console.log(currency);
  let remainingAmount = parseInt(cashGiven) - parseInt(billAmount);
  for (let i = 0; i < currency.length; i++) {
    if (remainingAmount >= availableCurrency[currency[i]]) {
      let numberOfNotes = Math.floor(
        remainingAmount / availableCurrency[currency[i]]
      );
      returnCash[currency[i]] = numberOfNotes;
      let amountToBeSubtracted = numberOfNotes * availableCurrency[currency[i]];
      remainingAmount -= amountToBeSubtracted;
      //   console.log(
      //     "numberofNotes",
      //     numberOfNotes,
      //     "amount to be subtracted",
      //     amountToBeSubtracted
      //   );
    }
  }
  return returnCash;
}

console.log(calculateReturn(3, 2000));

const createTable = function createTable(data) {
  const markup = `
    <table>
          <tr>
            <th>No of notes</th>
            <td>${data.TWO_THOUSAND}</td>
            <td>${data.FIVE_HUNDRED}</td>
            <td>${data.HUNDRED}</td>
            <td>${data.TWENTY}</td>
            <td>${data.TEN}</td>
            <td>${data.FIVE}</td>
            <td>${data.ONE}</td>
          </tr>
          <tr>
            <th>Note</th>
            <td>2000</td>
            <td>500</td>
            <td>100</td>
            <td>20</td>
            <td>10</td>
            <td>5</td>
            <td>1</td>
          </tr>
        </table>
    `;
  return markup;
};

checkButton.addEventListener("click", function () {
  if (parseInt(billAmount) && parseInt(cashGiven) > 0) {
    if (
      billAmount !== "" &&
      cashGiven !== "" &&
      parseInt(cashGiven) >= parseInt(billAmount)
    ) {
      console.log("return change");
      let cashToBeReturned = calculateReturn(billAmount, cashGiven);
      let markup = createTable(cashToBeReturned);
      console.log(markup);
      output.innerHTML = markup;
    } else {
      output.innerText = "Please fill data correctly";
      setTimeout(() => {
        output.innerText = "";
      }, 3000);
    }
  } else {
    output.innerText = "Please fill data correctly";
    setTimeout(() => {
      output.innerText = "";
    }, 3000);
  }
});
