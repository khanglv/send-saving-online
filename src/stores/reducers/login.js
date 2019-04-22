import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED} from '../actions/actionTypes';


const initialState = {
    idAccount: '',
    password: '',
    accessToken: '',
    message: '',
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
            return{
                ...state,
                idAccount: action.idAccount,
                password: action.password
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                idAccount: action.info.idAccount,
                password: action.info.password,
                message: '',
            }
        case LOGIN_FAILED:
            return {
                ...state,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;