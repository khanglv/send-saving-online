import * as api from '../../api/api';
import {VERIFY_BONDS_REQUEST, VERIFY_BONDS_SUCCESS, VERIFY_BONDS_FAILED} from './actionTypes';

export const verifyBonds = fetchData => async (dispatch) => {
    dispatch({
        type: VERIFY_BONDS_REQUEST,
    })
    try {
        const res = await api.verifyBonds(fetchData);
        if (res && !res.error) {
            localStorage.setItem('accessTokenBondsKey', res.token);
            return dispatch({
                type: VERIFY_BONDS_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: VERIFY_BONDS_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: VERIFY_BONDS_FAILED,
            message: er,
        })
    }
}
