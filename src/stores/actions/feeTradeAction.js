import * as api from '../../api/api';
import {GET_LIST_FEE_TRADE_REQUEST, GET_LIST_FEE_TRADE_SUCCESS, GET_LIST_FEE_TRADE_FAILED} from './actionTypes';

export const getListFeeTrade = fetchData => async (dispatch) => {
    dispatch({
        type: GET_LIST_FEE_TRADE_REQUEST,
    })
    try {
        const res = await api.getListFeeTrade(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: GET_LIST_FEE_TRADE_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: GET_LIST_FEE_TRADE_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: GET_LIST_FEE_TRADE_FAILED,
            message: er,
        })
    }
}
