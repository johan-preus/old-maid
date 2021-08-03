import React, {Component} from 'react'
import { connect } from 'react-redux'


const mapStateToProps = state => {
    return {
        game: state.game
    }
}

function RenderPlayer({player, index}){
    if(index === 0) return <React.Fragment />
    if(!player[index].cards.length){
        return(
            <React.Fragment>
                <h1>Player {index}</h1>
                <p>Out of cards!</p>
            </React.Fragment>
        )
    }
    return(
        <React.Fragment>
            <h1>Player {index}</h1>
            <p>{player[index].cards.length} cards</p>
            {/* <p>Target: {player[index].target}</p> */}
        </React.Fragment>
    )
}

class Players extends Component {
    constructor(props){
        super(props)
    }
    render(){
        const arr = []
        for(let key in this.props.game.players){
            const value = this.props.game.players[key]
            arr.push({[key]: value})
        }
        const players = arr.map((player, index) => {
            return(
                <div className="col" key={index}>
                    <RenderPlayer player={player} index={index} />
                </div>
            )
        })
        return(
            <div className="row">
                {players}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Players)