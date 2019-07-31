import * as api from '../../api/api';
import {GEN_INTEREST_RATE_NO_RETURN_REQUEST, GEN_INTEREST_RATE_NO_RETURN_SUCCESS, GEN_INTEREST_RATE_NO_RETURN_FAILED} from './actionTypes';

export const genListInterestRateNoReturn = fetchData => async (dispatch) => {
    dispatch({
        type: GEN_INTEREST_RATE_NO_RETURN_REQUEST,
    })
    try {
        const res = await api.genListInterestRateNoReturn();
        if (res && !res.error) {
            return dispatch({
                type: GEN_INTEREST_RATE_NO_RETURN_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: GEN_INTEREST_RATE_NO_RETURN_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: GEN_INTEREST_RATE_NO_RETURN_FAILED,
            message: er,
        })
    }
}
