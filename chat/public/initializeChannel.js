async function initializeChannel(members) {
  //members => array of users, [user1, user2]
  channel = client.channel('messaging', {
    members: members,
    session: 2 // custom field, you can add as many as you want
  });

  await channel.watch();

  channel.on('message.new', event => {
    appendMessage(event.message);
  });

  channel.state.messages.forEach(message => {
    appendMessage(message);
  });
}