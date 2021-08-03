import { Component } from "react"
import { connect } from "react-redux"
import { passTurn, drawCard, discardCard } from "./redux/actionCreators"

const mapStateToProps = state => {
    return {
        game: state.game
    }
}

const mapDispatchToProps = {
    passTurn,
    drawCard,
    discardCard
}

class OpponentTurn extends Component{
    constructor(props) {
        super(props)
    }
    render(){
        while(this.props.game.currentTurn !== 0){
            const game = this.props.game
            const player = game.players[game.currentTurn]
            if(player.isWinner){
                this.props.passTurn()
                continue
            }
            while(game.players[player.target].isWinner){
                player.target++
                if(game.players[player.target] === undefined){
                    player.target = 0
                }
                
            }
            const target = game.players[player.target]
            const numCards = target.cards.length
            const randNum = Math.floor(Math.random() * numCards)
            const card = target.cards[randNum]
            this.props.drawCard(card, game.currentTurn)
            this.props.discardCard(randNum, player.target)
            this.props.passTurn()
        }
        return <div />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpponentTurn)