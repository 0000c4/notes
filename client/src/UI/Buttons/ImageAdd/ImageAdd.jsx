import React from 'react';
function ImageAdd({ ...props }) {
    return (
        <div style={{position: 'relative', width: 30 +'px', height: 30 +'px'}}>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#6E7073" style={{position: 'absolute',top: '0', left: '0', width: 36 +'px', height: 36 +'px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <input type="file"  style={{position:'absolute', top: '0', left: '0', opacity: '0'}} {...props}/>
        </div>
    )
}

export default ImageAdd;