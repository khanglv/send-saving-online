import {DEDUCT_BANK_ACCOUNT_REQUEST, DEDUCT_BANK_ACCOUNT_SUCCESS, DEDUCT_BANK_ACCOUNT_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case DEDUCT_BANK_ACCOUNT_REQUEST:
            return{
                ...state,
                message: '',
            }
        case DEDUCT_BANK_ACCOUNT_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case DEDUCT_BANK_ACCOUNT_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;