import React from "react";

const Weight = (props)=>{
    return (<div className={`${props.className}`} id={`${props.size}`} onClick={props.onClick}></div>)
}

export default Weight;