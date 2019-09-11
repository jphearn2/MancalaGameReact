import React from "react"
import { IPit } from "./IPit";
import { Pit } from "./Pit"

interface IState {
    gameOver: boolean;
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
        this.state = { gameOver: false, player: 0, board: [] };
        for (let i = 0; i < 14; i++) {
            if (i % 7 === 0) {
                this.state.board.push({ stoneCount: 0, goal: true, onClick: () => { } })
            }
            else
                this.state.board.push({ stoneCount: 4, goal: false, onClick: () => { this.setState(this.getNextBoardLayout(i)) } })
        }
        this.resetBoard = this.resetBoard.bind(this);
    }

    validPitForPlayer(index: number): boolean {
        return (this.state.player === 0 && index > 7) || (this.state.player === 1 && index < 7)
    }

    getNextBoardLayout(pitNum: number): IState {
        let newBoard = [...this.state.board];
        let stones = newBoard[pitNum].stoneCount;
        let index = this.getIndexOnPath(pitNum) + 1;
        if (stones != 0 && this.validPitForPlayer(index)) {
            newBoard[pitNum].stoneCount = 0;
            let lastAdded: number = index;
            for (stones; stones > 0; stones--) {
                newBoard[this.stonePath[index]].stoneCount++;
                lastAdded = index;
                index = (index + 1) % 14
            }
            if ((this.state.player === 1 && this.stonePath[lastAdded] == 7) || (this.state.player === 0 && this.stonePath[lastAdded] == 0)) {
                if (this.currentPlayerHasValidMove(newBoard)) {
                    return {
                        gameOver: this.gameOver(newBoard),
                        player: this.state.player,
                        board: newBoard
                    }
                }
                else {
                    alert("Player " + (this.state.player + " has no valid moves"));
                    return {
                        gameOver: this.gameOver(newBoard),
                        player: (this.state.player + 1) % 2,
                        board: newBoard
                    }
                }
            }

            if (!this.nextPlayerHasValidMove(newBoard)) {
                alert("Player " + (this.state.player + 1 % 2 + " has no valid moves"));
                return {
                    gameOver: this.gameOver(newBoard),
                    player: this.state.player,
                    board: newBoard
                }
            }

            return {
                gameOver: this.gameOver(newBoard),
                player: (this.state.player + 1) % 2,
                board: newBoard
            }
        }

        return this.state;
    }

    gameOver(newBoard: IPit[]): boolean {
        for (let i = 1; i < 14; i++) {
            if (!newBoard[i].goal && newBoard[i].stoneCount != 0)
                return false;
        }
        return true;
    }

    nextPlayerHasValidMove(newBoard: IPit[]): boolean {
        if (this.state.player === 0) {
            for (let i = 8; i < 14; i++) {
                if (newBoard[i].stoneCount > 0)
                    return true;
            }
        }
        else {
            for (let i = 1; i < 7; i++) {
                if (newBoard[i].stoneCount > 0)
                    return true;
            }
        }
        return false;
    }

    currentPlayerHasValidMove(newBoard: IPit[]): boolean {
        if (this.state.player === 0) {
            for (let i = 1; i < 7; i++) {
                if (newBoard[i].stoneCount > 0)
                    return true;
            }
        }
        else {
            for (let i = 8; i < 14; i++) {
                if (newBoard[i].stoneCount > 0)
                    return true;
            }
        }
        return false;
    }

    getIndexOnPath(pitNum: number): number {
        for (let i = 0; i < this.stonePath.length; i++) {
            if (this.stonePath[i] === pitNum)
                return i;
        }

        return -1;
    }

    resetBoard(){
        let newBoard: IPit[] = [];
        for (let i = 0; i < 14; i++) {
            if (i % 7 === 0) {
                newBoard.push({ stoneCount: 0, goal: true, onClick: () => { } })
            }
            else
                newBoard.push({ stoneCount: 4, goal: false, onClick: () => { this.setState(this.getNextBoardLayout(i)) } })
        }
        this.setState({ gameOver: false, player: 0, board: newBoard } );
    }

    render() {
        if (this.state.gameOver) {
            let winner = -1;
            if(this.state.board[0].stoneCount > this.state.board[7].stoneCount)
                winner = 0;
            else
                winner = 1;
            return (<div>
                <div>
                    Player 0: {this.state.board[0].stoneCount} <br/>
                    Player 1: {this.state.board[7].stoneCount}
                </div>
                Player {winner} has won!
                <button onClick={this.resetBoard}>Play Again</button>
            </div>)
        }
        else {
            return (
                <div>
                    <div>
                        Player {this.state.player}'s turn
                </div>
                    <br />
                    <br />
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
}