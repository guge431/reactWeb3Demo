// import { useState,useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// import { Send, Bot, User } from 'lucide-react';
// import { useImmer } from '@/hooks/UseImmer';
// import '@/styles/App.css';

// function App() {
//   const [messages, setMessages] = useImmer([
//     { role: 'assistant', content: '你好，我是AI，有什么我可以帮助你的吗？' },
//   ]);
//   const [input, setInput] = useImmer('');
//   const [loading, setLoading] = useImmer(false);
//   useEffect(() => {
//     const el = document.querySelector('.chat-body');
//     if (el) {
//       el.scrollTop = el.scrollHeight;
//     }
//   }, [messages, loading]);

//   const handleSend = async() => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { role: 'user', content: input }];
//     setMessages(newMessages);
//     setInput('');
//     setLoading(true);

//     try {
//       const response = await fetch('https://guge.chuanzhenhe58.workers.dev/api/deepseek/ai', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           messages: newMessages,
//         }),
//       });

//       const data = await response.json();
//       const aiReply = data.choices?.[0]?.message;

//       if (aiReply) {
//         setMessages((prev) => [...prev, aiReply]);
//       }
//     } catch (err) {
//       console.error('AI 调用失败', err);
//     }
//     setLoading(false);
 
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div className="h-screen w-screen gradient-bg">
//       <div className="h-full flex flex-col glass-effect">
//         {/* 头部 */}
//         <div className="header-gradient text-white px-6 py-5 shadow-xl">
//           <div className="flex items-center justify-center space-x-3">
//             <Bot className="w-6 h-6" />
//             <h1 className="text-xl font-semibold">guge AI 聊天助手</h1>
//           </div>
//         </div>

//         {/* 聊天主体区域 */}
//         <div className="flex-1 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
//           <div className="chat-body h-full overflow-y-auto custom-scrollbar px-6 py-6 space-y-4">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div className={`flex items-start space-x-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
//                   {/* 头像 */}
//                   <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
//                     msg.role === 'user' 
//                       ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
//                       : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600'
//                   }`}>
//                     {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
//                   </div>

//                   {/* 消息气泡 */}
//                   <div className={`message-bubble px-4 py-3 rounded-2xl ${
//                     msg.role === 'user' 
//                       ? 'user-bubble text-white rounded-br-sm' 
//                       : 'ai-bubble text-gray-800 rounded-bl-sm'
//                   }`}>
//                     <div className="markdown-content text-sm leading-relaxed">
//                       <ReactMarkdown>{msg.content}</ReactMarkdown>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* 加载状态 */}
//             {loading && (
//               <div className="flex justify-start">
//                 <div className="flex items-start space-x-3 max-w-[80%]">
//                   <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 flex items-center justify-center">
//                     <Bot className="w-4 h-4" />
//                   </div>
//                   <div className="ai-bubble px-4 py-3 rounded-2xl rounded-bl-sm">
//                     <div className="flex items-center space-x-2 text-gray-500">
//                       <div className="flex space-x-1">
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                       </div>
//                       <span className="text-sm">AI 正在思考中...</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 输入区域 */}
//         <div className="bg-white border-t border-gray-200 px-6 py-4 shadow-2xl">
//           <div className="flex items-end space-x-4">
//             <div className="flex-1 relative">
//               <textarea
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyPress}
//                 placeholder="输入你的问题... (Enter 发送, Shift+Enter 换行)"
//                 className="chat-input w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
//                 rows={1}
//                 style={{
//                   minHeight: '48px',
//                   maxHeight: '120px',
//                 }}
//                 onInput={(e) => {
//                   const target = e.target as HTMLTextAreaElement;
//                   target.style.height = 'auto';
//                   target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
//                 }}
//               />
//             </div>
//             <button
//               onClick={handleSend}
//               disabled={loading || !input.trim()}
//               className="send-button flex-shrink-0 w-12 h-12 rounded-full text-white flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Send className="w-5 h-5" />
//             </button>
//           </div>
//           <div className="mt-2 text-xs text-gray-500 text-center">
//             由 guge AI 提供支持 · 请理性使用
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import { useRoutes } from 'react-router-dom';
import routes from "@/router/index";
const App = () => { 
  const routeings=useRoutes(routes)
  return <>{routeings}</>;
}

export default App;