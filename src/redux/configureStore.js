import { createStore, combineReducers } from 'redux';
import { GameReducer } from './game';
import { CardReducer } from './card';
import { Reducer } from './reducer'

export const ConfigureStore = () => {
    const store = createStore(
        Reducer
    )
    return store
}

