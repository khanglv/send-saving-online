import {CASH_BALANCE_REQUEST, CASH_BALANCE_SUCCESS, CASH_BALANCE_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case CASH_BALANCE_REQUEST:
            return{
                ...state,
                message: '',
            }
        case CASH_BALANCE_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case CASH_BALANCE_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;