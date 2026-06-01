import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Chat from './components/Chat'
import History from './components/History'
import Sidebar from './components/Sidebar'

export default function App() {
  const [conversations, setConversations] = useState([])
  const [activeId, setActiveId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const raw = localStorage.getItem('xbotai_conversations')
    if (raw) setConversations(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem('xbotai_conversations', JSON.stringify(conversations))
  }, [conversations])

  function saveConversation(conv) {
    const id = conv.id || Date.now().toString()
    const updated = { ...conv, id }
    setConversations((prev) => {
      const others = prev.filter((c) => c.id !== id)
      return [updated, ...others]
    })
    setActiveId(id)
  }

  function startNew() {
    setActiveId(null)
    navigate('/')
  }

  return (
    <div className="xbot-layout">
      <aside className="left">
        <h2>XBotAI</h2>
        <button className="btn" onClick={startNew}>New Chat</button>
        <nav className="nav-links">
          <Link to="/history">Past Conversions</Link>
        </nav>
        <Sidebar conversations={conversations} setActiveId={setActiveId} />
      </aside>

      <main className="main">
        <Routes>
          <Route path="/" element={<Chat saveConversation={saveConversation} conversations={conversations} activeId={activeId} />} />
          <Route path="/history" element={<History conversations={conversations} />} />
        </Routes>
      </main>
    </div>
  )
}
