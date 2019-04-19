import React, {Component} from 'react';
import {
    Table
} from 'reactstrap';

class HeaderDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            firstName: "Khang",
            lastName: "Le"
        }
    }

    componentDidMount(){
        let tmp = [this.state.firstName, this.state.lastName];
        localStorage.setItem('myName', tmp);
    }

    onLogout = ()=>{
        this.props.history.push('/login');
    }

    render(){
        return(
            <div className="color-main">
                <div>
                    <img style={{with: '10vw',}} src={require('./logo.png')} alt='logo'/>
                </div>
                <div>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th style={{width: '30%'}}><span style={{color: '#0579f5', fontFamily: 'Times New Roman'}}>TRADING</span> <span style={styles.fontTimeNew}>ONLINE</span></th>
                                <th style={{width: '70%'}}>
                                    <span style={styles.positionEndItem}>
                                        <span>012345678</span>&nbsp;|&nbsp;&nbsp;<span onClick={this.onLogout} style={{cursor: 'pointer'}}>Thoát</span>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                    </Table>
                </div>
            </div>
        );
    }
};

export default HeaderDetail;

const styles = {
    mainHeaderDetail:{
        paddingLeft: 10,
        paddingRight: 10,
    },
    positionEndItem: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    borderTable: {
        border: 1,
        borderColor: '#a1b8cf',
    },
    fontTimeNew:{
        fontFamily: 'Times New Roman',
    }
}