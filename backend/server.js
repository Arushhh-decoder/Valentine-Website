const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to save messages
app.post('/save-message', (req, res) => {
  const { message, timestamp } = req.body;
  
  // Validate input
  if (!message || message.trim() === '') {
    return res.status(400).json({ success: false, error: 'Message is required' });
  }
  
  const messageData = {
    message: message,
    timestamp: timestamp,
    receivedAt: new Date().toLocaleString()
  };
  
  try {
    // Read existing messages
    const filePath = path.join(__dirname, 'messages.json');
    let messages = [];
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      if (fileContent) {
        messages = JSON.parse(fileContent);
      }
    }
    
    // Add new message
    messages.push(messageData);
    
    // Save to file
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
    
    // Log to console
    console.log('✅ New message received:', messageData);
    
    // Send success response
    res.json({ success: true, message: 'Message saved successfully!' });
  } catch (error) {
    console.error('❌ Error saving message:', error);
    res.status(500).json({ success: false, error: 'Failed to save message' });
  }
});

// Route to get all messages (for you to check)
app.get('/get-messages', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'messages.json');
    
    if (!fs.existsSync(filePath)) {
      return res.json({ messages: [] });
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const messages = fileContent ? JSON.parse(fileContent) : [];
    
    res.json({ messages });
  } catch (error) {
    console.error('Error reading messages:', error);
    res.status(500).json({ error: 'Failed to read messages' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`💌 Messages will be saved to: ${path.join(__dirname, 'messages.json')}`);
});
