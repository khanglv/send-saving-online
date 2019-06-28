import * as api from '../../api/api';
import {GET_LIST_BONDS_OF_INVESTOR_REQUEST, GET_LIST_BONDS_OF_INVESTOR_SUCCESS, GET_LIST_BONDS_OF_INVESTOR_FAILED} from './actionTypes';

export const getListBondsOfInvestor = (fetchData, status) => async (dispatch) => {
    dispatch({
        type: GET_LIST_BONDS_OF_INVESTOR_REQUEST,
    })
    try {
        const res = await api.getListBondsOfInvestor(fetchData, status);
        if (res && !res.error) {
            return dispatch({
                type: GET_LIST_BONDS_OF_INVESTOR_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: GET_LIST_BONDS_OF_INVESTOR_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: GET_LIST_BONDS_OF_INVESTOR_FAILED,
            message: er,
        })
    }
}

