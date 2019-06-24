import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILED} from '../actions/actionTypes';


const initialState = {
    idAccount: '',
    password: '',
    accessToken: '',
    otpIndex: null,
    refreshToken: '',
    message: '',
    isAuthenticated: false,
    isAuthenticateOTP: false,
    isVerifyOTP: false,
    data: []
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
            return{
                ...state,
                message: '',
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
                isVerifyOTP: false,
                message: '',
                accessToken: action.info.accessToken,
                refreshToken: action.info.refreshToken,
                otpIndex: action.info.otpIndex
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isAuthenticated: false,
                message: action.message,
            }
        case VERIFY_OTP_REQUEST:
            return{
                ...state,
                isVerifyOTP: true,
            }
        case VERIFY_OTP_SUCCESS:
            return{
                ...state,
                isVerifyOTP: true,
                isAuthenticateOTP: true,
                accessToken: action.info.accessToken,
                refreshToken: action.info.refreshToken,
                data: action.info.userInfo
            }
        case VERIFY_OTP_FAILED:
            return {
                ...state,
                isVerifyOTP: true,
                isAuthenticateOTP: false,
                message: action.code,
            }        
        default: 
            return state;
    }
}

export default reducer;