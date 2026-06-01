import React, { useMemo, useState } from 'react'

export default function History({ conversations }) {
  const [filter, setFilter] = useState(0)

  const filtered = useMemo(() => {
    if (!filter) return conversations
    return conversations.filter((c) => (c.rating || 0) === filter)
  }, [conversations, filter])

  return (
    <div className="history">
      <h2>Conversation History</h2>
      <div className="filters">
        <label>Filter by rating: </label>
        <select value={filter} onChange={(e)=>setFilter(Number(e.target.value))}>
          <option value={0}>All</option>
          <option value={5}>5</option>
          <option value={4}>4</option>
          <option value={3}>3</option>
          <option value={2}>2</option>
          <option value={1}>1</option>
        </select>
      </div>

      <div className="history-list">
        {filtered.length === 0 && <div className="empty">No conversations</div>}
        {filtered.map((c) => (
          <div key={c.id} className="history-item">
            <header>
              <strong>{c.title}</strong>
              <span className="rating">Rating: {c.rating || '—'}</span>
            </header>
            <div className="notes">{c.notes}</div>
            <ul className="msgs">
              {c.messages?.map((m)=> (
                <li key={m.id} className={m.type}>{m.type === 'ai' ? <p>{m.text}</p> : <div>{m.text}</div>}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
