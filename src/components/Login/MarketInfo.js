import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Table
} from 'reactstrap';

import {marketIndexList} from '../../stores/actions/marketIndexAction';

class MarketInfo extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            codeActive: ''
        };
    }

    componentDidMount(){
        this.props.loadData();
    }

    static getDerivedStateFromProps(nextProps, prevProps) {
        if (nextProps.data.length > 0 && prevProps.codeActive === '') {
            return {codeActive: nextProps.data[0].code, data: nextProps.data};
        }
        return null;
    }

    onChooseOption = (code)=>{
        this.setState({codeActive: code});
    }

    render() {
        return (
            <div style={{ height: "35vh", overflow: "auto", fontSize: 12 }}>
                <Table>  
                    <tbody>
                        <tr>
                            <td style={styles.headerTable}>CHỈ SỐ</td>
                            <td style={styles.headerTable}>ĐÓNG CỬA</td>
                            <td style={styles.headerTable}>THAY ĐỔI</td>
                            <td style={styles.headerTable}>THAY ĐỔI(%)</td>
                        </tr>
                        {
                            this.state.data.length === 0 ? <tr className="centerVertical"><td>No data</td></tr>:
                            this.state.data.map((item) => {
                                return (
                                    <tr key={item.indexName} className="itemMarketInfo" onClick={()=>this.onChooseOption(item.code)} style={this.state.codeActive===item.code?styles.chooseOption: null}>
                                        <td>{item.indexName}</td>
                                        <td style={{ color: 'rgb(14, 142, 11)' }}>{item.last}</td>
                                        <td style={{ color: 'rgb(14, 142, 11)' }}>{item.change}</td>
                                        <td style={{ color: 'rgb(14, 142, 11)' }}>{item.rate}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

const styles={
    headerTable: {
        position: 'sticky', 
        top: 0,
        backgroundColor: '#e9ecef',
        color: '#00377a'
    },
    chooseOption:{
        borderLeft: '1px solid red',
        backgroundColor: '#D9EAF7'
    }
}

const mapStateToProps = state =>{
    return{
        data: state.marketIndex.data
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        loadData: ()=> dispatch(marketIndexList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (MarketInfo);