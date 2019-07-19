import * as api from '../../api/api';
import {TRANSACTION_HISTORY_REQUEST, TRANSACTION_HISTORY_SUCCESS, TRANSACTION_HISTORY_FAILED} from './actionTypes';

export const transactionHistory = fetchData => async (dispatch) => {
    dispatch({
        type: TRANSACTION_HISTORY_REQUEST,
    })
    try {
        const res = await api.transactionHistory();
        if (res && !res.error) {
            return dispatch({
                type: TRANSACTION_HISTORY_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: TRANSACTION_HISTORY_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: TRANSACTION_HISTORY_FAILED,
            message: er,
        })
    }
}
