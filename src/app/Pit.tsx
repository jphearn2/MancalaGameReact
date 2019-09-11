import React from "react"
import { IPit } from "./IPit";

let pitStyle = {
    border: "1px",
    borderStyle: "solid",
    width: "16.3%",
    height: "50%",
    display: "inline-block",
    position: "relative",
    textAlign: "center"
}

let goalStyle = {
    top: "-50%",
    border: "1px",
    borderStyle: "solid",
    width: "12.2%",
    height: "100%",
    display: "inline-block",
    position: "relative",
    textAlign: "center"
}

interface IProp {
    pitToRender: IPit;
}

export function Pit(props: IProp){
    if(props.pitToRender.goal)
        return <div style={goalStyle} > {props.pitToRender.stoneCount} </div>
    else
        return <div style={pitStyle} onClick={props.pitToRender.onClick} > {props.pitToRender.stoneCount} </div>;
}