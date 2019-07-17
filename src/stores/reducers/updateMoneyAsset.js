import {UPDATE_MONEY_ASSET_REQUEST, UPDATE_MONEY_ASSET_SUCCESS, UPDATE_MONEY_ASSET_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case UPDATE_MONEY_ASSET_REQUEST:
            return{
                ...state,
                message: '',
            }
        case UPDATE_MONEY_ASSET_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case UPDATE_MONEY_ASSET_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;