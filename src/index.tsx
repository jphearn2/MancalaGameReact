import React from "react"
import ReactDOM from "react-dom"
import { Mancala } from "app/Mancala";

class App extends React.Component {
    render(){
        return (<Mancala />)
    }
}

ReactDOM.render(<App />, document.getElementById("root"));