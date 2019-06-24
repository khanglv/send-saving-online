import React from 'react';
import { 
    Button,
    Modal,
    ModalBody, 
    ModalFooter, 
    ModalHeader,
} from 'reactstrap';

export class ModalAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.isOpen,
            focusAfterClose: true
        };
        
    }

    toggle = ()=> {
        this.props.onClose();
    }

    render() {
        return (
            <div>
                <Modal returnFocusAfterClose={this.state.focusAfterClose} toggle={this.toggle} isOpen={this.props.open} >
                    <ModalHeader className="text-center" style={styles.headerModel}><span style={{color: '#fff'}}>Thông báo</span></ModalHeader>
                    <ModalBody>
                        {this.props.dataSend}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Đóng</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export class ModalPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.onClose();
    }

    onActionOK = ()=>{
        this.props.onActionOK();
    }

    render() {
        // const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
        return (
            <div>
                <Modal isOpen={this.props.open} toggle={this.toggle} centered size="sm">
                    <ModalHeader className="text-center" style={styles.headerModel}><span style={{color: '#fff'}}>{this.props.title}</span></ModalHeader>
                    <ModalBody>
                        {this.props.dataSend}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.onActionOK}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export class ModalConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    onActionOK = ()=>{
        this.props.onActionOK();
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.open} centered size="sm">
                    <ModalHeader className="text-center" style={styles.headerModel}><span style={{color: '#fff'}}>{this.props.title}</span></ModalHeader>
                    <ModalBody>
                        {this.props.dataSend}
                        <div className="text-center">
                            <span style={{color: 'red', fontSize: 12}}>{this.props.warning}</span>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onActionOK}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const styles={
    headerModel: {
        display: 'inline',
        color: '#fff', 
        backgroundColor: 'rgba(18, 32, 71, 0.85)'
    }
}