import { Link } from 'react-router-dom';
import { notes } from '../data/notesIndex';

export default function Home() {
  // group notes by category, keeping insertion order
  const categories = [...new Set(notes.map(n => n.category))];

  return (
    <div className="home-page">
      <header className="masthead">
        <div className="masthead-eyebrow">
          Personal knowledge base · Volume {String(notes.length).padStart(2, '0')}
        </div>
        <h1 className="masthead-title">
          The <em>Notes</em>
        </h1>
        <p className="masthead-desc">
          Long-form technical notes on the things I keep forgetting.
          Animations, quizzes and diagrams included.
        </p>
        <div className="masthead-meta">
          <span>{notes.length} entries</span>
          <span>·</span>
          <span>{categories.length} categories</span>
          <span>·</span>
          <span>updated {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
      </header>

      {categories.map(cat => {
        const catNotes = notes.filter(n => n.category === cat);
        return (
          <section key={cat} className="category-section">
            <div className="category-header">
              <span className="category-label">{cat}</span>
              <span className="category-count">{catNotes.length}</span>
              <div className="category-rule" />
            </div>

            <div className="notes-grid">
              {catNotes.map((note, i) => (
                <Link
                  key={note.id}
                  to={`/notes/${note.id}`}
                  className={`note-card note-card--${note.color}`}
                >
                  <span className="note-card-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="note-card-title">{note.title}</h3>
                  {note.description && (
                    <p className="note-card-desc">{note.description}</p>
                  )}
                  <span className="note-card-arrow">Read note →</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <footer className="home-footer">
        <span>Built for myself · Made with too much care</span>
        <span className="home-footer-mono">/notes</span>
      </footer>
    </div>
  );
}