import React, {Component} from 'react';
import{Button} from 'reactstrap';
import {ModalConfirm} from '../Modal/Modal';
import HeaderDetail from '../HeaderDetail/HeaderDetail';
import TradeForm from '../TradeForm/TraceForm';
import { ModalSaveMoney } from '../Modal/ModalSaveMoney';
import {connect} from 'react-redux';
import {verifyOTPRequest, verifyOTP} from '../../stores/actions/loginAction';

const accessToken = localStorage.getItem('accessTokenKey');
const accessTokenVerify = localStorage.getItem('accessTokenVerifyKey');

class Main extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            isOpenSaving: false,
            codeOTP: null,
            warningData: '',
            checkVerify: false
        };
    }
    
    static getDerivedStateFromProps(nextProps, prevProps) {
        if(accessToken===''|| accessToken === null){
            window.location.href = "/login";
        }else{
            if (prevProps.checkVerify && !nextProps.isVerifyOTP && prevProps.codeOTP !== null) {
                return {isOpen: true, warningData: "Mã nhập không đúng, vui lòng nhập lại", checkVerify: false}
            }else if(accessTokenVerify || nextProps.isVerifyOTP){
                return {isOpen: false}
            }
        }
        return null;
    }

    onCloseAlert = ()=>{
        this.setState({isOpen: false});
    }

    onVerifyOTP = ()=>{
        this.setState({checkVerify: true});
        this.props.onCheckVerifyOTP(this.state.codeOTP, this.props.accessToken);
    }

    updateInputValue = (evt)=>{
        this.setState({
            codeOTP: evt.target.value
        });
    }

    onCloseModalSaveMoney = ()=>{
        this.setState({isOpenSaving: false});
    }

    onTest = ()=>{
        this.setState({isOpen: true});
    }

    onSendSaveMoney = ()=>{
        this.setState({isOpenSaving: true});
    }

    onLogoutTest = ()=>{
        // this.props.history.push('/header');
        window.location.href = "/login";
    }

    render(){
        let dataSend = (
            <div>
                <label>Số thẻ OTP: {this.props.codeOTP}</label><br></br>
                <input style={{width: '100%', padding: 5, borderRadius: 5, border: '1px solid #8e94b9'}} type="password" onChange={this.updateInputValue}></input>
            </div>
        );
        return(
            <div style={styles.paddingMain}>
                <ModalSaveMoney title="LẬP YÊU CẦU GỬI TIỀN KỲ HẠN" dataSend={dataSend} open={this.state.isOpenSaving} onClose={this.onCloseModalSaveMoney} />
                <ModalConfirm title="OTP" dataSend={dataSend} warning={this.state.warningData} open={this.state.isOpen} onActionOK={this.onVerifyOTP} />
                <HeaderDetail history={this.props.history}/>
                <b style={{color: 'red'}}>DANH SÁCH NGÂN HÀNG VÀ BIỂU LÃI SUẤT</b>
                <TradeForm />
                <Button outline color="info" onClick={this.onTest}>Check OTP</Button>&nbsp;
                <Button outline color="info" onClick={this.onSendSaveMoney}>SendSaving</Button>&nbsp;
                <Button outline color="info" onClick={this.onLogoutTest}>Logout</Button>&nbsp;
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        codeOTP: state.login.otpIndex,
        token: state.login.accessToken
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onCheckVerifyOTP: (codeOTP)=> dispatch(verifyOTP(codeOTP)),
        onVerifyOTPRequest: (codeOTP)=> dispatch(verifyOTPRequest(codeOTP)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Main);

const styles = {
    paddingMain:{
        paddingLeft: 10,
        paddingRight: 10,
    }
}