import {ROOM_VCSC_REQUEST, ROOM_VCSC_SUCCESS, ROOM_VCSC_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case ROOM_VCSC_REQUEST:
            return{
                ...state,
                message: '',
            }
        case ROOM_VCSC_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case ROOM_VCSC_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;