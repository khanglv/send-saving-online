import React, {Component} from 'react';
class HeaderDetail extends Component{

    onGotoHSX = ()=>{
        window.open('http://priceboard1.vcsc.com.vn/vcsc/hose'); 
    }

    onGotoHNX = ()=>{
        window.open('http://priceboard1.vcsc.com.vn/vcsc/hnx'); 
    }

    onGotoUPCOM = ()=>{
        window.open('http://priceboard1.vcsc.com.vn/vcsc/upcom'); 
    }

    onMainClick = ()=>{
        this.props.history.push('/main');
    }
    
    render(){
        return(
            <div>
                <div style={{height: '8vh'}}>
                    <div className="col-md-8 left">
                        <img className="pointer" onClick={this.onMainClick} style={{with: '10vw', paddingTop: '1vh'}} src='/images/header/logo.png' alt='logo'/>
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
                    <div style={styles.titleBody}>
                        <div style={{ width: '20%', paddingLeft: '2vw'}} className="left"><span style={styles.fontTimeNew}>V-BONDS</span></div>
                        <div style={{ width: '80%' }} className="right">
                            <div style={styles.positionEndItem}>
                                <div className="pointer hasHover" style={Object.assign({}, styles.boxStock, styles.boxStockHSX)} onClick={this.onGotoHSX}>HSX</div>
                                <div className="pointer hasHover" style={Object.assign({}, styles.boxStock, styles.boxStockHNX)} onClick={this.onGotoHNX}>HNX</div>
                                <div className="pointer hasHover" style={Object.assign({}, styles.boxStock, styles.boxStockUPCOM)} onClick={this.onGotoUPCOM}>UPCOM</div>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        <img style={{width: '100%', height: '5vh'}} src="/images/header/stockboard-bg.png" alt="stock" />
                        <div style={{position: 'relative'}}>
                            <div className="pointer hasHover" style={Object.assign({}, styles.boxStock, styles.boxStockHSX)} onClick={this.onGotoHSX}>HSX</div>
                            <div className="pointer hasHover" style={Object.assign({}, styles.boxStock, styles.boxStockHNX)} onClick={this.onGotoHNX}>HNX</div>
                            <div className="pointer hasHover" style={Object.assign({}, styles.boxStock, styles.boxStockUPCOM)} onClick={this.onGotoUPCOM}>UPCOM</div>
                        </div>
                    </div> */}
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
        fontSize: 20
    },
    titleBody:{
        marginBottom: 0, 
        height: '7vh', 
        display: 'flex', 
        alignItems: 'center', 
        border: '1px solid #d5e0eb', 
        background: '#004b8f',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: '#fff'
    },
    boxStock:{
        border: '1px solid #dee2e6',
        paddingLeft: 5,
        paddingRight: 5,
        color: '#dee2e6',
        borderRadius: 3,
    },
    boxStockHSX:{
        marginRight: '1rem',
    },
    boxStockHNX:{
        marginRight: '1rem',
    },
    boxStockUPCOM:{
        marginRight: '1rem',
    },
}