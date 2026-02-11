# Valentine Message Backend

## Setup Instructions

### 1. Install Dependencies
Open terminal in the `backend` folder and run:
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:3000
💌 Messages will be saved to: backend/messages.json
```

### 3. Test the Backend
- Open your Valentine page in browser
- Scroll to the footer and write a message
- Click "Send Message"
- If successful, you'll see "Message sent! ❤"
- Check `messages.json` in the backend folder to see all messages

### 4. View All Messages
You can also open this URL in your browser to see all messages:
```
http://localhost:3000/get-messages
```

## How It Works
- Frontend (final.html) sends message to backend via POST request
- Backend receives message and saves it to `messages.json`
- Messages stay on your computer forever!

## Troubleshooting
- Make sure backend is running before opening the website
- Check browser console (F12) for any errors
- Make sure port 3000 is not used by another application
