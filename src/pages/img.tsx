import { useState } from "react";
import { getCroppedImg } from "./crop";
import Cropper from "react-easy-crop";


export const ImageCropper=({getBlog, inputImg}: any)=>{
    const [zoom,setZoom]=useState(1);
    const [crop, setCrop]=useState({x:0,y:0});


    const onCropComplete=async(croppedAreaPixels:any, _:any)=>{
        const croppedImg=await getCroppedImg(inputImg,croppedAreaPixels)
        getBlog(croppedImg);
    }
    return(
        <div style={{position:"relative"}}>
            <Cropper image={inputImg} crop={crop} zoom={zoom} aspect={1} 
            onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom}/>
        </div>
    )
    
}