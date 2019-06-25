import {BUY_BONDS_ROOM_VCSC_REQUEST, BUY_BONDS_ROOM_VCSC_SUCCESS, BUY_BONDS_ROOM_VCSC_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case BUY_BONDS_ROOM_VCSC_REQUEST:
            return{
                ...state,
                message: '',
            }
        case BUY_BONDS_ROOM_VCSC_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case BUY_BONDS_ROOM_VCSC_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;