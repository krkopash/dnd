import { useState, useEffect } from "react";

export const imgupload=()=>{
    const [blob,setBlob]=useState(null);
    const [inputimg, setInputimg]=useState('');

    const getBlob=(blob:any)=>{
        setBlob(blob);
    }
    const onInputChange=(e:any)=>{
        const file=e.target.files[0]
        const reader:FileReader=new FileReader()
        reader.addEventListener('load', ()=>{
            
            setInputimg(reader.result);
            inputimg(blob, getBlob)
        })
        onInputChange
    }

}

export const imageupload=()=>{
    
    return(
        <div>
            <p></p>
        </div>
    )
}