import * as api from '../../api/api';
import {LIST_INTEREST_RETURN_TRADE_REQUEST, LIST_INTEREST_RETURN_TRADE_SUCCESS, LIST_INTEREST_RETURN_TRADE_FAILED} from './actionTypes';

export const getListInterestRetunTrade = fetchData => async (dispatch) => {
    dispatch({
        type: LIST_INTEREST_RETURN_TRADE_REQUEST,
    })
    try {
        const res = await api.getListInterestRetunTrade(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: LIST_INTEREST_RETURN_TRADE_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: LIST_INTEREST_RETURN_TRADE_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: LIST_INTEREST_RETURN_TRADE_FAILED,
            message: er,
        })
    }
}
