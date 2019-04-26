import React, {Component} from 'react';
import { 
    Table,
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input,
} from 'reactstrap';
import Footer from '../Footer/Footer';
import {connect} from 'react-redux';
import {login, loginRequest} from '../../stores/actions/loginAction';
import {ModalAlert} from '../Modal/Modal';
import GuideLogin from './Guide';
import MarketInfo from './MarketInfo';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idAccount: "",
            password: "",
            isSaveId: false,
            isSavePass: false,
            isOpen: false,
            dataSend: "^~^"
        };
    }

    onSubmit = () => {
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
            this.props.onLogin(this.state.idAccount, this.state.password);
        }
    }

    static getDerivedStateFromProps(nextProps) {
        if (!nextProps.isFetching && !nextProps.isAuthenticated && nextProps.messageAlert) {
            return {isOpen: true, dataSend: "Tài khoản hoặc mật khẩu không đúng !!!"}
        }
        if(nextProps.isFetching && nextProps.isAuthenticated){
            nextProps.history.push('/main');
        }
        return null;
    }
    
    componentDidMount(){
        let obj = JSON.parse(localStorage.getItem('keyConfigLogin'));
        if(obj.idAccount){
            this.setState({idAccount: obj.idAccount, isSaveId: true});
        }
        if(obj.password){
            this.setState({password: obj.password, isSavePass: true});
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

    onTest = ()=>{
        this.setState({isOpen: true});
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
        return (
            <div className="container">
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
                                    <span style={{color: '#0579f5', fontFamily: 'Times New Roman'}}>SAVINGS</span>
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
                        </div>
                    </div>
                </div>
                <div style={styles.body_detail}>
                    <div style={styles.body_detail_head}>
                        <b>THÔNG TIN THỊ TRƯỜNG</b>
                    </div>
                    <div style={styles.body_detail_main}>
                        <div className="col-md-6" style={{ height: "14rem",}}>
                            <Table style={{marginBottom: 0}}>
                                <tbody>
                                    <tr style={{ color: '#00377a', fontSize: 12 }}>
                                        <th>CHỈ SỐ</th>
                                        <th>ĐÓNG CỬA</th>
                                        <th>THAY ĐỔI</th>
                                        <th>THAY ĐỔI(%)</th>
                                    </tr>
                                </tbody>    
                            </Table>
                            <div style={{ height: "13rem", overflow: "auto" }}>
                                <MarketInfo />
                            </div>    
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
        isFetching: state.login.isFetching,
        isAuthenticated: state.login.isAuthenticated,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onLogin: (idAccount, password)=> dispatch(login(idAccount, password)),
        onLoginRequest: (idAccount)=> dispatch(loginRequest(idAccount)),
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
    modalMenuOptions:{
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
}