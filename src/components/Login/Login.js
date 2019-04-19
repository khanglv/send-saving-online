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
            collapsed: true
        };
    }

    onSubmit = () => {
        this.props.history.push('/home')
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
                    <div style={{width: '100%'}}>
                        <Label style={{float: 'left'}} for="exampleEmail">grant_type <i style={{color: 'red'}}>*</i></Label>
                        <UncontrolledButtonDropdown style={{width: '50%'}}>
                            <DropdownToggle caret>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>password</DropdownItem>
                                <DropdownItem>client_credentials</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                    
                    <FormGroup>
                        <Label for="exampleEmail" style={{ float: 'left' }}>client_id <i style={{color: 'red'}}>*</i></Label>
                        <Input valid />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail" style={{ float: 'left' }}>client_secret <i style={{color: 'red'}}>*</i></Label>
                        <Input />
                        {/* <FormFeedback valid>Sweet! that name is available</FormFeedback> */}
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail" style={{ float: 'left' }}>username <i style={{color: 'red'}}>*</i></Label>
                        <Input valid />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail" style={{ float: 'left' }}>password <i style={{color: 'red'}}>*</i></Label>
                        <Input />
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