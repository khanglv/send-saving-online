import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILED} from '../actions/actionTypes';


const initialState = {
    idAccount: '',
    password: '',
    accessToken: '',
    otpIndex: null,
    refreshToken: '',
    message: '',
    isFetching: false,
    isAuthenticated: false,
    isVerifyOTP: false
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
                accessToken: action.info.accessToken,
                refreshToken: action.info.refreshToken,
                otpIndex: action.info.otpIndex
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                message: action.message,
            }
        case VERIFY_OTP_REQUEST:
            return{
                ...state,
                isVerifyOTP: false,
                isAuthenticated: true,
            }
        case VERIFY_OTP_SUCCESS:
            return{
                ...state,
                isVerifyOTP: true,
                isAuthenticated: true,
                accessToken: action.info.accessToken,
                refreshToken: action.info.refreshToken,
            }
        case VERIFY_OTP_FAILED:
            return {
                ...state,
                isVerifyOTP: false,
                isAuthenticated: false,
                message: action.code,
            }        
        default: 
            return state;
    }
}

export default reducer;