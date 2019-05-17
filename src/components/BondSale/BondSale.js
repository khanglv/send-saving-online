import React, {Component} from 'react';
import { 
    Container,
    Row, 
    Col, 
    FormGroup, 
    Input, 
    Label 
} from 'reactstrap';
class BondSale extends Component{  
    render(){
        return(
            <div style={{padding: 10}}>
                <b>Danh sách trái phiếu nhà đầu tư bán</b>
                <Container style={{paddingTop: '2rem'}}>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="exampleSelect" style={styles.labelOption}>Tổ chức phát hành</Label>
                                <Input type="select" name="select" id="exampleSelect" style={{background: 'none'}}>
                                    <option>Tất cả</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                        <FormGroup>
                                <Label for="exampleSelect" style={styles.labelOption}>Chương trình bán</Label>
                                <Input type="select" name="select" id="exampleSelect" style={{background: 'none'}}>
                                    <option>Tất cả</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                        <FormGroup>
                                <Label for="exampleSelect" style={styles.labelOption}>Gói thanh toán</Label>
                                <Input type="select" name="select" id="exampleSelect" style={{background: 'none'}}>
                                    <option>Tất cả</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                        <FormGroup>
                                <Label for="exampleSelect" style={styles.labelOption}>Năm đáo hạn</Label>
                                <Input type="select" name="select" id="exampleSelect" style={{background: 'none'}}>
                                    <option>Tất cả</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};

export default BondSale;

const styles = {
    labelOption: {
        position: 'absolute', 
        top: '-1rem', 
        backgroundColor: '#f0f2f5', 
        left: '2rem', 
        paddingLeft: 5, 
        paddingRight: 5
    }
}