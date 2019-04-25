import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED} from '../actions/actionTypes';


const initialState = {
    idAccount: '',
    password: '',
    accessToken: '',
    message: '',
    isFetching: false,
    isAuthenticated: false,
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
            return{
                ...state,
                isFetching: true,
                isAuthenticated: false,
                message: '',
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                isFetching: true,
                isAuthenticated: true,
                message: '',
                accessToken: action.info.accessToken
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                message: action.message,
            }  
        default: 
            return state;
    }
}

export default reducer;