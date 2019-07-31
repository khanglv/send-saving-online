import {GEN_INTEREST_RATE_NO_RETURN_REQUEST, GEN_INTEREST_RATE_NO_RETURN_SUCCESS, GEN_INTEREST_RATE_NO_RETURN_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case GEN_INTEREST_RATE_NO_RETURN_REQUEST:
            return{
                ...state,
                message: '',
            }
        case GEN_INTEREST_RATE_NO_RETURN_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case GEN_INTEREST_RATE_NO_RETURN_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;