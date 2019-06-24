import * as api from '../../api/api';
import {DETAIL_BOND_REQUEST, DETAIL_BOND_SUCCESS, DETAIL_BOND_FAILED} from './actionTypes';

export const getDetailBond = fetchData => async (dispatch) => {
    dispatch({
        type: DETAIL_BOND_REQUEST,
    })
    try {
        const res = await api.getDetailBond(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: DETAIL_BOND_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: DETAIL_BOND_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: DETAIL_BOND_FAILED,
            message: er,
        })
    }
}
