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
            <div>
                <div>
                    <div className="col-md-8 left">
                        <img style={{with: '10vw',}} src='/images/header/logo.png' alt='logo'/>
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
                                <th style={{width: '20%'}}><span style={{color: '#0579f5', fontFamily: 'Times New Roman'}}>TRADING</span> <span style={styles.fontTimeNew}>ONLINE</span></th>
                                <th style={{width: '80%'}}>
                                    <span style={styles.positionEndItem}>
                                        <span>012345678</span>&nbsp;|&nbsp;&nbsp;<span onClick={this.onLogout} style={{cursor: 'pointer'}}>Thoát</span>
                                    </span>
                                </th>
                            </tr>
                        </tbody>
                    </Table>
                    <div>
                        <img style={{width: '100%', height: '6vh'}} src="/images/header/stockboard-bg.png" alt="stock" />
                    </div>
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