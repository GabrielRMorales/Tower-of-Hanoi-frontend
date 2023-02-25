import React from "react";

const Tower = (props)=>{
    return (<div className={`tower ${props.className}`} id={props.order} onClick={props.onClick} ></div>)
}

export default Tower;