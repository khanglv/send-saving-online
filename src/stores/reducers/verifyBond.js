import {VERIFY_BONDS_REQUEST, VERIFY_BONDS_SUCCESS, VERIFY_BONDS_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case VERIFY_BONDS_REQUEST:
            return{
                ...state,
                message: '',
            }
        case VERIFY_BONDS_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case VERIFY_BONDS_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;