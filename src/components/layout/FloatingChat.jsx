import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Bot, Phone, X, Send, User } from 'lucide-react';
import './FloatingChat.css';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null); // 'select', 'bot'
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am Dr. Akili, CyberPro\'s AI assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatRef = useRef(null);
  
  // Close chat when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
        // We don't reset activeChat here so they can resume
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isOpen && !activeChat) {
      setActiveChat('select');
    }
    setIsOpen(!isOpen);
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/1234567890', '_blank');
    setIsOpen(false);
    setActiveChat(null);
  };

  const handleBotChat = () => {
    setActiveChat('bot');
  };
  
  const handleBack = () => {
    setActiveChat('select');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    const newMsg = { id: Date.now(), sender: 'user', text: inputValue };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    
    // Mock bot response after delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'bot', 
        text: 'Thank you for your message. I am currently operating in demo mode and will be fully integrated soon to answer all your academy questions!' 
      }]);
    }, 1000);
  };

  return (
    <div className="floating-chat-container" ref={chatRef}>
      {isOpen && (
        <div className="floating-chat-popup">
          
          {/* Selection Menu */}
          {activeChat === 'select' && (
            <div className="chat-select-menu">
              <div className="chat-header">
                <h3>Connect With Us</h3>
                <button className="close-btn" onClick={() => setIsOpen(false)}><X size={18} /></button>
              </div>
              <div className="chat-body">
                <p className="chat-desc">How would you like to get in touch today?</p>
                
                <button className="chat-option-btn whatsapp-btn" onClick={handleWhatsApp}>
                  <div className="option-icon"><Phone size={20} /></div>
                  <div className="option-text">
                    <strong>WhatsApp Support</strong>
                    <span>Chat with our admission team</span>
                  </div>
                </button>
                
                <button className="chat-option-btn bot-btn" onClick={handleBotChat}>
                  <div className="option-icon"><Bot size={20} /></div>
                  <div className="option-text">
                    <strong>Talk to Dr. Akili</strong>
                    <span>24/7 AI Assistant</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Dr. Akili Chat Interface */}
          {activeChat === 'bot' && (
            <div className="bot-chat-interface">
              <div className="chat-header">
                <div className="bot-header-info">
                  <button className="back-btn" onClick={handleBack}><X size={18} style={{ transform: 'rotate(45deg)' }}/></button>
                  <div className="bot-avatar"><Bot size={16} /></div>
                  <div>
                    <h3>Dr. Akili</h3>
                    <span className="online-status">Online</span>
                  </div>
                </div>
                <button className="close-btn" onClick={() => setIsOpen(false)}><X size={18} /></button>
              </div>
              
              <div className="chat-messages">
                {messages.map(msg => (
                  <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                    {msg.sender === 'bot' && <div className="msg-avatar"><Bot size={12} /></div>}
                    <div className="msg-text">{msg.text}</div>
                    {msg.sender === 'user' && <div className="msg-avatar user-avatar"><User size={12} /></div>}
                  </div>
                ))}
              </div>
              
              <form className="chat-input-area" onSubmit={handleSendMessage}>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="send-btn" disabled={!inputValue.trim()}>
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}
          
        </div>
      )}

      {/* Main Floating Button */}
      <button 
        className={`floating-chat-btn ${isOpen ? 'active' : ''}`} 
        onClick={handleToggle}
        aria-label="Open chat options"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
