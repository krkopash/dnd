import { useState, useEffect } from "react"

interface NoteItem { id: number; note: string; category: string; time: string;}

interface NotesProps {
  widgetId?: string;
}
const loadNotes = (widgetId?: string): NoteItem[] => {
  const storageKey = widgetId ?`notes_${widgetId}`: "notes";
  const savedNotes = localStorage.getItem(storageKey);
  if (savedNotes) {
    try {
      return JSON.parse(savedNotes);
    } catch {
      return [];
    }
  }
  return [];
};

const Notes: React.FC<NotesProps> = ({ widgetId }) => {
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("general");
  const [notes, setNotes] = useState<NoteItem[]>(() => loadNotes(widgetId));
  const [filterCategory, setFilterCategory] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  const categories = ["common", "work", "personal"];
  const storageKey = widgetId ? `notes_${widgetId}` : "notes";

useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (notes.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(notes));
      } else {
        localStorage.removeItem(storageKey);
      }
    }
  }, [notes, isLoaded, storageKey]);

  const handleAddNote = () => {
    if (note.trim()) {
      const newNote: NoteItem = {
        id: Date.now(),
        note: note, category: category,
        time: new Date().toLocaleString()
      };
      setNotes([...notes, newNote]);
      setNote("");
      setCategory("general");
    }
  };

  const handleDelete = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const filteredNotes= filterCategory=== "all"?notes: notes.filter(n =>n.category=== filterCategory);

  return (
    <div className="notes-container">
      <div className="notes-form">
        <label>note:</label><br/>
        <textarea value={note} onChange={(e) => setNote(e.target.value)}/><br/><br/>        
        <label>Category:</label>
        <select value={category}  onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select> <br/><br/>
        <button onClick={handleAddNote}>Save</button>
      </div>

      <div className="notes-filter">
        <label>filter:</label>
        <select  value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All</option>
          {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="notes-list">
        {filteredNotes.length === 0 ? (<p className="empty-message">No notes yet</p>) : (
          filteredNotes.map((n) => (
            <div key={n.id} className="note-item">
              <div className="note-content">
                <p>{n.note}</p>
                <p className="note-category">Category: {n.category}</p>
                <p className="note-time">{n.time}</p>
              </div>
              <button onClick={()=>handleDelete(n.id)} className="delete-btn">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Notes