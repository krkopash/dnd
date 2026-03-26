import React, { useState, useEffect } from "react"
import GridLayout from "react-grid-layout"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import Task from "../pages/task"
import Time from "../pages/time"
import Notes from "../pages/notes"


const group: Record<string, React.FC> = {task: Task, notes: Notes, clock: Time}
type WidgetLayout = { i: string
  x: number
  y: number
  w: number
  h: number
  type: string
}

const DashboardGrid: React.FC = () => {
  const [layout, setLayout] = useState<WidgetLayout[]>(() => {
    const saved = localStorage.getItem("layout")
    return saved? JSON.parse(saved) : [{ i: "1", x: 0, y: 0, w: 3, h: 2, type: "clock",},]
  })

  useEffect(() => { localStorage.setItem("layout", JSON.stringify(layout))
  }, [layout])

  const addWidget = (type: string) => {
    const colMap: Record<string, number> = { clock: 0, task: 3, notes: 6}

    const newWidget: WidgetLayout = {
      i: Date.now().toString(), x: colMap[type]?? 0,y:0,w: 3, h: 2, type,
    }
    setLayout((prev) => [...prev, newWidget])
  }

  const deleteWidget = (id: string) => {
    setLayout((prev) => prev.filter((item) => item.i !== id))
  }

  const handleLayoutChange = (newLayout: ReactGridLayout.Layout[]) => {
    const updatedLayout: WidgetLayout[] = newLayout.map((item) => {
      const existing = layout.find((l) => l.i === item.i)
      return { 
        i: item.i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        type: existing?.type || "clock",
      }
    })
    setLayout(updatedLayout);
  }

  const renderComponent = (item: WidgetLayout) => {
    switch (item.type) {
      case "task":
        return <Task widgetId={item.i} />;
      case "notes":
        return <Notes widgetId={item.i} />;
      case "clock":
        return <Time />;
      default:
        return null;
    }
  }

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => addWidget("clock")}>Clock</button>
        <button onClick={() => addWidget("task")}>Task</button>
        <button onClick={() => addWidget("notes")}>Notes</button>
      </div>
     
       <GridLayout  className="layout"  layout={layout}  cols={12}  rowHeight={50}  width={1000}
        onLayoutChange={handleLayoutChange}
        autoSize={true}
      >
        
        {
        layout.map((item) => (
            <div key={item.i} style={{ border: "1px solid #ccc",padding: "10px" , position: "relative", overflow: "auto" }}>
              <button onClick={() => deleteWidget(item.i)} style={{position: "absolute", top: "5px", right: "5px"}}>X</button>
              {renderComponent(item)}
            </div>
        ))}
      </GridLayout> 
    </div>)}
export default DashboardGrid