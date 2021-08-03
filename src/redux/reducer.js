import * as ActionTypes from './action'
import Game from '../Game'

export const Reducer = (state = {}, action) => {
    let newState, player, game
    switch (action.type){
        case ActionTypes.NEW_GAME:
            state = {...state, isWinner: false, isLoser: false, game: new Game(action.payload)}
            return state
        case ActionTypes.DEAL_CARDS:
            // this spread is necessary for immutability
            newState = {...state}
            newState.game.dealCards()
            return newState
        case ActionTypes.DRAW_CARD:
            player = state.game.players[action.payload.playerIndex]
            player.drawCard(action.payload.card)
            return state
        case ActionTypes.DISCARD_CARD:
            player = state.game.players[action.payload.playerIndex]
            player.cards = 
                player.cards
                    .slice(0, action.payload.cardIndex)
                    .concat(
                        player.cards
                            .slice(action.payload.cardIndex + 1)
                    )
            if(!player.cards.length){
                player.removePlayer()
            }
            return state
        case ActionTypes.PASS_TURN:
            state.game.currentTurn++
            if(state.game.currentTurn >= state.game.numPlayers){
                state.game.currentTurn = 0
            }
            return state
        case ActionTypes.WIN:
            return {...state, isWinner: true}
        case ActionTypes.LOSE:
            return {...state, isLoser: true}
        default:
            return state
    }
}
