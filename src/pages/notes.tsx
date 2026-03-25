import { useState } from "react"
interface NoteItem { id: number; note: string; category: string; time: string;}

const Notes: React.FC = () => {
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("general");
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["common", "work", "personal"];
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
    <div>
     <div>
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

      <div>
        <label>filter:</label>
        <select  value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All</option>
          {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        {filteredNotes.length === 0 ? (<p></p>) : (
          filteredNotes.map((n) => (
           
      <div key={n.id}>
              <p>{n.note} - {n.category}</p>
              <p>{n.time}</p>
              <button onClick={()=>handleDelete(n.id)}>Delete</button>
           
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Notes