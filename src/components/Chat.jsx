import React, { useEffect, useMemo, useRef, useState } from 'react'
import stubs from '../data/stubs.json'
import FeedbackModal from './FeedbackModal'

function generateResponse(question) {
  if (!question) return "Sorry, Did not understand your query!"
  const q = question.trim().toLowerCase()
  
  // Check for exact matches first
  if (stubs.greetings[q]) return stubs.greetings[q]
  if (stubs.faqs[q]) return stubs.faqs[q]
  
  // Check for substring match - if question contains the key
  for (const key in stubs.greetings) {
    if (q.includes(key)) {
      return stubs.greetings[key]
    }
  }
  
  for (const key in stubs.faqs) {
    if (q.includes(key)) {
      return stubs.faqs[key]
    }
  }
  
  return 'Sorry, Did not understand your query!'
}

export default function Chat({ saveConversation, conversations, activeId, autoSaveConversation }) {
  const conversationId = useRef(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState('')
  const [likes, setLikes] = useState({})
  const messagesRef = useRef(null)

  useEffect(() => {
    if (activeId) {
      const conv = conversations.find((c) => c.id === activeId)
      if (conv) {
        setMessages(conv.messages || [])
        setRating(conv.rating || 0)
        setNotes(conv.notes || '')
        conversationId.current = null // Clear current conversation ID when viewing a saved one
      }
    } else if (!conversationId.current) {
      // Only clear messages if not actively chatting (conversationId.current is set while chatting)
      setMessages([])
      setRating(0)
      setNotes('')
    }
  }, [activeId, conversations])

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  // Auto-save conversation when rating or notes change
  useEffect(() => {
    if (messages.length > 0 && !activeId && conversationId.current) {
      const conv = {
        id: conversationId.current,
        title: messages.find((m) => m.type === 'user')?.text?.slice(0, 30) || 'Chat',
        messages,
        rating,
        notes,
      }
      if (autoSaveConversation) {
        autoSaveConversation(conv)
      }
    }
  }, [rating, notes, activeId, messages, autoSaveConversation])

  function handleAsk(e) {
    e.preventDefault()
    const question = input.trim()
    if (!question) return
    
    // Create unique conversation ID if not exists
    if (!conversationId.current) {
      conversationId.current = Date.now().toString()
    }
    
    const userMsg = { id: Date.now() + '-u', type: 'user', text: question }
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, userMsg]
      // Auto-save immediately after user message
      const conv = {
        id: conversationId.current,
        title: question.slice(0, 30) || 'Chat',
        messages: updatedMessages,
        rating,
        notes,
      }
      if (autoSaveConversation) {
        autoSaveConversation(conv)
      }
      return updatedMessages
    })
    setInput('')
    
    // simulate AI reply
    const reply = generateResponse(question)
    const aiMsg = { id: Date.now() + '-a', type: 'ai', text: reply }
    setTimeout(() => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, aiMsg]
        // Auto-save immediately after AI message
        const conv = {
          id: conversationId.current,
          title: question.slice(0, 30) || 'Chat',
          messages: updatedMessages,
          rating,
          notes,
        }
        if (autoSaveConversation) {
          autoSaveConversation(conv)
        }
        return updatedMessages
      })
    }, 250)
  }

  function toggleLike(id, val) {
    setLikes((s) => ({ ...s, [id]: val }))
  }

  function handleSave() {
    if (messages.length > 0) {
      const conv = {
        id: conversationId.current || Date.now().toString(),
        title: messages.find((m) => m.type === 'user')?.text?.slice(0, 30) || 'Chat',
        messages,
        rating,
        notes,
      }
      saveConversation(conv)
    }
    setShowFeedback(false)
  }

  return (
    <div className="chat-shell">
      <div className="chat-top">
        <h2>Chat with <span>Soul AI</span></h2>
        <div className="actions">
          <button type="button" className="btn" onClick={() => setShowFeedback(true)}>Save</button>
        </div>
      </div>

      <div className="messages" ref={messagesRef} role="log" aria-live="polite" tabIndex={0}>
        {messages.map((m) => (
          <div key={m.id} className={`message ${m.type}`}>
            <div className="meta">
              <strong>{m.type === 'ai' ? <span>Soul AI</span> : 'You'}</strong>
            </div>
            {m.type === 'ai' ? <p>{m.text}</p> : <div className="user-text">{m.text}</div>}

            {m.type === 'ai' && (
              <div className="feedback-buttons">
                <button aria-label="like" onClick={() => toggleLike(m.id, 'like')}>👍</button>
                <button aria-label="dislike" onClick={() => toggleLike(m.id, 'dislike')}>👎</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={handleAsk}>
        <input
          aria-label="Message Bot AI"
          placeholder="Message Bot AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" aria-label="Ask Soul AI" className="btn primary">Ask</button>
      </form>

      {showFeedback && (
        <FeedbackModal
          rating={rating}
          setRating={setRating}
          notes={notes}
          setNotes={setNotes}
          onClose={() => setShowFeedback(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
