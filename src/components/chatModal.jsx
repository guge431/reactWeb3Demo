import React, { useState,useEffect } from 'react';
import './ChatModal.css';

const ChatModal = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好，我是AI，有什么我可以帮助你的吗？' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const el = document.querySelector('.chat-content');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, loading]);
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://guge.chuanzhenhe58.workers.dev/api/deepseek/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      const data = await response.json();
      const aiReply = data.choices?.[0]?.message;

      if (aiReply) {
        setMessages((prev) => [...prev, aiReply]);
      }
    } catch (err) {
      console.error('AI 调用失败', err);
    }

    setLoading(false);
  };

  return (
    <div className="chat-modal-popup">
      <div className="chat-modal">
        <div className="chat-header">
          <span>AI 聊天</span>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="chat-content">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <span>{msg.content}</span>
            </div>
          ))}
          {loading && <div className="message assistant"><span>AI 正在输入...</span></div>}
        </div>
        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="请输入消息..."
          />
          <button onClick={sendMessage} disabled={loading}>发送</button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
