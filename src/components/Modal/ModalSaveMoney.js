import React from 'react';
import { 
    Button,
    Modal,
    ModalBody, 
    ModalFooter, 
    ModalHeader,
    ListGroup, 
    ListGroupItem,
    Input
} from 'reactstrap';
import DatePicker from 'react-datepicker';

export class ModalSaveMoney extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            open: props.isOpen,
            focusAfterClose: true
        };
        
    }

    toggle = ()=> {
        this.props.onClose();
    }

    handleChange = (date)=>{
        this.setState({startDate: date});
    }

    render() {
        // const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
        const closeBtn = <button className="close" style={{color: '#fff', display: 'block'}} onClick={this.toggle}>&times;</button>;
        return (
            <div>
                <Modal isOpen={this.props.open} centered size="xl">
                    <ModalHeader close={closeBtn} className="text-center" style={styles.headerModel} charCode="Y">{this.props.title}</ModalHeader>
                    <ModalBody style={styles.modalBody}>
                        <ListGroup className="col-md-6 left">
                            <ListGroupItem className="centerVertical">
                                <div className="col-md-6 left">
                                    Tài khoản
                                </div>
                                <div className="col-md-6 right">
                                <Input type="select" style={styles.modelInputSelect}>
                                    <option>Small Select</option>
                                    <option>Small Select2</option>
                                    <option>Small Select3</option>
                                </Input>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="centerVertical">
                                <div className="col-md-6 left">
                                    Số tiền gửi(VND)<i style={{color: 'red'}}>*</i>
                                </div>
                                <div className="col-md-6 right">
                                    <input style={styles.inputModal}></input>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="centerVertical">
                                <div className="col-md-6 left">
                                    Ngân hàng chỉ định<i style={{color: 'red'}}>*</i>
                                </div>
                                <div className="col-md-6 right">
                                    <input style={styles.inputModal}></input>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="centerVertical">
                                <div className="col-md-6 left">
                                    Kỳ hạn gửi<i style={{color: 'red'}}>*</i>
                                </div>
                                <div className="col-md-6 right">
                                    <input style={styles.inputModal}></input>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="centerVertical">
                                <div className="col-md-6 left">
                                    Hình thức tái tục<i style={{color: 'red'}}>*</i>
                                </div>
                                <div className="col-md-6 right">
                                    <input style={styles.inputModal}></input>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="centerVertical">
                                <div className="col-md-6 left">
                                    Hình thức lĩnh lãi<i style={{color: 'red'}}>*</i>
                                </div>
                                <div className="col-md-6 right">
                                    <input style={styles.inputModal}></input>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                        <ListGroup className="col-md-6 right" style={{paddingRight: 0}}>
                            <ListGroupItem className="centerVertical">
                                <div className="col-md-6 left">
                                    Tên Khách hàng
                                </div>
                                <div className="col-md-6 right">
                                    <input style={styles.inputModal}></input>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="centerVertical">
                                <div className="col-md-6 left">
                                    Số dư tiền(VND)
                                </div>
                                <div className="col-md-6 right">
                                    <input style={styles.inputModal}></input>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="centerVertical">
                                <div className="col-md-6 left">
                                    Ngân giá trị
                                </div>
                                <div className="col-md-6 right">
                                    <input style={styles.inputModal}></input>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="centerVertical">
                                <div className="col-md-6 left">
                                    Định kỳ lĩnh lãi
                                </div>
                                <div className="col-md-6 right">
                                    <input style={styles.inputModal}></input>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="centerVertical">
                                <div className="col-md-6 left">
                                    Lãi suất(%/năm)
                                </div>
                                <div className="col-md-6 right">
                                    <input style={styles.inputModal}></input>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem className="centerVertical">
                                <div className="col-md-6 left">
                                    Ngày đáo hạn
                                </div>
                                <div className="col-md-6 right">
                                    <DatePicker
                                        className="customInputDatePicker"
                                        style={{width: '100%'}}
                                        dateFormat="dd/MM/yyyy"
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                        <label style={{color: 'red', fontStyle: 'italic', marginTop: 10}}>Lưu ý: Số tiền gửi (VND) được ghi nhận chẵn tới hàng nghìn đồng</label>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Hủy bỏ</Button>{' '}
                        <Button color="primary" onClick={this.toggle}>Tiếp tục</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const styles={
    headerModel: {
        color: '#fff', 
        backgroundColor: 'rgba(18, 32, 71, 0.85)'
    },
    modelInputSelect:{
        height: 'auto',
        padding: 5
    },
    modalBody:{
        backgroundColor: 'rgba(13, 59, 108, 0.08)'
    },
    inputModal:{
        width: '100%',
        borderRadius: 5,
        border: '1px solid #ced4da',
        padding: 5,
    }
}