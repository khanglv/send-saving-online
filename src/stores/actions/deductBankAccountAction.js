import * as api from '../../api/api';
import {DEDUCT_BANK_ACCOUNT_REQUEST, DEDUCT_BANK_ACCOUNT_SUCCESS, DEDUCT_BANK_ACCOUNT_FAILED} from './actionTypes';

export const deductBankAccount = fetchData => async (dispatch) => {
    dispatch({
        type: DEDUCT_BANK_ACCOUNT_REQUEST,
    })
    try {
        const res = await api.deductBankAccount(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: DEDUCT_BANK_ACCOUNT_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: DEDUCT_BANK_ACCOUNT_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: DEDUCT_BANK_ACCOUNT_FAILED,
            message: er,
        })
    }
}
