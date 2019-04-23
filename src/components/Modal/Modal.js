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
        console.log("open " + this.state.open);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.onClose();
    }

    render() {
        return (
            <div>
                <Modal returnFocusAfterClose={this.state.focusAfterClose} isOpen={this.props.open} >
                    <ModalBody>
                        {this.props.demo}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Close</Button>
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
                <Modal isOpen={this.props.open} toggle={this.toggle} centered size="lg">
                    <ModalHeader className="text-center" style={{display: 'inline'}}>Modal title</ModalHeader>
                    <ModalBody>
                        {this.props.form}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
