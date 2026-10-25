import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNoteById } from '../data/notesIndex';

export default function NoteViewer() {
  const { id } = useParams();
  const note = getNoteById(id);

  const [html, setHtml] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!note) return;
    setLoading(true); setError(null); setHtml(null);
    fetch(note.file)
      .then(r => { if (!r.ok) throw new Error(`Failed to load ${note.file}`); return r.text(); })
      .then(setHtml)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (!note) {
    return (
      <div className="viewer-error">
        <p>That note doesn't exist.</p>
        <Link to="/notes">← Back to the index</Link>
      </div>
    );
  }

  return (
    <div className="viewer">
      <div className="viewer-bar">
        <Link to="/notes" className="viewer-back">
          <span className="viewer-back-arrow">←</span>
          <span className="viewer-back-label">Index</span>
        </Link>
        <div className="viewer-crumb">
          <span className={`viewer-dot viewer-dot--${note.color}`} />
          <span className="viewer-category">{note.category}</span>
          <span className="viewer-sep">/</span>
          <span className="viewer-title">{note.title}</span>
        </div>
      </div>

      {loading && (
        <div className="viewer-status">
          <span className="viewer-status-mono">Loading note…</span>
        </div>
      )}
      {error && (
        <div className="viewer-status viewer-status--error">
          <span className="viewer-status-mono">Error: {error}</span>
        </div>
      )}

      {html && (
        <iframe
          title={note.title}
          srcDoc={html}
          className="viewer-frame"
          sandbox="allow-scripts allow-same-origin"
        />
      )}
    </div>
  );
}