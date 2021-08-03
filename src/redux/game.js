import * as ActionTypes from './action'
import Game from '../Game'

export const GameReducer = (state = {}, action) => {
    switch (action.type){
        case ActionTypes.NEW_GAME:
            state = {...state, game: new Game()}
            console.log(state);
            return state
        default:
            return state
    }
}