const user = document.getElementById('user-login-input');

let client, channel, username, activeUser;

client = new StreamChat('gkd73zy53ast');

async function generateToken(username) {
  const { token } = (await axios.get(`/token?username=${username}`)).data;
  return token;
}

user.addEventListener('keyup', function(event) {
  if(event.key === 'Enter') {
    checkAuthState();
  }
});

checkAuthState();

async function checkAuthState() {
  if(!user.value) {
    document.getElementById('login-block').style.display = 'grid';
    document.getElementsByClassName('chat-container')[0].style.display = 'none';
  } else {
    username = user.value;

    await initializeClient();

    document.getElementsByClassName('chat-container')[0].style.display = 'grid';
    document.getElementById('login-block').style.display = 'none';
  }
}

async function listUsers() {
  const filters = {};
  const response = await client.queryUsers(filters);

  populateUsers(response.users);
  return response;
}

function appendMessage(message) {
  const messageContainer = document.getElementById('messages');

  // Create and append the message div
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${
    message.user.id === username ? 'message-right' : 'message-left'
  }`;

  // Create the username div
  const usernameDiv = document.createElement('div');
  usernameDiv.className = 'message-username';
  usernameDiv.textContent = `${message.user.id}:`;

  // Append the username div to the MessageDiv
  messageDiv.append(usernameDiv);

  // Create the main message text div
  const messageTextDiv = document.createElement('div');
  messageTextDiv.textContent = message.text;

  // Append the username div to the MessageDiv
  messageDiv.append(messageTextDiv);

  // Then append the messageDiv to the "messages" div
  messageContainer.appendChild(messageDiv);
}

async function sendMessage(message) {
  return await channel.sendMessage({
    text: message
  });
}