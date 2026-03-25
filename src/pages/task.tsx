import { useState } from "react"
import Time from "./time"

interface TaskItem { id: number; title:string; task:string; time: string;}

const Task: React.FC = () => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && task.trim()) {
      const newTask: TaskItem = {
        id: Date.now(),
        title: title,
        task: task,
        time: new Date().toLocaleString()
      };
      setTasks([...tasks, newTask]);
      setTitle("");
      setTask("");
    }
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>Enter title:</label><br/>
          <input  type="text"  value={title}onChange={(e) => setTitle(e.target.value)}/><br/><br/>
          <label>Enter task:</label><br/>
          <input  type="text" value={task} onChange={(e) => setTask(e.target.value)}/><br/><br/>
          <button type="submit">Add Task</button>
        </form>

        <div>
          {tasks.length === 0 ? (<p></p>): (
            tasks.map((t) => (
              <div key={t.id}>Title:{t.title}<br/>
        
        task:{t.task}<br/>
                Time: {t.time}
                <button onClick={() => handleDelete(t.id)} >Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
  )
}

export default Task