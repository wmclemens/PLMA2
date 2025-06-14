import React, { useState } from "react";

export default function ActivityList({ activity = [], onAdd, username }) {
  const [note, setNote] = useState("");
  function handleAdd(e) {
    e.preventDefault();
    if (!note.trim()) return;
    onAdd(note);
    setNote("");
  }
  return (
    <div>
      <h3>Activity</h3>
      <form onSubmit={handleAdd}>
        <textarea
          rows={2}
          value={note}
          placeholder="Add note..."
          onChange={e => setNote(e.target.value)}
        />
        <button>Add Note</button>
      </form>
      <div className="mt-2">
        {activity && activity.length
          ? activity.map((a, i) => (
              <div className="activity-note" key={i}>
                <div>{a.note}</div>
                <div style={{ fontSize: "0.9em", color: "#888" }}>
                  {a.username} @ {a.date}
                </div>
              </div>
            ))
          : <i>No activity yet.</i>}
      </div>
    </div>
  );
}
