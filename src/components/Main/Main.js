import React, {Component} from 'react';
import HeaderDetail from '../HeaderDetail/HeaderDetail';
import TradeForm from '../TradeForm/TraceForm';

class Main extends Component{
    test = ()=>{
        this.props.history.push('/login');
    }
    render(){
        return(
            <div style={styles.paddingMain}>
                <HeaderDetail history={this.props.history}/>
                <label style={{color: 'red'}}>Trade Online</label>
                <button onClick={this.test}>Test</button>
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