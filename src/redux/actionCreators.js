import * as ActionTypes from './action'

export const newGame = (numPlayers) => ({
    type: ActionTypes.NEW_GAME,
    payload: numPlayers
})

export const dealCards = () => ({
    type: ActionTypes.DEAL_CARDS
})

export const drawCard = (card, playerIndex) => ({
    type: ActionTypes.DRAW_CARD,
    payload: {
        card,
        playerIndex
    }
})

export const discardCard = (cardIndex, playerIndex) => ({
    type: ActionTypes.DISCARD_CARD,
    payload: {
        cardIndex,
        playerIndex
    }
})

export const passTurn = () => ({
    type: ActionTypes.PASS_TURN
})

export const win = () => ({
    type: ActionTypes.WIN
})

export const lose = () => ({
    type: ActionTypes.LOSE
})