import * as ActionTypes from './action'

export const CardReducer = (state = {}, action) => {
    switch (action.type){
        case ActionTypes.DEAL_CARDS:
            // this spread is necessary for immutability
            const newState = {...state}
            newState.game.dealCards()
            console.log('hi', newState)
            return newState
        case ActionTypes.DRAW_CARD:
            const cards = state.game.players[action.payload.playerIndex].cards
            state.game.players[action.payload.playerIndex].cards = [...cards, action.payload.card]
            return state
        case ActionTypes.DISCARD_CARD:
            state.game.players[action.payload.playerIndex].cards = 
                state.game.players[action.payload.playerIndex].cards
                    .slice(0, action.payload.cardIndex)
                    .concat(
                        state.game.players[action.payload.playerIndex].cards
                            .slice(action.payload.cardIndex + 1)
                    )
            return state
        default:
            return state
    }
}