import {LIST_INTEREST_RETURN_TRADE_REQUEST, LIST_INTEREST_RETURN_TRADE_SUCCESS, LIST_INTEREST_RETURN_TRADE_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case LIST_INTEREST_RETURN_TRADE_REQUEST:
            return{
                ...state,
                message: '',
            }
        case LIST_INTEREST_RETURN_TRADE_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case LIST_INTEREST_RETURN_TRADE_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;