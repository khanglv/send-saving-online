import React, {Component} from 'react';
import{Button} from 'reactstrap';
import {ModalPopup} from '../Modal/Modal';
import HeaderDetail from '../HeaderDetail/HeaderDetail';
import TradeForm from '../TradeForm/TraceForm';
import { ModalSaveMoney } from '../Modal/ModalSaveMoney';

class Main extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            isOpenSaving: false
        };
    }

    test = ()=>{
        this.props.history.push('/login');
    }
    
    onCloseAlert = ()=>{
        this.setState({isOpen: false});
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

    render(){
        let dataSend = (
            <div>
                <label>Số thẻ OTP: 30</label><br></br>
                <input style={{width: '100%', padding: 5, borderRadius: 5, border: '1px solid #8e94b9'}} type="password"></input>
            </div>
        );
        return(
            <div style={styles.paddingMain}>
                <ModalSaveMoney title="LẬP YÊU CẦU GỬI TIỀN KỲ HẠN" dataSend={dataSend} open={this.state.isOpenSaving} onClose={this.onCloseModalSaveMoney} />
                <ModalPopup title="OTP" dataSend={dataSend} open={this.state.isOpen} onClose={this.onCloseAlert} />
                <HeaderDetail history={this.props.history}/>
                <b style={{color: 'red'}}>DANH SÁCH NGÂN HÀNG VÀ BIỂU LÃI SUẤT</b>
                <Button outline color="info" onClick={this.onTest}>testAlert</Button>
                <TradeForm />
                <Button outline color="info" onClick={this.onSendSaveMoney}>SendSaving</Button>
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