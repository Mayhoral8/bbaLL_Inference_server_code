//Turns number to cash
export const FormatNumberToCash = (number) => {
  if (typeof number === "string") {
    number = parseInt(number);
  } else if (typeof number === "undefined") {
    console.error(
      "MoneyFormat.js => FormatNumberToCash => number is undefined"
    );
  }
  let moneyArray = [];
  while (number >= 1) {
    if (number > 999) {
      moneyArray.unshift((number % 1000).toFixed(0).padStart(3, "0"));
    } else {
      moneyArray.unshift((number % 1000).toFixed(0));
    }
    number = number / 1000;
  }
  return "$" + moneyArray.join(",");
};
