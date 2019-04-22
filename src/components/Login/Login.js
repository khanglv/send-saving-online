import React, {Component} from 'react';
import { 
    Table,
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input
} from 'reactstrap';
import {connect} from 'react-redux';
import {login} from '../../stores/actions/loginAction';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idAccount: "",
            password: ""
        };
    }

    onSubmit = () => {
        // this.props.history.push('/main');
        this.props.onLogin(this.state.idAccount, this.state.password);
    }

    componentDidMount(){
        let obj = localStorage.getItem('myName');
        console.log("data " + JSON.stringify(obj));
    }

    onChangeAccount = (event)=>{
        this.setState({idAccount: event.target.value});
    }

    onChangePassword = (event)=>{
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div className="container">
                <div>
                    <div className="col-md-8 left">
                        <img style={{with: '10vw',}} src="/images/header/logo.png" alt='logo'/>
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
                                    <span style={{color: '#0579f5', fontFamily: 'Times New Roman'}}>TRADING</span>
                                    &nbsp;<span style={styles.fontTimeNew}>ONLINE</span>
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
                                                <Input type="checkbox" /> Lưu ID
                                                </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check style={{ fontWeight: 'normal' }}>
                                                <Input type="checkbox" /> Lưu mật khẩu
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
                        <img style={{width: '100%'}} src="/images/header/stockboard-bg.png" alt="stock" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onLogin: (idAccount, password)=> dispatch(login(idAccount, password)),
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
    }
}