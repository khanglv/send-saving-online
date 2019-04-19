import {ADD_TEST_DEMO} from '../actions/actionTypes';


const initialState = {
    places: [],
    selectedPlace: null
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case ADD_TEST_DEMO:
            return{
                ...state,
            }    
        default: 
            return state;
    }
}

export default reducer;