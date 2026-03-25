const createImg=(url:any)=>{
    new Promise((resolve, reject)=>{
        const img=new Image()
        img.addEventListener('load', ()=>resolve(img));
        img.addEventListener('error', ()=>reject(Error));
        img.src=url;
    })
}

 export const getCroppedImg=async(imgsrc:any, crop:any)=>{
        const image=await createImg(imgsrc);
        const canvas = document.createElement('canvas');
        const ctx=canvas.getContext('2d');

        ctx?.drawImage(image, crop.x,crop.y, crop.width, crop.height,0,0,canvas.width, canvas.height)

        return new Promise((resolve)=>{
            canvas.toBlob((blob)=>{
                resolve(blob)
            }, ('image/jpeg'))
        })

    }