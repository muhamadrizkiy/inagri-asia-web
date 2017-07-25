/**
 * Created by luthfi on 12/20/16.
 */

import { webStorage } from '../../utils';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

// Logs the user out
export function logoutAccount() {
    return dispatch => {
        dispatch(requestLogout())
        webStorage.clear();
        dispatch(receiveLogout())
    }
}