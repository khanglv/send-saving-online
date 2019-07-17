import * as api from '../../api/api';
import {UPDATE_MONEY_ASSET_REQUEST, UPDATE_MONEY_ASSET_SUCCESS, UPDATE_MONEY_ASSET_FAILED} from './actionTypes';

export const updateMoneyAsset = fetchData => async (dispatch) => {
    dispatch({
        type: UPDATE_MONEY_ASSET_REQUEST,
    })
    try {
        const res = await api.updateMoneyAsset(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: UPDATE_MONEY_ASSET_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: UPDATE_MONEY_ASSET_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: UPDATE_MONEY_ASSET_FAILED,
            message: er,
        })
    }
}
