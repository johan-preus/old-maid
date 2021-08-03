import React, { Component } from "react";
import { connect } from "react-redux";
import { discardCard, drawCard, passTurn, win, lose } from "./redux/actionCreators";

const mapStateToProps = state => {
    return {
        game: state.game
    }
}

const mapDispatchToProps = {
    discardCard,
    drawCard,
    passTurn,
    win,
    lose
}

function RenderCard(props){
    return(
        <img src="PlayingCards/card-back1.png" alt="Face down card" />
    )
}

class DrawCards extends Component {
    constructor(props) {
        super(props)
    }
    handleClick(index, card){
        this.props.discardCard(index, this.props.game.target)
        this.props.drawCard(card, 0)
        if(!this.props.game.players[0].cards.length){
            this.props.win()
            return
        }
        this.props.passTurn()
    }
    render(){
        const game = this.props.game
        if(game.players[game.target] === undefined){
            return <div />
        }
        let targetCards = game.players[game.target].cards
        if(!targetCards.length){
            while(!targetCards.length){
                game.target++
                if(game.players[game.target] === undefined){
                    this.props.lose()
                    return <div />
                }
                targetCards = game.players[game.target].cards
            }
        }
        const cards = this.props.game.players[this.props.game.target].cards.map((card, index) => {
            return (
                <div className="col my-3" key={card.name}>
                    <button onClick={() => {
                        this.handleClick(index, card)
                        this.forceUpdate()
                        this.props.mainComponent.forceUpdate()
                    }}>
                        <RenderCard />
                    </button>
                </div>
            )
        })
        return(
            <div className="row">
                {cards}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawCards)