import { saveTransactions } from './storage.js';
import { updateSummary } from './summary.js';
import { updateChart } from './chart.js';

const transactionsEl = document.querySelector('#transactions');
const noTransactionsMsg = document.createElement('p');
noTransactionsMsg.className = 'no-transactions';
noTransactionsMsg.textContent = 'No transactions yet.';
transactionsEl.parentElement.insertBefore(noTransactionsMsg, transactionsEl);

export function initDOM(transactionsList) {
  transactionsList.forEach(tx => addTransactionToDOM(tx, transactionsList));
  toggleNoTransactions(transactionsList);
}

export function addTransactionToDOM(transaction, transactionsList) {
  const li = document.createElement('li');
  li.classList.add(transaction.amount >= 0 ? 'plus' : 'minus');
  li.dataset.id = transaction.id;

  li.innerHTML = `
    <div style="flex: 1;">
      <strong>${transaction.description}</strong>
      <span class="category">${transaction.category}</span>
    </div>
    <span>${transaction.amount >= 0 ? '+' : '-'}$${Math.abs(transaction.amount).toFixed(2)}</span>
    <button class="delete-btn">x</button>
  `;

  transactionsEl.appendChild(li);

  li.querySelector('.delete-btn').addEventListener('click', () => {
    const updatedList = transactionsList.filter(tx => tx.id !== transaction.id);
    transactionsList.length = 0;
    transactionsList.push(...updatedList);
    saveTransactions(updatedList);
    li.remove();
    updateSummary(updatedList);
    updateChart(updatedList);
    toggleNoTransactions(updatedList);
  });

  toggleNoTransactions(transactionsList);
}

export function toggleNoTransactions(transactionsList) {
  noTransactionsMsg.style.display = transactionsList.length === 0 ? 'block' : 'none';
}
