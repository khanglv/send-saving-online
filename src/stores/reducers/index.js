import { combineReducers } from 'redux';

import login from './login';
import marketIndex from './marketIndex';
import verifyBond from './verifyBond';
import roomVCSC from './roomVCSC';
import getDetailBond from './getDetailBond';
import cashBalance from './cashBalance';
import deductBankAccount from './deductBankAccount';
import buyBondsRoomVCSC from './buyBondsRoomVCSC';
import getListBondsOfInvestor from './getListBondsOfInvestor';
import feeTrade from './feeTrade';
import updateMoneyAsset from './updateMoneyAsset';
import transactionHistory from './transactionHistory';
import interestReturnTrade from './interestReturnTrade';
import interestRateNoReturn from './interestRateNoReturn';
import genListInterestNoReturn from './genListInterestNoReturn';

export default combineReducers({
    login: login,
    marketIndex: marketIndex,
    verifyBond: verifyBond,
    roomVCSC: roomVCSC,
    getDetailBond: getDetailBond,
    cashBalance: cashBalance,
    deductBankAccount: deductBankAccount,
    buyBondsRoomVCSC: buyBondsRoomVCSC,
    getListBondsOfInvestor: getListBondsOfInvestor,
    feeTrade: feeTrade,
    updateMoneyAsset: updateMoneyAsset,
    transactionHistory: transactionHistory,
    interestReturnTrade: interestReturnTrade,
    interestRateNoReturn: interestRateNoReturn,
    genListInterestNoReturn: genListInterestNoReturn
});