import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Table
} from 'reactstrap';

var items = [
    { name: 'Matthew', link: 'https://bible.com/1/mat.1' },
    { name: 'Mark', link: 'https://bible.com/1/mrk.1' },
    { name: 'Luke', link: 'https://bible.com/1/luk.1' },
    { name: 'John', link: 'https://bible.com/1/jhn.1' },
    { name: 'Lucat', link: 'https://bible.com/1/jhn.1' },
    { name: 'David', link: 'https://bible.com/1/jhn.1' },
    { name: 'John1', link: 'https://bible.com/1/jhn.32' }
];

class MarketInfo extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: []
        };
    }
    static getDerivedStateFromProps(nextProps) {
        if (nextProps.data) {
            return {data: nextProps.data}
        }
        return null;
    }
    render() {
        return (
            <Table>
                <tbody style={{fontSize: 12, height: '100%'}}>
                    {items.map((item) => {
                        return (
                            <tr key={item.name} className="itemMarketInfo">
                                <td >{item.name}</td>
                                <td style={{ color: 'rgb(14, 142, 11)' }}>{item.link}</td>
                                <td style={{ color: 'rgb(14, 142, 11)' }}>Otto</td>
                                <td style={{ color: 'rgb(14, 142, 11)' }}>@mdo</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = state =>{
    return{
        data: state.marketIndex.data
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (MarketInfo);