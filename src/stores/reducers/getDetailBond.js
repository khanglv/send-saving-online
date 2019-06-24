import {DETAIL_BOND_REQUEST, DETAIL_BOND_SUCCESS, DETAIL_BOND_FAILED} from '../actions/actionTypes';

const initialState = {
    data: [],
    message: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case DETAIL_BOND_REQUEST:
            return{
                ...state,
                message: '',
            }
        case DETAIL_BOND_SUCCESS:
            return{
                ...state,
                data: action.data,
            }
        case DETAIL_BOND_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;