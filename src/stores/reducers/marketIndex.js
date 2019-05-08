import {
    MARKET_INDEX_LIST_REQUEST, 
    MARKET_INDEX_LIST_SUCCESS, 
    MARKET_INDEX_LIST_FAILED
} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case MARKET_INDEX_LIST_REQUEST:
            return{
                ...state,
                message: '',
            }
        case MARKET_INDEX_LIST_SUCCESS:
            return{
                ...state,
                data: action.data,
                message: '',
            }
        case MARKET_INDEX_LIST_FAILED:
            return {
                ...state,
                message: "Bạn không có quyền truy cập data này",
            }  
        default: 
            return state;
    }
}

export default reducer;