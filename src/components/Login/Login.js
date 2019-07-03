import React, {Component} from 'react';
import { 
    Table,
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input,
    Collapse,
    CardBody, 
    Card,
    Alert
} from 'reactstrap';
import Footer from '../Footer/Footer';
import {connect} from 'react-redux';
import {login, loginRequest, verifyOTPRequest, verifyOTP, getUser} from '../../stores/actions/loginAction';
import {verifyBonds} from '../../stores/actions/verifyBondAction';
import {ModalAlert, ModalConfirm} from '../Modal/Modal';
import GuideLogin from './Guide';
import MarketInfo from './MarketInfo';
import {LineChartDemo} from './Chart';
import * as common from '../Common/Common';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idAccount: "",
            password: "",
            collapse: false,
            isOptionSetting: 1,
            isSaveId: false,
            isSavePass: false,
            isOpen: false,
            isOpenOTP: false,
            codeOTP: '',
            checkVerifyOTP: false,
            isTokenAccessBonds: false,
            dataSend: "^~^"
        };
    }

    onSubmit = async() => {
        // this.props.history.push('/main');
        if(!this.state.idAccount || !this.state.password){
            this.setState({isOpen: true, dataSend: "Bạn chưa nhập tài khoản hoặc mật khẩu, vui lòng kiểm tra lại."});
        }else{
            // NProgress.start();
            let configLogin = {idAccount: '', password: ''};
            if(this.state.isSaveId){
                configLogin.idAccount = this.state.idAccount;
            }
            if(this.state.isSavePass){
                configLogin.password = this.state.password;
            }
            localStorage.setItem("keyConfigLogin", JSON.stringify(configLogin));
            try {
                const res = await this.props.onLogin(this.state.idAccount, this.state.password);
                if(res.type === 'LOGIN_FAILED'){
                    this.setState({ isOpen: true, dataSend: "Tài khoản hoặc mật khẩu không đúng !!!" });
                }else{
                    if(this.props.isAuthenticated){
                        this.setState({isOpenOTP : true});
                    }
                }
            } catch (error) {
                
            }
            
        }
    }

    // static getDerivedStateFromProps(nextProps, prevProps) {
    //     if (nextProps.isVerifyOTP) {
    //         if (!nextProps.isAuthenticateOTP) {
    //             if(prevProps.checkVerifyOTP){
    //                 return { isOpenOTP: true, warningData: "Mã nhập không đúng, vui lòng nhập lại", checkVerifyOTP: false }
    //             }
    //         } else {
    //             nextProps.history.push('/main');
    //             return { isOpenOTP: false }
    //         }
    //     } else {
    //         if (!nextProps.isAuthenticated && nextProps.messageAlert) {
    //             return { isOpen: true, dataSend: "Tài khoản hoặc mật khẩu không đúng !!!" }
    //         } else {
    //             if (nextProps.isAuthenticated) {
    //                 return {isOpenOTP : true}
    //             }
    //         }
    //     }
    //     return null;
    // }
    
    componentDidMount() {
        let obj = JSON.parse(localStorage.getItem('keyConfigLogin'));
        if (obj) {
            if (obj.idAccount) {
                this.setState({ idAccount: obj.idAccount, isSaveId: true });
            }
            if (obj.password) {
                this.setState({ password: obj.password, isSavePass: true });
            }
        }
    }

    onChangeAccount = (event)=>{
        this.setState({idAccount: event.target.value});
    }

    onChangePassword = (event)=>{
        this.setState({password: event.target.value});
    }

    handleChangeID = ()=>{
        this.setState((prev)=>({isSaveId: !prev.isSaveId}));
    }

    handleChangePassword = ()=>{
        this.setState( prev => ({isSavePass: !prev.isSavePass}));
    }

    onCloseAlert = ()=>{
        this.props.onLoginRequest(this.state.idAccount);
        this.setState({isOpen: false});
    }

    showSetting = ()=>{
        this.setState(state => ({ collapse: !state.collapse }));
    }

    handleSettingTimeout = (value)=>{
        this.setState({isOptionSetting: value});
        localStorage.setItem("TimeoutDisconnect", this.state.isOptionSetting);
    }

    updateInputValue = (evt)=>{
        this.setState({
            codeOTP: evt.target.value
        });
    }

    onVerifyOTP = async()=>{
        this.setState({checkVerifyOTP: true});
        try {
            const res = await this.props.onCheckVerifyOTP(this.state.codeOTP, this.props.accessToken);
            if(res.type === 'VERIFY_OTP_FAILED'){
                this.setState({ isOpenOTP: true, warningData: "Mã nhập không đúng, vui lòng nhập lại", checkVerifyOTP: false });
            }else{
                if(res.info.userInfo){
                    await this.props.getUser({"accountNumber": res.info.userInfo.accounts[0].accountNumber, "subNumber": res.info.userInfo.accounts[0].accountSubs[0].subNumber});
                    const verifyBond = await this.props.onVerifyBonds(
                        {
                            "MSNDT": res.info.userInfo.accounts[0].accountNumber,
                            "TENNDT": this.props.infoUser.customerName,
                            "CMND_GPKD": this.props.infoUser.identifierNumber,
                            "NOICAP": this.props.infoUser.identifierIssuePlace,
                            "SO_TKCK": res.info.userInfo.accounts[0].accountNumber,
                            "MS_NGUOIGIOITHIEU": this.props.infoUser.agencyCode,
                            "NGAYCAP": common.splitStringDate(this.props.infoUser.identifierIssueDate),
                        });
                    if(verifyBond.message){
                        common.notify("error", "Không thể xác thực api VBonds");
                    }
                    else{
                        this.props.history.push('/main');
                        return { isOpenOTP: false }
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    onGotoHSX = ()=>{
        window.open('http://priceboard1.vcsc.com.vn/vcsc/hose'); 
    }

    onGotoHNX = ()=>{
        window.open('http://priceboard1.vcsc.com.vn/vcsc/hnx'); 
    }

    onGotoUPCOM = ()=>{
        window.open('http://priceboard1.vcsc.com.vn/vcsc/upcom'); 
    }

    render() {
        let dataSend = (
            <div>
                <label>Số thẻ OTP: {this.props.codeOTP}</label><br></br>
                <input style={{width: '100%', padding: 5, borderRadius: 5, border: '1px solid #8e94b9'}} type="password" onChange={this.updateInputValue}></input>
            </div>
        );
        return (
            <div className="container">
                <ModalConfirm title="OTP" dataSend={dataSend} warning={this.state.warningData} open={this.state.isOpenOTP} onActionOK={this.onVerifyOTP} />
                <ModalAlert open={this.state.isOpen} onClose={this.onCloseAlert} dataSend={this.state.dataSend}/>
                <div>
                    <div className="col-md-8 left">
                        <img style={{with: '10vw', paddingTop: 20, paddingBottom: 20}} src="/images/header/logo.png" alt='logo'/>
                    </div>
                    <div className="col-md-4 right">
                        <div className="right" style={{padding: 10}}>
                            <img className='pointer' style={{width: '1vw', marginRight: '5px'}} src="/images/header/vi.png" alt='vn'/>
                            <img className='pointer' style={{width: '1vw', marginRight: '5px'}} src="/images/header/en.png" alt='en'/>
                            <img className='pointer' style={{width: '1vw', marginRight: '5px'}} src="/images/header/fr.png" alt='fr'/>
                        </div>
                    </div>
                </div>
                <div>
                    <Table bordered style={{marginBottom: 0}}>
                        <tbody>
                            <tr>
                                <th style={{width: '20%'}}>
                                <div style={styles.titleTrading}>
                                    <span style={{color: '#0579f5', fontFamily: 'Times New Roman'}}>V-</span>
                                    &nbsp;<span style={styles.fontTimeNew}>BONDS</span> 
                                </div>
                                </th>
                                <th style={{ width: '80%' }}>
                                    <Form inline style={{ width: '80%', float: 'left' }}>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Input type="email" value={this.state.idAccount} onChange={this.onChangeAccount} placeholder="ID đăng nhập" />
                                        </FormGroup>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Input type="password" value={this.state.password} onChange={this.onChangePassword} placeholder="Mật khẩu" />
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check style={{ fontWeight: 'normal' }}>
                                                <Input type="checkbox" checked={this.state.isSaveId} onChange={this.handleChangeID} /> Lưu ID
                                                </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check style={{ fontWeight: 'normal' }}>
                                                <Input type="checkbox" checked={this.state.isSavePass} onChange={this.handleChangePassword}/> Lưu mật khẩu
                                                </Label>
                                        </FormGroup>
                                    </Form>
                                    <div className="right">
                                        <Button outline color="info" onClick={this.onSubmit}>Đăng nhập</Button>
                                    </div>
                                </th>
                            </tr>
                        </tbody>
                    </Table>
                    <div>
                        <img style={{width: '100%', height: '3rem'}} src="/images/header/stockboard-bg.png" alt="stock" />
                        <div style={{position: 'relative'}}>
                            <div className="pointer hasHover" style={Object.assign({}, styles.boxStock, styles.boxStockHSX)} onClick={this.onGotoHSX}>HSX</div>
                            <div className="pointer hasHover" style={Object.assign({}, styles.boxStock, styles.boxStockHNX)} onClick={this.onGotoHNX}>HNX</div>
                            <div className="pointer hasHover" style={Object.assign({}, styles.boxStock, styles.boxStockUPCOM)} onClick={this.onGotoUPCOM}>UPCOM</div>
                            <div style={styles.settingTimeout}>
                                <Button className="fa fa-cogs" outline color="info" onClick={this.showSetting}></Button>
                                <Collapse isOpen={this.state.collapse}>
                                <Card>
                                    <CardBody>
                                        <Alert color="primary">Tự động ngắt kết nối</Alert>
                                        <FormGroup check inline>
                                            <Label check style={{ fontWeight: 'normal' }}>
                                                <Input type="checkbox" checked={this.state.isOptionSetting===1} onChange={()=>this.handleSettingTimeout(1)}/> 30 phút
                                                </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check style={{ fontWeight: 'normal' }}>
                                                <Input type="checkbox" checked={this.state.isOptionSetting===2} onChange={()=>this.handleSettingTimeout(2)}/> 1 giờ
                                                </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check style={{ fontWeight: 'normal' }}>
                                                <Input type="checkbox" checked={this.state.isOptionSetting===3} onChange={()=>this.handleSettingTimeout(3)}/> 4 giờ
                                                </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check style={{ fontWeight: 'normal' }}>
                                                <Input type="checkbox" checked={this.state.isOptionSetting===4} onChange={()=>this.handleSettingTimeout(4)}/> 8 giờ
                                                </Label>
                                        </FormGroup>
                                    </CardBody>
                                </Card>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={styles.body_detail}>
                    <div style={styles.body_detail_head}>
                        <b>THÔNG TIN THỊ TRƯỜNG</b>
                    </div>
                    <div style={styles.body_detail_main}>
                        <div className="col-md-6 left" style={{ height: "14rem"}}>
                            <MarketInfo /> 
                        </div>
                        <div className="col-md-6 right" style={{fontSize: 12}}>
                            <LineChartDemo />
                        </div>
                    </div>
                    <div style={styles.body_detail_head}>
                        <b>THÔNG BÁO</b>
                    </div>
                    <div className="col-md-3" style={styles.modalMenuOptions}>
                        <GuideLogin/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        messageAlert: state.login.message,
        token: state.login.accessToken,
        isAuthenticated: state.login.isAuthenticated,
        codeOTP: state.login.otpIndex,
        isVerifyOTP: state.login.isVerifyOTP,
        isAuthenticateOTP: state.login.isAuthenticateOTP,
        infoUser: state.login.dataUser
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onLogin: (idAccount, password)=> dispatch(login(idAccount, password)),
        onLoginRequest: (idAccount)=> dispatch(loginRequest(idAccount)),
        onCheckVerifyOTP: (codeOTP)=> dispatch(verifyOTP(codeOTP)),
        onVerifyOTPRequest: (codeOTP)=> dispatch(verifyOTPRequest(codeOTP)),
        onVerifyBonds: (infoData)=> dispatch(verifyBonds(infoData)),
        getUser: (objData)=> dispatch(getUser(objData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login);

const styles = {
    mainHeaderDetail:{
        paddingLeft: 10,
        paddingRight: 10,
    },
    titleTrading:{
        height: 38,
        display: 'flex',
        alignItems: 'center',
    },
    borderTable: {
        border: 1,
        borderColor: '#a1b8cf',
    },
    fontTimeNew:{
        fontFamily: 'Times New Roman',
    },
    body_detail:{
        width: '100%',
        height: 600,
        border: '1px solid #dee2e6',
        position: 'relative'
    },
    body_detail_head:{
        padding: 7,
        paddingLeft: '2em',
        backgroundColor: '#fff',
        width: '100%',
        fontFamily: 'Times New Roman',
        color: '#00377a',
        fontSize: 12,
    },
    body_detail_main:{
        height: '45%',
        border: '1px solid #dee2e6',
    },
    boxStock:{
        top: -36,
        border: '1px solid #dee2e6',
        paddingLeft: 5,
        paddingRight: 5,
        color: '#dee2e6',
        borderRadius: 3,
        position: 'absolute'
    },
    boxStockHSX:{
        right: '9.5rem',
    },
    boxStockHNX:{
        right: '6rem',
    },
    boxStockUPCOM:{
        right: '1rem',
    },
    settingTimeout:{
        position: 'absolute',
        top: -37,
        left: '1rem',
        zIndex: 10000
    },
    modalMenuOptions:{
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
}