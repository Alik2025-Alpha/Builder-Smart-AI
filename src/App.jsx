import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Send, Download, Code, Copy, Check, Calculator as CalculatorIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Calculator from './components/Calculator';

const initialMessages = [
  {
    role: 'assistant',
    content: "# Welcome to Builder Smart AI\n\nI'm your AI development assistant, here to help you build, deploy, and ship your projects. How can I assist you today?\n\n- **Build**: Get help with code, architecture, and best practices\n- **Deploy**: Guidance on deployment strategies and platforms\n- **Ship**: Optimize your workflow and deliver faster\n\nJust tell me what you're working on, and I'll provide tailored assistance for your project."
  }
];

function App() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [copiedSnippets, setCopiedSnippets] = useState({});
  const [showCalculator, setShowCalculator] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900', 'text-gray-100');
      document.body.classList.remove('bg-gray-50', 'text-gray-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-gray-900', 'text-gray-100');
      document.body.classList.add('bg-gray-50', 'text-gray-900');
    }
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = { 
        role: 'assistant', 
        content: generateMockResponse(input)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateMockResponse = (query) => {
    // This is a placeholder for actual AI integration
    if (query.toLowerCase().includes('hello') || query.toLowerCase().includes('hi')) {
      return "Hello! I'm Builder Smart AI, your development assistant. I can help you build, deploy, and ship your projects. What are you working on today?";
    }
    
    if (query.toLowerCase().includes('build')) {
      return "# Building with Builder Smart AI\n\nI can help you build your application by providing:\n\n- Code examples and solutions\n- Architecture recommendations\n- Best practices and patterns\n- Debugging assistance\n- Performance optimization tips\n\nWhat specific part of your build process do you need help with?";
    }
    
    if (query.toLowerCase().includes('deploy')) {
      return "# Deployment Strategies\n\nI can help you deploy your application with guidance on:\n\n- Cloud platforms (AWS, Azure, GCP)\n- Containerization with Docker\n- CI/CD pipeline setup\n- Serverless architectures\n- Environment configuration\n\n```bash\n# Example Docker deployment\ndocker build -t myapp .\ndocker run -p 3000:3000 myapp\n```\n\nWhat platform are you planning to deploy to?";
    }
    
    if (query.toLowerCase().includes('ship')) {
      return "# Shipping Your Project\n\nI can help you ship your product faster with:\n\n- Release management strategies\n- Feature flagging techniques\n- A/B testing implementation\n- Monitoring and analytics setup\n- User feedback collection\n\nWhat's your current shipping timeline and what challenges are you facing?";
    }
    
    if (query.toLowerCase().includes('react')) {
      return "# React Component Example\n\nHere's a simple React functional component:\n\n```jsx\nimport React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className=\"counter\">\n      <h2>Count: {count}</h2>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n      <button onClick={() => setCount(count - 1)}>Decrement</button>\n    </div>\n  );\n}\n\nexport default Counter;\n```\n\nThis component maintains a count state and provides buttons to increment and decrement it. Would you like me to explain how to integrate this into your project?";
    }
    
    if (query.toLowerCase().includes('tailwind')) {
      return "# Tailwind CSS Basics\n\nTailwind CSS is a utility-first CSS framework. Here's how to create a card component:\n\n```jsx\nfunction Card({ title, description }) {\n  return (\n    <div className=\"max-w-sm rounded overflow-hidden shadow-lg bg-white\">\n      <div className=\"px-6 py-4\">\n        <div className=\"font-bold text-xl mb-2\">{title}</div>\n        <p className=\"text-gray-700 text-base\">{description}</p>\n      </div>\n      <div className=\"px-6 pt-4 pb-2\">\n        <span className=\"inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2\">#tailwind</span>\n        <span className=\"inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2\">#css</span>\n      </div>\n    </div>\n  );\n}\n```\n\nThis creates a clean card with a title, description, and tags using Tailwind's utility classes. Would you like me to help you implement this in your project?";
    }
    
    if (query.toLowerCase().includes('calculator')) {
      setShowCalculator(true);
      return "I've opened the calculator tool for you. This is just one example of the tools I can provide to help with your development process. For your real projects, I can assist with code generation, debugging, architecture design, and more. What kind of project are you looking to build, deploy, or ship?";
    }
    
    return "I'm here to help you build, deploy, and ship your projects. Could you provide more details about what you're working on? I can assist with code examples, architecture recommendations, deployment strategies, or optimization techniques based on your specific needs.";
  };

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippets({ ...copiedSnippets, [id]: true });
    setTimeout(() => {
      setCopiedSnippets({ ...copiedSnippets, [id]: false });
    }, 2000);
  };

  const handleDownloadCode = (code, language) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code-snippet.${language === 'jsx' ? 'jsx' : language === 'javascript' ? 'js' : language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
  };

  return (
    <div className={twMerge(
      "flex flex-col min-h-screen",
      darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
    )}>
      {/* Header */}
      <header className={twMerge(
        "sticky top-0 z-10 border-b py-4 px-6 flex justify-between items-center",
        darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      )}>
        <div className="flex items-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill={darkMode ? "#10b981" : "#059669"} />
            <path d="M2 17L12 22L22 17" stroke={darkMode ? "#10b981" : "#059669"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke={darkMode ? "#10b981" : "#059669"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h1 className="text-xl font-bold">Builder Smart AI</h1>
        </div>
        <div className="flex items-center">
          <p className="hidden md:block mr-4 text-sm font-medium text-gray-500 dark:text-gray-400">Dream it. Build it. Ship it.</p>
          <button 
            onClick={toggleCalculator}
            className={twMerge(
              "p-2 rounded-full mr-2",
              darkMode ? "bg-gray-800 text-primary-500" : "bg-gray-100 text-primary-600",
              showCalculator && (darkMode ? "bg-primary-800 text-white" : "bg-primary-500 text-white")
            )}
            title="Toggle Calculator"
          >
            <CalculatorIcon size={20} />
          </button>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={twMerge(
              "p-2 rounded-full",
              darkMode ? "bg-gray-800 text-yellow-300" : "bg-gray-100 text-gray-700"
            )}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Chat container */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {showCalculator && (
            <div className="mb-8">
              <Calculator darkMode={darkMode} />
            </div>
          )}
          
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={twMerge(
                "mb-6",
                message.role === 'user' ? "flex justify-end" : "flex justify-start"
              )}
            >
              <div 
                className={twMerge(
                  "rounded-lg p-4 max-w-[85%] md:max-w-[75%] shadow-sm",
                  message.role === 'user' 
                    ? darkMode 
                      ? "bg-secondary-800 text-white" 
                      : "bg-secondary-100 text-gray-800"
                    : darkMode 
                      ? "bg-primary-800 text-white" 
                      : "bg-primary-50 text-gray-800"
                )}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '');
                      const language = match ? match[1] : '';
                      const codeId = `code-${index}-${language}-${children.toString().substring(0, 20).replace(/\s/g, '')}`;
                      
                      return !inline ? (
                        <div className={twMerge(
                          "relative rounded-md overflow-hidden my-4",
                          darkMode ? "bg-gray-800" : "bg-gray-700"
                        )}>
                          <div className="flex items-center justify-between px-4 py-2 bg-opacity-80">
                            <div className="flex items-center">
                              <Code size={16} className="mr-2 text-gray-300" />
                              <span className="text-xs font-medium text-gray-300 uppercase">{language || 'code'}</span>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleCopyCode(String(children).replace(/\n$/, ''), codeId)}
                                className="text-gray-300 hover:text-white transition-colors"
                                title="Copy code"
                              >
                                {copiedSnippets[codeId] ? <Check size={16} /> : <Copy size={16} />}
                              </button>
                              <button 
                                onClick={() => handleDownloadCode(String(children).replace(/\n$/, ''), language)}
                                className="text-gray-300 hover:text-white transition-colors"
                                title="Download code"
                              >
                                <Download size={16} />
                              </button>
                            </div>
                          </div>
                          <SyntaxHighlighter
                            language={language}
                            style={oneDark}
                            customStyle={{
                              margin: 0,
                              padding: '1rem',
                              borderRadius: '0 0 0.375rem 0.375rem',
                            }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code className={twMerge(
                          "px-1.5 py-0.5 rounded font-mono text-sm",
                          darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-800"
                        )} {...props}>
                          {children}
                        </code>
                      );
                    },
                    h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 mt-2" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3 mt-4" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2 mt-3" {...props} />,
                    p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                    a: ({node, ...props}) => <a className="text-blue-500 hover:underline" {...props} />,
                    blockquote: ({node, ...props}) => (
                      <blockquote className={twMerge(
                        "border-l-4 pl-4 italic my-4",
                        darkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-600"
                      )} {...props} />
                    ),
                    hr: ({node, ...props}) => <hr className="my-6 border-t border-gray-300 dark:border-gray-700" {...props} />,
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-6">
              <div className={twMerge(
                "rounded-lg p-4 shadow-sm",
                darkMode ? "bg-primary-800 text-white" : "bg-primary-50 text-gray-800"
              )}>
                <div className="typing-indicator flex space-x-1">
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input area */}
      <footer className={twMerge(
        "border-t p-4 md:p-6",
        darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      )}>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about building, deploying, or shipping..."
              className={twMerge(
                "w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2",
                darkMode 
                  ? "bg-gray-800 border-gray-700 text-white focus:ring-primary-600" 
                  : "bg-white border-gray-300 text-gray-900 focus:ring-primary-500"
              )}
            />
            <button
              type="submit"
              className={twMerge(
                "absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full",
                input.trim() 
                  ? "bg-primary-500 text-white hover:bg-primary-600" 
                  : darkMode 
                    ? "bg-gray-700 text-gray-400" 
                    : "bg-gray-200 text-gray-500"
              )}
              disabled={!input.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
}

export default App;
