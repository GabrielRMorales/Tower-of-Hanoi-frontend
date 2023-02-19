import React from "react";

const Weight = (props)=>{
    return (<div className="weight" id={`${props.size}`} onClick={props.onClick}></div>)
}

export default Weight;