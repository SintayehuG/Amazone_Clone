import React from "react";

function CurrencyFormat({ amount }) {
  if (typeof amount !== "number" || isNaN(amount)) {
    return null; // Handle the case when amount is not a valid number
  }

  const formattedAmount = `$${amount.toFixed(2)}`;

  return <span>{formattedAmount}</span>;
}

export default CurrencyFormat;
