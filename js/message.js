document.getElementById('submitBtn').addEventListener('click', async function() {
  const message = document.getElementById('messageInput').value;
  const responseMsg = document.getElementById('responseMsg');
  
  if (message.trim() === '') {
    responseMsg.textContent = 'Please write a message!';
    responseMsg.style.color = 'red';
    return;
  }
  
  try {
    const response = await fetch('http://localhost:3000/save-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        timestamp: new Date().toISOString()
      })
    });
    
    if (response.ok) {
      responseMsg.textContent = 'Message sent! ❤';
      responseMsg.style.color = 'green';
      document.getElementById('messageInput').value = '';
    } else {
      responseMsg.textContent = 'Error sending message. Try again!';
      responseMsg.style.color = 'red';
    }
  } catch (error) {
    responseMsg.textContent = 'Network error. Make sure backend is running!';
    responseMsg.style.color = 'red';
  }
});
