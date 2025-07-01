import { getTransactions, saveTransactions } from './storage.js';
import { addTransactionToDOM, initDOM, toggleNoTransactions } from './dom.js';
import { updateSummary } from './summary.js';
import { updateChart } from './chart.js';

const form = document.querySelector('#form');
const formText = document.querySelector('#text');
const formNumber = document.querySelector('#amount');
const formCategory = document.querySelector('#category');

let transactionsList = getTransactions();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = formText.value.trim();
  const amount = parseFloat(formNumber.value);
  const category = formCategory.value;

  if (!text || isNaN(amount) || !category) {
    alert('Please enter a valid description, amount, and category.');
    return;
  }

  const newTransaction = {
    id: crypto.randomUUID(),
    description: text,
    amount,
    category,
  };

  transactionsList.push(newTransaction);
  saveTransactions(transactionsList);
  addTransactionToDOM(newTransaction, transactionsList);
  updateSummary(transactionsList);
  updateChart(transactionsList);
  form.reset();
});

function init() {
  initDOM(transactionsList);
  updateSummary(transactionsList);
  updateChart(transactionsList);
}

init();
