import React, { useState,useEffect } from "react"

interface Members{
    id:number;
    name:string
    email:string
    role:string
}

export default function Members(){

    const loadMembers = ():Members[] => {
    const savedMembers = localStorage.getItem("members");
    if(savedMembers){
          return JSON.parse(savedMembers);
      }
    return [];
  };
    const [members, setMembers]=useState<Members[]>(loadMembers);
    const[name, setName]=useState("");  
    const [email,setEmail]=useState("");
    const[role, setRole]=useState(""    );
    const[edit, setEdit]=useState<number|null>(null);

    const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

    useEffect(()=>{
        localStorage.setItem("members", JSON.stringify(members));
    }, [members])

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()  
    if(!isValidEmail(email)){
        alert("please enter valid email")
        return;
    }
    if (edit) {
      setMembers(members.map(m => 
        m.id===edit ?{ ...m, name,email, role}:m
      ))
      setEdit(null)
    } else {
      const newMember: Members = {id: Date.now(),name, email, role,}
      setMembers([...members, newMember])
    }
    
    setName("")
    setEmail("")
    setRole("")
  }

            

    
    const handleEdit=(member:Members)=>{
        setName(member.name)
        setEmail(member.email)
        setRole(member.role)
        setEdit(member.id)
    }

    const handleDeelete=(id:number)=>{
        setMembers(members.filter(m=>m.id!=id));
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <p>{edit?"edit":"add"}</p>
                <input type=" text" style={{marginRight:"10px"}} placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} required/>
                <input type="text" value={email} placeholder="email" style={{marginRight:"10px"}} onChange={(e)=>setEmail(e.target.value)} required/>
                <select value={role} onChange={(e)=>setRole(e.target.value)} style={{marginRight:"10px"}}>   
                     <option value="frontend">frontend</option>
                    <option value="backend">backend</option>
                    <option value="designer">designer</option>  
                </select>
                <button type="submit">
                    {edit?"edit":"add"}
                </button>
                {
                    edit&&(
                        <button type="button" onClick={()=>{
                            setEdit(null)
                            setName("")
                            setEmail("")
                            setRole("")

                        }} style={{marginLeft:"10px"}}>cancel</button>
                    )
                }
            </form><br/><hr/><br/>

            <table border={1} style={{ borderCollapse: "collapse", width: "100%" }}>
  <thead>
    <tr>
      <th style={{ padding: "10px" }}>ID</th>
      <th style={{ padding: "10px" }}>Name</th>
      <th style={{ padding: "10px" }}>Email</th>
      <th style={{ padding: "10px" }}>Role</th>
      <th style={{ padding: "10px" }}>Action</th>
    </tr>
  </thead>

  <tbody>
    {members.map((member) => (
      <tr key={member.id}>
        <td style={{ padding: "10px" }}>{member.id}</td>
        <td style={{ padding: "10px" }}>{member.name}</td>
        <td style={{ padding: "10px" }}>{member.email}</td>
        <td style={{ padding: "10px" }}>{member.role}</td>
        <td style={{ padding: "10px" }}>
          <button onClick={() => handleEdit(member)} style={{marginRight:"10px"}}>Edit</button>
          <button onClick={() => handleDeelete(member.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
            {/* <table>
                <tr>
                    <th style={{padding:"10px"}}>id</th>
                    <th style={{padding:"10px"}}>name</th>
                    <th style={{padding:"10px"}}>email</th>
                    <th  style={{padding:"10px"}}>role</th>
                    <th  style={{padding:"10px"}}>action</th>
                </tr>
                <tr>
                    {
                        members.map((member)=>(
                            <tr key={member.id}>
                                <td  style={{padding:"10px"}}>{member.id}</td>
                                <td  style={{padding:"10px"}}>{member.name}</td>
                                <td  style={{padding:"10px"}}>{member.email}</td>
                                <td  style={{padding:"10px"}}>{member.role}</td>
                                <td>
                                    <button onClick={()=>handleEdit(member)}>edit</button>
                                    <button onClick={()=>handleDeelete(member.id)}>delete</button>
                                </td>

                                </tr>
                            
                        ))
                    }
                </tr>
                <tr>
                    
                </tr>

            </table> */}
        </div>
    )
}