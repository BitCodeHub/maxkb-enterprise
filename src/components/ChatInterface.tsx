'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, FileText, Sparkles } from 'lucide-react';
import { API_CONFIG } from '@/config/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
}

const suggestions = [
  'Genesis GV60 charging port location',
  'Hyundai Tucson hybrid battery warranty',
  'G80 service schedule 30,000 miles',
  'Blue Link app reset password',
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEARCH}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userMessage.content,
          top_k: 5,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.results?.[0]?.snippet || 
                 data.answer || 
                 'I found relevant information in the knowledge base. Let me provide you with the details.',
        timestamp: new Date(),
        sources: data.results?.map((r: {filename?: string}) => r.filename).filter(Boolean) as string[] || [],
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'm having trouble connecting to the knowledge base right now. Please try again in a moment.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-2xl font-semibold text-white mb-2">
              What can I help you find?
            </h1>
            <p className="text-zinc-500 mb-8 max-w-md">
              Ask me anything about Hyundai or Genesis vehicles, service procedures, 
              or technical specifications.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl text-sm text-zinc-300 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`animate-fade-in flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-blue-600' 
                      : 'bg-zinc-800'
                  }`}>
                    {message.role === 'user' ? (
                      <span className="text-sm font-medium">U</span>
                    ) : (
                      <Sparkles className="w-4 h-4 text-blue-400" />
                    )}
                  </div>

                  {/* Message bubble */}
                  <div className="space-y-2">
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-800 text-zinc-100'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    
                    {message.sources && message.sources.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {message.sources.map((source, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full"
                          >
                            <FileText className="w-3 h-3" />
                            {source}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <span className="text-xs text-zinc-600 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="bg-zinc-800 rounded-2xl px-4 py-3 flex items-center gap-1">
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-zinc-800 bg-[#0a0a0b] px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700 transition-all">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Hyundai/Genesis vehicles..."
              rows={1}
              className="w-full bg-transparent px-4 py-3.5 pr-12 text-sm text-zinc-200 placeholder:text-zinc-600 resize-none focus:outline-none max-h-[200px]"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2 p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-xl transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-zinc-600 mt-2 text-center">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
