import React, {Component} from 'react';
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

export default class MarketInfo extends Component {

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
