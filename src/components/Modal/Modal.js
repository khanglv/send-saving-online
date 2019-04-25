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
                    <ModalHeader className="text-center" style={styles.headerModel}>Thông báo</ModalHeader>
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

    render() {
        // const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
        return (
            <div>
                <Modal isOpen={this.props.open} toggle={this.toggle} centered size="sm">
                    <ModalHeader className="text-center" style={styles.headerModel}>{this.props.title}</ModalHeader>
                    <ModalBody>
                        {this.props.dataSend}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.toggle}>OK</Button>
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