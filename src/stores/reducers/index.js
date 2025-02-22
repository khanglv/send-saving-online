import { combineReducers } from 'redux';

import login from './login';
import marketIndex from './marketIndex';
import verifyBond from './verifyBond';
import roomVCSC from './roomVCSC';
import getDetailBond from './getDetailBond';
import cashBalance from './cashBalance';
import deductBankAccount from './deductBankAccount';
import buyBondsRoomVCSC from './buyBondsRoomVCSC';
import getListBondsHave from './getListBondsHave';

export default combineReducers({
    login: login,
    marketIndex: marketIndex,
    verifyBond: verifyBond,
    roomVCSC: roomVCSC,
    getDetailBond: getDetailBond,
    cashBalance: cashBalance,
    deductBankAccount: deductBankAccount,
    buyBondsRoomVCSC: buyBondsRoomVCSC,
    getListBondsHave: getListBondsHave
});