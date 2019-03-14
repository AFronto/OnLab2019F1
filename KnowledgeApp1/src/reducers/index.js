import { combineReducers, createStore } from 'redux'
import { reducer as formReducer } from 'redux-form'

import navigation from './navigation'
import auth from './auth'

import { unauthorizeUser } from '../actions/auth'

const form = () => formReducer

const getNewReducer = _ =>
    combineReducers(
        Object.entries({
            navigation,
            auth,
            form,
        }).reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: value()
            }),
            {}
        )
    )

const reducer = getNewReducer()

export default (state, action) => {
    if (action.type === unauthorizeUser.getType()) {
        return reducer(createStore(getNewReducer()).getState())
    }

    return reducer(state, action)
}