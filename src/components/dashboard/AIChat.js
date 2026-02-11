'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaRobot, FaTimes } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { VANTAGE_THEME } from './utils/theme';

export default function AIChat({ walletData, onClose }) {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: `👋 Hello! I'm your VANTAGE AI assistant. I can help you analyze your portfolio, understand your holdings, and provide insights. What would you like to know?`
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    walletData
                })
            });

            if (!response.ok) throw new Error('AI response failed');

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '❌ Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] z-50 flex flex-col"
            style={{
                background: VANTAGE_THEME.background,
                borderLeft: `1px solid ${VANTAGE_THEME.border}`
            }}
        >
            {/* Header */}
            <div
                className="p-4 flex items-center justify-between"
                style={{
                    background: VANTAGE_THEME.cardBg,
                    borderBottom: `1px solid ${VANTAGE_THEME.border}`
                }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${VANTAGE_THEME.primary}20` }}
                    >
                        <FaRobot style={{ color: VANTAGE_THEME.primary }} />
                    </div>
                    <div>
                        <h3 className="font-bold" style={{ color: VANTAGE_THEME.textLight }}>
                            AI Assistant
                        </h3>
                        <p className="text-xs" style={{ color: VANTAGE_THEME.textDark }}>
                            Powered by VANTAGE AI
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-lg transition-all hover:bg-opacity-80"
                    style={{ background: `${VANTAGE_THEME.error}20` }}
                >
                    <FaTimes style={{ color: VANTAGE_THEME.error }} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className="max-w-[80%] p-4 rounded-2xl"
                                style={{
                                    background: msg.role === 'user'
                                        ? `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`
                                        : VANTAGE_THEME.cardBg,
                                    color: msg.role === 'user' ? '#fff' : VANTAGE_THEME.textLight,
                                    border: msg.role === 'assistant' ? `1px solid ${VANTAGE_THEME.border}` : 'none'
                                }}
                            >
                                {msg.role === 'assistant' ? (
                                    <ReactMarkdown
                                        components={{
                                            code({ node, inline, className, children, ...props }) {
                                                const match = /language-(\w+)/.exec(className || '');
                                                return !inline && match ? (
                                                    <SyntaxHighlighter
                                                        style={vscDarkPlus}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        {...props}
                                                    >
                                                        {String(children).replace(/\n$/, '')}
                                                    </SyntaxHighlighter>
                                                ) : (
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            }
                                        }}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                ) : (
                                    <p>{msg.content}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <div className="flex justify-start">
                        <div
                            className="px-4 py-3 rounded-2xl flex items-center gap-2"
                            style={{ background: VANTAGE_THEME.cardBg, border: `1px solid ${VANTAGE_THEME.border}` }}
                        >
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: VANTAGE_THEME.primary, animationDelay: '0ms' }} />
                                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: VANTAGE_THEME.primary, animationDelay: '150ms' }} />
                                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: VANTAGE_THEME.primary, animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
                className="p-4"
                style={{
                    background: VANTAGE_THEME.cardBg,
                    borderTop: `1px solid ${VANTAGE_THEME.border}`
                }}
            >
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Ask me anything..."
                        className="flex-1 px-4 py-3 rounded-xl outline-none"
                        style={{
                            background: VANTAGE_THEME.background,
                            border: `1px solid ${VANTAGE_THEME.border}`,
                            color: VANTAGE_THEME.textLight
                        }}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading}
                        className="px-4 py-3 rounded-xl transition-all disabled:opacity-50"
                        style={{
                            background: `linear-gradient(135deg, ${VANTAGE_THEME.primary}, ${VANTAGE_THEME.secondary})`,
                            color: '#fff'
                        }}
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
