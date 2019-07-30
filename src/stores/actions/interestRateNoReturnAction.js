import * as api from '../../api/api';
import {INTEREST_RATE_NO_RETURN_REQUEST, INTEREST_RATE_NO_RETURN_SUCCESS, INTEREST_RATE_NO_RETURN_FAILED} from './actionTypes';

export const getListInterestRateNoReturn = fetchData => async (dispatch) => {
    dispatch({
        type: INTEREST_RATE_NO_RETURN_REQUEST,
    })
    try {
        const res = await api.getListInterestRateNoReturn();
        if (res && !res.error) {
            return dispatch({
                type: INTEREST_RATE_NO_RETURN_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: INTEREST_RATE_NO_RETURN_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: INTEREST_RATE_NO_RETURN_FAILED,
            message: er,
        })
    }
}
