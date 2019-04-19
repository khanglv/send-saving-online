import React, {Component} from 'react';
import HeaderDetail from '../HeaderDetail/HeaderDetail';
import TradeForm from '../TradeForm/TraceForm';

class Main extends Component{
    render(){
        return(
            <div style={styles.paddingMain}>
                <HeaderDetail/>
                <label style={{color: 'red'}}>Trade Online</label>
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