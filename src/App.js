import React, { useState,useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好，我是AI，有什么我可以帮助你的吗？' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const el = document.querySelector('.chat-body');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async() => {
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
    <div className="chat-container">
      <div className="chat-header">💬 guge AI 聊天助手</div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.role === 'user' ? 'user' : 'ai'}`}
          >
            <div className="message-bubble"><ReactMarkdown>{msg.content}</ReactMarkdown></div>
          </div>
        ))}
         {loading && <div className="message assistant"><span>AI 正在输入...</span></div>}
      </div>
      <div className="chat-input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="输入你的问题..."
        />
        <button onClick={handleSend} disabled={loading}>发送</button>
      </div>
    </div>
  );
}

export default App;
