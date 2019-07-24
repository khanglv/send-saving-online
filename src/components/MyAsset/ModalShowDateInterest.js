import React, {Component} from 'react';
import { 
    Modal,
    Table
} from 'antd';
import * as common from '../Common/Common';
import * as formula from '../Common/Formula';

class ModalShowDateInterest extends Component{

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Nội dung',
                dataIndex: 'content',
                width: 100,
            },
            {
                title: 'Ngày nhận', //1
                dataIndex: 'date',
                width: 200,
                render: (date, record) =>{
                    let color = "#000000a6";
                    if(formula.dateToTime(record.dateT) < formula.dateToTime(new Date())){
                        color = "#18c52a";
                    }
                    return(
                        <div style={{color: color}}>{record.date}</div>
                    )
                }
            },
            {
                title: 'Tiền nhận (VND)', //1
                dataIndex: 'moneyReceived',
                width: 200
            },
            {
                title: 'Lãi suất (%)', //1
                dataIndex: 'interestRate',
                width: 100
            }
        ]
        const value = props.value || {};

        this.state = {
            currency: value.currency || 'Open',
        };
    }

    setModal2Visible =()=> {
        this.props.isCloseModal();
    }

    handleCurrencyChange = currency => {
        this.setState({ currency });
    };

    render(){
        const dataTmp = this.props.lstSetCommand.map((item, i)=>{
            return {
                ...item,
                "content": "Coupon",
                "date": common.convertDDMMYYYY(item.date),
                "dateT": item.date,
                "moneyReceived": common.convertTextDecimal(item.moneyReceived),
                "key": i + 1
            }
        });
        return(
            <Modal
                footer={null}
                title="Ngày trái tức"
                centered
                visible={this.props.isOpen}
                onOk={() => this.onHandleOk()}
                onCancel={this.setModal2Visible}
                width='50%'
            >
                <div className="p-top10">
                    <Table
                        bordered
                        dataSource={dataTmp}
                        size="small"
                        columns={this.columns}
                        pagination={false}
                    />
                </div>
            </Modal>
        )
    }
}

export default ModalShowDateInterest;