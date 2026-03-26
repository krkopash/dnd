import { useEffect, useState } from "react"

const Time: React.FC = () => {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() =>setTime(new Date())
    , 1000)
    return () => clearInterval(interval)
  }, [])

  return (
      <p>{time.toLocaleTimeString()}</p>
  )
}
export default Time;