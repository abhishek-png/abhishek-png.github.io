const express = require('express');
const app = express();
const StreamChat = require('stream-chat').StreamChat;
const serverClient = new StreamChat('gkd73zy53ast', '7r8ehth3tzk6nupjkryr8gktsbtnt94v7be4h9scp8ncvvv2sv6zs92ag25vebs3');



app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

app.listen(8800, () => {
  console.log('Example app listening on port 8800!');
});

app.get('/token', (req, res) => {
  const { username } = req.query;
  if (username) {
    const token = serverClient.createToken(username);
    res.status(200).json({ token, status: 'sucess' });
  } else {
    res.status(401).json({ message: 'invalid request', status: 'error' });
  }
});