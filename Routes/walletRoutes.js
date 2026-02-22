const { getWallets, createWallet, deposit, withdraw } = require('../Controllers/walletController');

function walletRoutes(req, res) {


  if (req.url === '/api/wallets' && req.method === 'GET') {
    const wallets = getWallets();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(wallets));
  }

 
  if (req.url === '/api/wallets' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }

      const { user_id, name } = parsed;
      if (!user_id || !name) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'user_id and name are required' }));
      }

      const newWallet = createWallet(user_id, name);
      if (!newWallet) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'User not found' }));
      }

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newWallet));
    });
    return;
  }
  if (req.url.startsWith('/api/wallets/') && req.method === 'POST') {
    const parts = req.url.split('/');
    const wallet_id = parts[3];
    const action = parts[4];

    if (action !== 'deposit' && action !== 'withdraw') {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Action must be deposit or withdraw' }));
    }

    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }

      const { sold } = parsed;
      if (!sold || typeof sold !== 'number' || sold <= 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Sold must be a positive number' }));
      }

      const result = action === 'deposit'
        ? deposit(wallet_id, sold)
        : withdraw(wallet_id, sold);

      if (!result) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ 
          error: action === 'withdraw' ? 'Insufficient balance or wallet not found' : 'Wallet not found'
        }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    });
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found' }));
}

module.exports = walletRoutes;