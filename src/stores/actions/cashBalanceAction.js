import * as api from '../../api/api';
import {CASH_BALANCE_REQUEST, CASH_BALANCE_SUCCESS, CASH_BALANCE_FAILED} from './actionTypes';

export const getCashBalance = fetchData => async (dispatch) => {
    dispatch({
        type: CASH_BALANCE_REQUEST,
    })
    try {
        const res = await api.getCashBalance(fetchData);
        if (res && !res.error && !res.message) {
            return dispatch({
                type: CASH_BALANCE_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: CASH_BALANCE_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: CASH_BALANCE_FAILED,
            message: er,
        })
    }
}
