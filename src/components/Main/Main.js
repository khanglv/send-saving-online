import React, {Component} from 'react';
import{Button} from 'reactstrap';
import {ModalAlert} from '../Modal/Modal';
import HeaderDetail from '../HeaderDetail/HeaderDetail';
import TradeForm from '../TradeForm/TraceForm';

class Main extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    test = ()=>{
        this.props.history.push('/login');
    }
    
    onCloseAlert = ()=>{
        this.setState({isOpen: false});
    }

    onTest = ()=>{
        this.setState({isOpen: true});
    }
    render(){
        return(
            <div style={styles.paddingMain}>
                <ModalAlert demo="Đây là nội dung 2" open={this.state.isOpen} onClose={this.onCloseAlert} />
                <HeaderDetail history={this.props.history}/>
                <h1 style={{color: 'red'}}>Trade Online</h1>
                <Button outline color="info" onClick={this.onTest}>testAlert</Button>
                <TradeForm />
            </div>
        );
    }
}

export default Main;

const styles = {
    paddingMain:{
        paddingLeft: 10,
        paddingRight: 10,
    }
}