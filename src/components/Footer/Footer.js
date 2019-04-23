import React, {Component} from 'react';

export default class Footer extends Component{
    render(){
        return(
            <div style={styles.bodyFooter}>
                <span>Copyright © 2008 Viet Capital Securities. All Rights Reserved. Giấy phép số 15 / GP - TTDTBộ thông tin và truyền thông - Cấp ngày 29/07/2008</span>
            </div>
        );
    }
} 

const styles = {
    bodyFooter:{
        backgroundColor: '#004b8f',
        height: '3em',
        width: '100%',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        fontSize: 12,
    }
}