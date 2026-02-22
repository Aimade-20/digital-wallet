const { readData, writeData } = require('../dataStor/store.js');

function getWallets() {
  const data = readData('wallets.json');
  return Array.isArray(data) ? data : [];
}

function getUsersFromStore() {
  const data = readData('users.json');
  return Array.isArray(data) ? data : [];
}

function createWallet(user_id, name) {
  const users = getUsersFromStore();
  if (!users.find(u => u.id === Number(user_id))) return null;

  const wallets = getWallets();
  const newWallet = {
    id: Date.now().toString(),
    user_id: Number(user_id),
    name,
    sold: 0
  };
  wallets.push(newWallet);
  writeData('wallets.json', wallets);
  return newWallet;
}

function deposit(wallet_id, sold) {
  if (sold <= 0) return null;
  const wallets = getWallets();
  const wallet = wallets.find(w => w.id === wallet_id);
  if (!wallet) return null;

  wallet.sold += sold;
  writeData('wallets.json', wallets);
  return wallet;
}

function withdraw(wallet_id, sold) {
  if (sold <= 0) return null;
  const wallets = getWallets();
  const wallet = wallets.find(w => w.id === wallet_id);
  if (!wallet) return null;
  if (wallet.sold < sold) return null;

  wallet.sold -= sold;
  writeData('wallets.json', wallets);
  return wallet;
}

module.exports = { getWallets, createWallet, deposit, withdraw };