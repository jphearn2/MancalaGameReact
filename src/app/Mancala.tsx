import React from "react"
import { IPit } from "./IPit";

interface IState{
    player: number;
    board: IPit[];
}

export class Mancala extends React.Component<{}, IState> {
    constructor(props: {}){
        super(props);
    }
}