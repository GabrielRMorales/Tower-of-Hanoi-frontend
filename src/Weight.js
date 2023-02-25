import React from "react";

const Weight = (props)=>{
    return (<div className={`weight ${props.className}`} id={`${props.size}`} onClick={props.onClick}></div>)
}

export default Weight;