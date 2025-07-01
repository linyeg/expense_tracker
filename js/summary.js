const balance = document.querySelector('#balance');
const income = document.querySelector('#money-plus');
const expense = document.querySelector('#money-minus');

export function updateSummary(transactions) {
  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  const incomeTotal = transactions.filter(tx => tx.amount >= 0).reduce((acc, tx) => acc + tx.amount, 0);
  const expenseTotal = transactions.filter(tx => tx.amount < 0).reduce((acc, tx) => acc + tx.amount, 0);

  balance.innerText = `$${total.toFixed(2)}`;
  income.innerText = `+${incomeTotal.toFixed(2)}`;
  expense.innerText = `-$${Math.abs(expenseTotal).toFixed(2)}`;
}
