import { useEffect, useState } from "react"

// interface CityData{
//   id:number,
//   tem:number,
//   country: string
// }

// interface ClockItems{
//   id: number,
//   city: string,
//   time: string

// }
const Time: React.FC = () => {
  const [time, setTime] = useState(new Date())
  // const [city, setCity]=useState("");
  
  useEffect(() => {
    const interval = setInterval(() =>setTime(new Date())
    , 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <p>{time.toLocaleString()}</p>
      {/* <form>
        <label>city:</label>
        <input type="text" value={city} onChange={(e)=>setCity(e.target.value)}/>
        <button onClick={handleSubmit}>submit</button>
      </form> */}
    </div>
  )
}
export default Time;
