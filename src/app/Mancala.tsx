import React from "react"
import { IPit } from "./IPit";
import { Pit } from "./Pit"

interface IState {
    player: number;
    board: IPit[];
}

let player2Display = {
    width: "1000px",
    textAlign: "right"
}

let BoardStyles = {
    border: '5px',
    borderStyle: "solid",
    height: "300px",
    width: "1000px",
    display: "inline-block"
}

let innerPitsStyle = {
    border: '1px',
    borderStyle: "solid",
    height: "100%",
    width: "75%",
    position: "relative",
    display: "inline-block"
}

export class Mancala extends React.Component<{}, IState> {
    stonePath: number[] = [8, 9, 10, 11, 12, 13, 7, 6, 5, 4, 3, 2, 1, 0];
    constructor(props: {}) {
        super(props);
        this.state = { player: 0, board: [] };
        for (let i = 0; i < 14; i++) {
            if (i % 7 === 0) {
                this.state.board.push({ stoneCount: 0, goal: true, onClick: () => { } })
            }
            else
                this.state.board.push({ stoneCount: 4, goal: false, onClick: () => { this.setState(this.getNextBoardLayout(i)) } })
        }
    }

    getNextBoardLayout(pitNum: number): IState {
        let newBoard = [...this.state.board];
        let stones = newBoard[pitNum].stoneCount;
        if (stones != 0) {
            newBoard[pitNum].stoneCount = 0;
            let index = this.getIndexOnPath(pitNum) + 1;
            let lastAdded: number = index;
            for (stones; stones > 0; stones--) {
                newBoard[this.stonePath[index]].stoneCount++;
                lastAdded = index;
                index = (index + 1) % 14
            }
            if (this.stonePath[lastAdded] == 7 || this.stonePath[lastAdded] == 0) {
                return {
                    player: this.state.player,
                    board: newBoard
                }
            }

            return {
                player: (this.state.player + 1) % 2,
                board: newBoard
            }
        }

        return this.state;
    }

    getIndexOnPath(pitNum: number): number {
        for (let i = 0; i < this.stonePath.length; i++) {
            if (this.stonePath[i] === pitNum)
                return i;
        }

        return -1;
    }

    render() {
        return (
            <div>
                <div>
                    Player {this.state.player}'s turn
                </div>
                <br/>
                <br/>
                <div>
                    Player 0's side
                </div>
                <div style={BoardStyles}>

                    <Pit pitToRender={this.state.board[0]} />
                    <div style={innerPitsStyle}>

                        {this.state.board.map((pit, index) => {
                            if (index % 7 != 0)
                                return <Pit pitToRender={pit} />
                            else
                                return null
                        })}
                    </div>
                    <Pit pitToRender={this.state.board[7]} />
                </div>
                <div style={player2Display}>
                    Player 1's side
                </div>
            </div>
        )
    }
}