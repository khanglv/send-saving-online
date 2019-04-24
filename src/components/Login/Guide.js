import React, {Component} from 'react';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';

export default class GuideLogin extends Component {
    render(){
        return (
            <ListGroup>
                <ListGroupItem style={styles.guideHeader}><span>Hướng dẫn</span></ListGroupItem>
                <a href = "https://onlinetrading.vcsc.com.vn/v2/view/settings/account-opening.jsp" style={Object.assign({},styles.guideOp1, styles.customGroupItem)}><span style={{ paddingLeft: '3em' }}>Mở tài khoản</span></a>
                <ListGroupItem className="pointer lstGItem" style={Object.assign({},styles.guideOp2, styles.customGroupItem)}><span style={{ paddingLeft: '3em' }}>Tải V-Pro</span></ListGroupItem>
                <a href = "http://vmobile.vcsc.com.vn/?lang=vi" style={Object.assign({},styles.guideOp3, styles.customGroupItem)}><span style={{ paddingLeft: '3em' }}>Tài liệu V-Mobile</span></a>
                <a href = "https://onlinetrading.vcsc.com.vn/download/VPRO_HDSD_FINAL.pdf" style={Object.assign({},styles.guideOp4, styles.customGroupItem)}><span style={{ paddingLeft: '3em' }}>Tài liệu V-pro</span></a>
            </ListGroup>
        );
    }
}

const styles={
    guideHeader:{
        backgroundImage: `url(${"/images/header/userguide-bg.png"})`, 
        color: '#fff', 
        backgroundSize: 'cover', 
        paddingTop: 10, 
        paddingBottom: 40
    },
    guideOp1:{
        backgroundImage: `url(${"/images/header/user_guide_icon_1.png"})`,
        backgroundRepeat : 'no-repeat',
        backgroundPosition: '1em center',
        padding: 15,
    },
    guideOp2:{
        backgroundImage: `url(${"/images/header/user_guide_icon_2.png"})`,
        backgroundRepeat : 'no-repeat',
        backgroundPosition: '1em center',
        padding: 15,
    },
    guideOp3:{
        backgroundImage: `url(${"/images/header/user_guide_icon_4.png"})`,
        backgroundRepeat : 'no-repeat',
        backgroundPosition: '1em center',
        padding: 15,
    },
    guideOp4:{
        backgroundImage: `url(${"/images/header/user_guide_icon_3.png"})`,
        backgroundRepeat : 'no-repeat',
        backgroundPosition: '1em center',
        padding: 15,
    },
    customGroupItem: {
        position: 'relative',
        display: 'block',
        marginBottom: -1,
        backgroundColor: '#fff',
        border: '1px solid rgba(0, 0, 0, 0.125)',
        color: '#000',
        textDecoration: 'none'
    }
}