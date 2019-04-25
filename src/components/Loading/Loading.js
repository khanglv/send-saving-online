import React, {Component} from 'react';
import { Spinner } from 'reactstrap';

export default class Loading extends Component{
    render(){
        return(
            <div style={{position: 'absolute', top: '50%', left: '50%'}}>
                <Spinner color="success" />
            </div>
        );
    }
}