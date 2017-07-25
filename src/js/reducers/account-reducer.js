/**
 * Created by luthfi on 12/20/16.
 */

import { webStorage } from '../utils'

import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actions/accounts/login-actions'
import {LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE} from '../actions/accounts/logout-actions'
import {GET_ACCOUNT_REQUEST, GET_ACCOUNT_SUCCESS, GET_ACCOUNT_FAILURE} from '../actions/accounts/get-account-actions'

export default function reducer(state = {
    isFetching: false,
    isAuthenticated: webStorage.getItem('token') ? true : false,
    token: webStorage.getItem('token'),
    userId: webStorage.getItem('userId'),
    account: {}
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            })
        case GET_ACCOUNT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case GET_ACCOUNT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                account: action.account,
                errorMessage: ''
            })
        case GET_ACCOUNT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.message
            })
        default:
            return state
    }
}