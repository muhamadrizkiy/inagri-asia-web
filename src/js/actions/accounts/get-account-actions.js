/**
 * Created by muhamadrizki on 24/07/17.
 */

import inagriClient from '../../inagri-client'

export const GET_ACCOUNT_REQUEST = 'GET_ACCOUNT_REQUEST';
export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS';
export const GET_ACCOUNT_FAILURE = 'GET_ACCOUNT_FAILURE';


function requestGetAccount() {
    return {
        type: GET_ACCOUNT_REQUEST,
        isFetching: true
    }
}

function receiveGetAccount(account) {
    return {
        type: GET_ACCOUNT_SUCCESS,
        isFetching: false,
        account
    }
}

function getAccountError(message) {
    return {
        type: GET_ACCOUNT_FAILURE,
        isFetching: false,
        message
    }
}

export function getAccount(id) {
    return dispatch => {
        dispatch(requestGetAccount());
        return inagriClient.apiGet(`accounts/${id}`).then(function (response) {
            dispatch(receiveGetAccount(response.data));
        }).catch(function (error) {
            dispatch(getAccountError(error));
            return Promise.reject(error);
        })
    }
}