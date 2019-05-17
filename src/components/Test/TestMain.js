import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import HeaderDetail from '../HeaderDetail/HeaderDetail';
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import BondSale from '../BondSale/BondSale';

export default class TestMain extends Component {
    render() {
        return (
            <div>
                <HeaderDetail/>
                <Layout>
                    <SideBarMenu/>
                    <Layout>
                        <BondSale/>
                    </Layout>
                </Layout>
            </div>
        );
    }
};