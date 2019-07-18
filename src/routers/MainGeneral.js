import React from 'react';
import HeaderDetail from '../components/HeaderDetail/HeaderDetail';
import Main from '../components/Main/Main';
import SideBarMenu from '../components/SideBarMenu/SideBarMenu';
import Directive from '../components/Directive/Directive';
import BondsAsset from '../components/MyAsset/MyBond';
import BondInvestor from '../components/BondInvestor/BondInvestor';
import TestMain from '../components/Test/TestMain';
import UserInfo from '../components/UserInfo/UserInfo';
import { Affix } from 'antd';

import { Layout} from 'antd';

const withSidebar = (View) =>
    <div>
        <Affix>
            <HeaderDetail />
        </Affix>
        <div>
            <Layout>
                <SideBarMenu />
                <Layout style={{height: '85vh', backgroundColor: '#fff'}}>
                    <View />
                </Layout>
            </Layout>
        </div>
    </div>

export const FMain = ()=> withSidebar(Main)

export const FDirective = ()=> withSidebar(Directive)

export const FBondsAsset = ()=> withSidebar(BondsAsset)

export const FBondInvestor = ()=> withSidebar(BondInvestor)

export const FUserInfo = ()=> withSidebar(UserInfo)

export const FTestMain = ()=> withSidebar(TestMain)