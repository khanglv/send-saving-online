import {GET_LIST_BONDS_OF_INVESTOR_REQUEST, GET_LIST_BONDS_OF_INVESTOR_SUCCESS, GET_LIST_BONDS_OF_INVESTOR_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case GET_LIST_BONDS_OF_INVESTOR_REQUEST:
            return{
                ...state,
                message: '',
            }
        case GET_LIST_BONDS_OF_INVESTOR_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case GET_LIST_BONDS_OF_INVESTOR_FAILED:
            return {
                ...state,
                message: action.message,
            }
        default: 
            return state;
    }
}

export default reducer;