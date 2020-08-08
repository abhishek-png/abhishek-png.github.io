async function initializeClient() {
  const token = await generateToken(username);

  await client.setUser(
    {
      id: username,
      name: 'The user name',
      image: 'https://bit.ly/2u9Vc0r'
    },
    token
  );

  await listUsers();

  return client;
}