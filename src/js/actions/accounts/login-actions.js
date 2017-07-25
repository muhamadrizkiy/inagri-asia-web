/**
 * Created by luthfi on 12/20/16.
 */
//Middleware for calling API
import { webStorage } from '../../utils'
import svaraClient from '../../svara-client'

import { getAccount } from './get-account-actions'

//Process type for Login
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin(credential) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        credential
    }
}

function receiveLogin(data) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        token: data.accessToken,
        userId: data.userId
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export function loginUser(credential) {

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(credential));
        return svaraClient.loginAccount(credential)
            .then(function (response) {
                console.log(response);
                if (response.accessToken === undefined) {
                    return Promise.reject(new Error(response.message));
                } else {
                    webStorage.setItem('token', response.accessToken);
                    webStorage.setItem('userId', response.userId);
                    dispatch(receiveLogin(response));
                    dispatch(getAccount(response.userId));
                }
            })
            .catch(function (error) {
                dispatch(loginError(error));
                return Promise.reject(error);
            });
    }
}