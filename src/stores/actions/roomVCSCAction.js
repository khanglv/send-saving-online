import * as api from '../../api/api';
import {ROOM_VCSC_REQUEST, ROOM_VCSC_SUCCESS, ROOM_VCSC_FAILED} from './actionTypes';

export const getListRoomVCSC = fetchData => async (dispatch) => {
    dispatch({
        type: ROOM_VCSC_REQUEST,
    })
    try {
        const res = await api.getListRoomVCSC();
        if (res && !res.error) {
            return dispatch({
                type: ROOM_VCSC_SUCCESS,
                data: res
            })
        } else {
            return dispatch({
                type: ROOM_VCSC_FAILED,
                message: res.message,
            })
        }
    } catch (er) {
        return dispatch({
            type: ROOM_VCSC_FAILED,
            message: er,
        })
    }
}
