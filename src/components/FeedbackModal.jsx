import React from 'react'

export default function FeedbackModal({ rating, setRating, notes, setNotes, onClose, onSave }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Save Conversation & Feedback</h3>
        <div className="rating">
          {[1,2,3,4,5].map((n) => (
            <button key={n} type="button" className={n<=rating? 'star on' : 'star'} onClick={() => setRating(n)}>{n <= rating ? '★' : '☆'}</button>
          ))}
        </div>
        <textarea placeholder="Any subjective feedback..." value={notes} onChange={(e)=>setNotes(e.target.value)} />
        <div className="modal-actions">
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
          <button type="button" className="btn primary" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  )
}
