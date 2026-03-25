import React, { useState } from "react";

export default function Dnd() {
  const [groups, setGroups] = useState(["group1", "group2", "group3", "noDrop"]);

  const initialItems = [
    { id: 1,group: "group1", value: "item1" },
    { id: 2, group: "group1", value: "item2" },
    { id: 3, group: "group1", value: "item3" }
  ];
  const [items, setItems] = useState(initialItems);
  const [dragData, setDragData] = useState<{ id: number; initialGroup: string }>({ id: 0, initialGroup: "" });
  const [noDrop, setNoDrop] = useState("");

  const addItem = () => {
    const newItem = {
      id: items.length + 1, 
      group: "group1",
      value: `item ${items.length + 1}`
    };
    const newItems = [...items, newItem];
    setItems(newItems);
  };

  const reset = () => setItems(initialItems);

  const handleDragStart = (e: React.DragEvent, id: number, group: string) => {
    setDragData({ id: id, initialGroup: group });
  };

  const handleDragEnter = (e: React.DragEvent, group: string) => {
    if (group === "noDrop") {
      setNoDrop("noDrop");
    }
  };

  const handleDragOver = (e: React.DragEvent)=> {
    e.preventDefault();
  };

  const handleDragLeave = ()=>  setNoDrop("");

  const changeCategory = (itemId: number, group: string) => {
    const newItems = [...items];
    const itemIndex = newItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      newItems[itemIndex].group = group;
      setItems([...newItems]);
    }
  };

  const handleDrop = (e: React.DragEvent, group: string) => {
    setNoDrop("");
    const selected = dragData.id;
    if (group !== "noDrop") {
      changeCategory(selected, group);
    }
  };

  const getItemCount = (group: string) => {
    return items.filter(item => item.group === group).length;
  };

  return (
    <>
      <div>
        <button onClick={() => addItem()}>add</button>
        <button onClick={() => reset()}>reset</button>
      </div>
      <div className="groups">
        {groups.map((group) => {
          const itemCount = getItemCount(group);
          const groupItems = items.filter((item) => item.group === group);
          
          return (
            <div className={`${ group === "noDrop" && noDrop === "noDrop" ? noDrop : "group"}` }
              onDragEnter={(e) => handleDragEnter(e, group)} onDragOver={handleDragOver}   onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, group)} key={group}>
               
              <h4 className="title">
                {group} 
                <span style={{marginLeft: "10px" }}>
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              </h4>
              <div>
              {
                groupItems.length === 0 ? (<p></p>) : (
                  groupItems.map((item) => (
                    <div key={item.id} id={item.id} className={`${group === "noDrop" && noDrop === "noDrop"? "notAllowed":"item"}`}  draggable
                    onDragStart={(e) => handleDragStart(e, item.id, group)}>
                    {item.value}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}