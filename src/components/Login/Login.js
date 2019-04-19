import React, {Component} from 'react';
import { 
    Form, 
    FormGroup, 
    Label, 
    Input,
    UncontrolledButtonDropdown, 
    DropdownToggle, 
    DropdownItem, 
    DropdownMenu,
    Button
} from 'reactstrap';
import {BrowserRouter} from 'react-router-dom';
import BackgroundImg from './background.jpg';

class Login extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            idAccount: "",
            password: ""
        };
    }

    onSubmit = () => {
        this.props.history.push('/main');
        console.log("id " + this.state.idAccount + " - password " + this.state.password);
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

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    render() {
        return (
            <div style={styles.boxLogin} >
                <div style={styles.backgroundStyle}></div>
                <Form className="col-md-3" style={styles.formLogin}>
                    <div className="text-center" style={{fontSize: 24, color: '#fff'}}>Login</div>
                    <FormGroup>
                        <Label for="exampleEmail" style={{ float: 'left' }}>username <i style={{color: 'red'}}>*</i></Label>
                        <Input valid placeholder="Type ID or Email" value={this.state.idAccount} onChange={this.onChangeAccount}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail" style={{ float: 'left' }}>password <i style={{color: 'red'}}>*</i></Label>
                        <Input type="password" placeholder="Type password" value={this.state.password} onChange={this.onChangePassword}/>
                    </FormGroup>
                    <FormGroup check style={{ float: 'left' }}>
                        <Label check>
                            <Input type="checkbox" />
                            Remember
                            </Label>
                    </FormGroup><br></br>
                    <Button onClick={this.onSubmit} outline color="success" style={{float: 'right'}}>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Login;

const styles = {
    backgroundStyle:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundImage: `url(${ BackgroundImg })`,
        backgroundSize: 'cover',
        overflow: 'hidden',
        opacity: 0.7,
        width: '100%',
        height: '100%'
    },
    boxLogin:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    formLogin: {
        color: '#fff',
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'rgb(49, 71, 76)',
        boxShadow: '0 5px 7px rgba(0, 0, 0, 0.23)',
    }
}