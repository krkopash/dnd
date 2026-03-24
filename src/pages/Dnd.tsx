import React, { useState } from "react";

export default function Dnd() {
  const groups = ["group1", "group2", "group3", "noDrop"];

  const initialItems = [
    { id: 1, group: "group1", value: "item1" },
    { id: 2, group: "group1", value: "item2" },
    { id: 3, group: "group1", value: "item3" }
  ];
  const [items, setItems] = useState(initialItems);
  const [dragData, setDragData] = useState({});
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

    const handleDragStart = (e:any, id:any, group:string) => {
    setDragData({ id: id, initialGroup: group });
  };

  const handleDragEnter = (e:any, group:string) => {
    if (group === "noDrop") {
      setNoDrop("noDrop");
    }
  };

  const handleDragOver = (e:any)=> {
    e.preventDefault();
  };

  const handleDragLeave = ()=>  setNoDrop("");
  const changeCategory = (itemId:any, group:string) => {
    const newItems = [...items];
    newItems[itemId- 1].group = group;
    setItems([...newItems]);
  };

  const handleDrop = (e:any, group:string) => {
    setNoDrop("");
    const selected = dragData.id;
    if (group !== "noDrop") {
      changeCategory(selected, group);
    }
  };

  return (
    <>
      <div>
        <button onClick={() => addItem()}>add</button>
        <button onClick={() => reset()}>reset</button>
      </div>
      <div className="groups">
        {groups.map((group) => (
          <div className=
          {`${ group === "noDrop" && noDrop === "noDrop" ? noDrop : "group"}`}
            onDragEnter={(e) => handleDragEnter(e, group)} onDragOver={handleDragOver}   onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, group)} key={group}>
               
            <h4 className="title">{group}</h4>
            <div>
          
    {
     items.filter((item) => item.group === group).map((item) => (
          <div key={item.id} id={item.id} className={`${group === "noDrop" && noDrop === "noDrop"? "notAllowed": "item"
                    }`}  draggable
          onDragStart={(e) => handleDragStart(e, item.id, group)}>
                    {item.value}
        
                  </div> ))}
           </div>
          </div>
        ))}
      </div>
    </>
  );
}
