import {CURRENT_LIST_BONDS_HAVE_REQUEST, CURRENT_LIST_BONDS_HAVE_SUCCESS, CURRENT_LIST_BONDS_HAVE_FAILED,
    WAIT_LIST_BONDS_HAVE_REQUEST, WAIT_LIST_BONDS_HAVE_SUCCESS, WAIT_LIST_BONDS_HAVE_FAILED} from '../actions/actionTypes';

const initialState = {
    dataWait: [],
    dataCurrent: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case CURRENT_LIST_BONDS_HAVE_REQUEST:
            return{
                ...state,
                message: '',
            }
        case CURRENT_LIST_BONDS_HAVE_SUCCESS:
            return{
                ...state,
                data: action.dataCurrent,
            }
        case CURRENT_LIST_BONDS_HAVE_FAILED:
            return {
                ...state,
                message: action.message,
            }
        case WAIT_LIST_BONDS_HAVE_REQUEST:
            return {
                ...state,
                message: '',
            }
        case WAIT_LIST_BONDS_HAVE_SUCCESS:
            return {
                ...state,
                data: action.dataWait,
            }
        case WAIT_LIST_BONDS_HAVE_FAILED:
            return {
                ...state,
                message: action.message,
            }      
        default: 
            return state;
    }
}

export default reducer;