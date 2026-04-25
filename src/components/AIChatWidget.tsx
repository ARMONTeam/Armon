import { useState } from 'react'
import { armonAI } from '@/lib/aiAssistant'
import { cn } from '@/lib/utils'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Halo! Aku Armon AI Assistant. Tanya aku tentang aturan arisan, cara kerja collateral & yield, atau ketik "yield tertinggi" untuk dapat rekomendasi yield dari AI!'
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    const assistantResponse = armonAI.chat(input)
    const assistantMessage: Message = { role: 'assistant', content: assistantResponse }

    setMessages(prev => [...prev, userMessage, assistantMessage])
    setInput('')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Panel */}
      <div
        className={cn(
          'absolute bottom-14 right-0 w-80 sm:w-96 h-[28rem] bg-background border border-slate-700 rounded-xl shadow-2xl',
          'flex flex-col overflow-hidden transition-all duration-300',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-surface border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            <span className="font-semibold text-white">Armon AI</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                'flex',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap',
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-br-md'
                    : 'bg-surface text-slate-200 rounded-bl-md border border-slate-700'
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 border-t border-slate-700 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setInput('yield tertinggi')}
            className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full whitespace-nowrap hover:bg-primary/30"
          >
            Yield Tertinggi
          </button>
          <button
            onClick={() => setInput('bagaimana kerja arisan?')}
            className="px-3 py-1 bg-surface text-slate-300 text-xs rounded-full whitespace-nowrap hover:bg-slate-700"
          >
            Aturan
          </button>
          <button
            onClick={() => setInput('carikan yield untuk 2 mon')}
            className="px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full whitespace-nowrap hover:bg-secondary/30"
          >
            2 MON
          </button>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tanya tentang Armon atau ketik 'yield tertinggi'..."
              className="flex-1 px-4 py-2 bg-surface border border-slate-600 rounded-full text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-primary hover:bg-primary/90 rounded-full transition-colors"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-14 h-14 bg-primary hover:bg-primary/90 rounded-full shadow-lg shadow-primary/30',
          'flex items-center justify-center transition-all duration-300',
          'hover:scale-105 active:scale-95',
          isOpen && 'rotate-90'
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  )
}
