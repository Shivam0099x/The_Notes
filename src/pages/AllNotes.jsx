import { Link } from 'react-router-dom';
import { notes } from '../data/notesIndex';

export default function AllNotes() {
  if (notes.length === 0) {
    return <p className="empty">No notes yet.</p>;
  }

  return (
    <div className="notes-page">
      <header className="page-header">
        <h2>All Notes</h2>
        <p>{notes.length} note{notes.length === 1 ? '' : 's'}</p>
      </header>

      <div className="notes-grid">
        {notes.map(note => (
          <Link key={note.id} to={`/notes/${note.id}`} className="note-card">
            <span className="note-card-category">{note.category}</span>
            <h3 className="note-card-title">{note.title}</h3>
            {note.description && (
              <p className="note-card-desc">{note.description}</p>
            )}
            <span className="note-card-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}