const STORAGE_KEY = 'transactions';

export function getTransactions() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveTransactions(transactions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}
