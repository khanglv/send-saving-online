import * as api from '../../api/api';
import {
    MARKET_INDEX_LIST_REQUEST, 
    MARKET_INDEX_LIST_SUCCESS, 
    MARKET_INDEX_LIST_FAILED
} from './actionTypes';

export const marketIndexList = (dispatch)=>{
    dispatch({
        type: MARKET_INDEX_LIST_REQUEST,
    })
    return api.getMarketIndexList().then((response)=>{
        if(response){
            return dispatch({
                    type: MARKET_INDEX_LIST_SUCCESS,
                    data: response
                })
        }else{
            return dispatch({
                type: MARKET_INDEX_LIST_FAILED,
            })
        }
    }).catch((err)=>{
        console.log(JSON.stringify(err));
    });
}

