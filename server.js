const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const app = express();
const DATA_FILE = path.join(__dirname, 'data', 'users.json');

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ensure data dir and file exist
const dataDir = path.join(__dirname, 'data');
if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if(!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({}), 'utf8');

function readUsers(){
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')||'{}'); }
  catch(e){ return {}; }
}
function writeUsers(u){ fs.writeFileSync(DATA_FILE, JSON.stringify(u, null, 2), 'utf8'); }

app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({ error: 'Missing fields' });
  const users = readUsers();
  if(users[username]) return res.status(409).json({ error: 'User exists' });
  const hash = bcrypt.hashSync(password, 10);
  users[username] = { passwordHash: hash, created: Date.now() };
  writeUsers(users);
  return res.json({ success: true });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({ error: 'Missing fields' });
  const users = readUsers();
  const user = users[username];
  if(!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = bcrypt.compareSync(password, user.passwordHash);
  if(!ok) return res.status(401).json({ error: 'Invalid credentials' });
  return res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
