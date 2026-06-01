import React from 'react'

export default function Sidebar({ conversations, setActiveId }) {
  return (
    <div className="convo-list">
      <h3>Conversations</h3>
      {conversations.length === 0 && <div className="empty">No saved chats</div>}
      <ul>
        {conversations.map((c) => (
          <li key={c.id} onClick={() => setActiveId(c.id)}>
            <strong>{c.title || new Date(Number(c.id)).toLocaleString()}</strong>
            <div className="meta">Messages: {c.messages?.length || 0}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
