import useGlobalEvent from "beautiful-react-hooks/useGlobalEvent"
import * as React from "react";
import { GridLayout, ReactGridLayout } from "react-grid-layout";

const {useState}=React;

 const Resize=()=>{
    
    const [windowwidth, setWindowwidth]=useState(window.innerWidth);
    const onWindowResize=useGlobalEvent("resize");    

    onWindowResize((event:React.SyntheticEvent)=>{
        setWindowwidth(window.innerWidth);
    })
    return(
        <div>
            <div style={{width:"20px", maxWidth:"20px"}}>test</div>
            <button>{windowwidth}</button>
        </div>
    )

    }
    export default Resize;