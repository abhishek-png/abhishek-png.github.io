
async function selectUserHandler(userPayload) {
  if (activeUser === userPayload.id) return; // current active user, so do not proceed...

  activeUser = userPayload.id;

  // remove the 'active' class from all users
  const allUsers = document.getElementsByClassName('user');
  Array.from(allUsers).forEach(user => {
    user.classList.remove('active');
  });

  // add the 'active' class to the current selected user
  const userElement = document.getElementById(userPayload.id);
  userElement.classList.add('active');

  // remove all previous messages in the message container...
  const messageContainer = document.getElementById('messages');
  messageContainer.innerHTML = '';

  // []
  await initializeChannel([username, userPayload.id]);
}