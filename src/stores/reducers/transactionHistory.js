import {TRANSACTION_HISTORY_REQUEST, TRANSACTION_HISTORY_SUCCESS, TRANSACTION_HISTORY_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case TRANSACTION_HISTORY_REQUEST:
            return{
                ...state,
                message: '',
            }
        case TRANSACTION_HISTORY_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case TRANSACTION_HISTORY_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;