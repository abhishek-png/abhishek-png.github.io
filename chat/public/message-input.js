const inputElement = document.getElementById('message-input');

inputElement.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    sendMessage(inputElement.value);
    inputElement.value = '';
  }
});