import React, { useState, useEffect } from 'react';
import './ChatMessages.css';

const ChatMessages = () => {
  const [messages, setMessages] = useState([]);

  // Function to fetch messages from an API
  const fetchMessages = async () => {
    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch('https://api.example.com/messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    // Fetch messages immediately when the component mounts
    fetchMessages();

    // Set up an interval to fetch messages every 3 seconds
    const intervalId = setInterval(fetchMessages, 3000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="chat-container">
      <h2>Chat Messages</h2>
      <div className="message-list">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <strong>{message.sender}: </strong>
            <span>{message.text}</span>
            <small className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;