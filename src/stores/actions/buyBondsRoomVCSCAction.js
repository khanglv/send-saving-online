import * as api from '../../api/api';
import {BUY_BONDS_ROOM_VCSC_REQUEST, BUY_BONDS_ROOM_VCSC_SUCCESS, BUY_BONDS_ROOM_VCSC_FAILED} from './actionTypes';

export const buyBondsRoomVCSC = fetchData => async (dispatch) => {
    dispatch({
        type: BUY_BONDS_ROOM_VCSC_REQUEST,
    })
    try {
        const res = await api.buyBondsRoomVCSC(fetchData);
        if (res && !res.error) {
            return dispatch({
                type: BUY_BONDS_ROOM_VCSC_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: BUY_BONDS_ROOM_VCSC_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: BUY_BONDS_ROOM_VCSC_FAILED,
            message: er,
        })
    }
}
