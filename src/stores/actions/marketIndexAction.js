import * as api from '../../api/api';
import {
    MARKET_INDEX_LIST_REQUEST, 
    MARKET_INDEX_LIST_SUCCESS, 
    MARKET_INDEX_LIST_FAILED
} from './actionTypes';

export const marketIndexList = fetchData => (dispatch)=>{
    dispatch({
        type: MARKET_INDEX_LIST_REQUEST,
    })
     setTimeout(() => {
        try{
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
                return dispatch({
                    type: MARKET_INDEX_LIST_FAILED,
                })
            });
        }catch(er){

        }
    }, 1500);
}

