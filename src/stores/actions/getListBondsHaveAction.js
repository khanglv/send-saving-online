import * as api from '../../api/api';
import {CURRENT_LIST_BONDS_HAVE_REQUEST, CURRENT_LIST_BONDS_HAVE_SUCCESS, CURRENT_LIST_BONDS_HAVE_FAILED,
    WAIT_LIST_BONDS_HAVE_REQUEST, WAIT_LIST_BONDS_HAVE_SUCCESS, WAIT_LIST_BONDS_HAVE_FAILED
} from './actionTypes';

export const currentListBondsHave = fetchData => async (dispatch) => {
    dispatch({
        type: CURRENT_LIST_BONDS_HAVE_REQUEST,
    })
    try {
        const res = await api.currentListBondsHave(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: CURRENT_LIST_BONDS_HAVE_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: CURRENT_LIST_BONDS_HAVE_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: CURRENT_LIST_BONDS_HAVE_FAILED,
            message: er,
        })
    }
}

export const waitListBondsHave = fetchData => async (dispatch) => {
    dispatch({
        type: WAIT_LIST_BONDS_HAVE_REQUEST,
    })
    try {
        const res = await api.waitListBondsHave(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: WAIT_LIST_BONDS_HAVE_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: WAIT_LIST_BONDS_HAVE_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: WAIT_LIST_BONDS_HAVE_FAILED,
            message: er,
        })
    }
}
