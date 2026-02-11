// Save message to localStorage
function saveMessageLocally(messageData) {
  let messages = JSON.parse(localStorage.getItem('messages')) || [];
  messages.push(messageData);
  localStorage.setItem('messages', JSON.stringify(messages));
}

// Load messages from localStorage
function loadMessagesFromLocal() {
  return JSON.parse(localStorage.getItem('messages')) || [];
}

// Display messages on the page
function displayMessages() {
  const messagesDisplay = document.getElementById('messagesDisplay');
  if (!messagesDisplay) return; // Skip if not on the messages page
  
  const messages = loadMessagesFromLocal();
  
  if (messages.length === 0) {
    messagesDisplay.innerHTML = '<p style="text-align: center; color: #999;">No messages yet.  Lipi\'s Message Section </p>';
    return;
  }
  
  messagesDisplay.innerHTML = messages.map((msg, index) => `
    <div class="message-item">
      <div class="message-meta">
        <span class="message-time">${msg.receivedAt || new Date(msg.timestamp).toLocaleString()}</span>
      </div>
      <div class="message-content">
        ${msg.message.replace(/\n/g, '<br>')}
      </div>
    </div>
  `).join('');
}

// Sync messages to backend
async function syncMessageToBackend(messageData) {
  try {
    const response = await fetch('http://localhost:3000/save-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: messageData.message,
        timestamp: messageData.timestamp
      })
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Handle message submission
document.addEventListener('DOMContentLoaded', function() {
  // Display messages when page loads
  displayMessages();
  
  // Handle submit button click
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', async function() {
      const message = document.getElementById('messageInput').value;
      const responseMsg = document.getElementById('responseMsg');
      
      if (message.trim() === '') {
        responseMsg.textContent = 'Please write a message!';
        responseMsg.style.color = 'red';
        return;
      }
      
      const messageData = {
        message: message,
        timestamp: new Date().toISOString(),
        receivedAt: new Date().toLocaleString()
      };
      
      // Always save to localStorage first
      saveMessageLocally(messageData);
      
      // Refresh the display
      displayMessages();
      
      // Try to sync with backend
      const synced = await syncMessageToBackend(messageData);
      
      if (synced) {
        responseMsg.textContent = 'Message sent! ❤ (synced with server)';
        responseMsg.style.color = 'green';
      } else {
        responseMsg.textContent = 'Message saved! ✓ (will sync when server is online)';
        responseMsg.style.color = 'orange';
      }
      
      document.getElementById('messageInput').value = '';
      
      // Clear message after 3 seconds
      setTimeout(() => {
        responseMsg.textContent = '';
      }, 3000);
    });
  }
});
