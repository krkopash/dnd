import { useState, useEffect } from "react"
interface Member {id: number, name: string, email: string, role: string}

interface TaskItem { id: number; title:string; task:string; time: string; duedate:string; members: Member[];}

interface TaskProps {
  widgetId?: string;
}
const loadTasks = (widgetId?: string): TaskItem[] => {
  const storageKey = widgetId?`tasks_${widgetId}`: "tasks";
  const savedTasks = localStorage.getItem(storageKey);
  if (savedTasks) {
      return JSON.parse(savedTasks);
    
  }
  return [];
};

const Task: React.FC<TaskProps> = ({ widgetId }) => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<TaskItem[]>(() => loadTasks(widgetId));
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [duedate, setDuedate]=useState("");

  const loadMembers = (): Member[] => {
    const savedMembers = localStorage.getItem("members");
    if (savedMembers) {
        return JSON.parse(savedMembers);
    }
    return [];
  };

  const [availableMembers] = useState<Member[]>(loadMembers());
  const storageKey = widgetId?`tasks_${widgetId}` :"tasks";

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (tasks.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
      } else {
        localStorage.removeItem(storageKey);
      }
    }
  }, [tasks, isLoaded,storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()&& task.trim()) {
      const newTask: TaskItem = {
        id: Date.now(),
        title: title,
        task: task,
        duedate: duedate,
        time: new Date().toLocaleString(),
        members: selectedMembers
      };
      setTasks([...tasks, newTask]);
      setTitle("");
      setTask("");
      setDuedate("");
      setSelectedMembers([]);
    }
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>enter title:</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)}/><br/>
        <label>enter task</label>
        <input value={task} onChange={(e)=>setTask(e.target.value)} required/><br/>
        <label>due date:</label>
        <input value={duedate} onChange={(e)=>setDuedate(e.target.value)}/><br/>
        <br/> <label>members:[name(role)]</label>
        {availableMembers.length === 0 ? (<p>empty</p>):(
          <div>
            {availableMembers.map(member=> (
              <label key={member.id}>
               <br/> <input type="checkbox" checked={selectedMembers.some(m => m.id === member.id)} onChange={(e) => {
                    
                    if (e.target.checked) {
                      setSelectedMembers([...selectedMembers, member]);
                    } else {
                      setSelectedMembers(selectedMembers.filter(m =>m.id!==member.id));
                    }}}/>{' '}{member.name}({member.role})
      
       </label>
            ))}
          </div>
        )}
        <button type="submit">submit</button>
      </form>

      <div className="task-list">
        {tasks.length === 0 ? (<p className="empty-message">empty</p>): (
          tasks.map((t) => (
            <div key={t.id} className="task-item">
              <div className="task-content"> title: {t.title}<br/>
                task:{t.task}<br/>
                 members: {t.members.map(m=>m.name).join(",")}
                 <br/>
                 due date:{t.duedate}<br/>
                Time:{t.time}
                

              </div>
              <button onClick={()=>handleDelete(t.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Task