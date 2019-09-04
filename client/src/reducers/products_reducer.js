import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_SORTS
} from '../actions/types';

export default function(state={}, action) {
    switch(action.type){
        case GET_PRODUCTS_BY_SELL:
            return { ...state, bySell: action.payload}
        case GET_PRODUCTS_BY_ARRIVAL:
            return { ...state, byArrival: action.payload}
        case GET_BRANDS:
            return { ...state, brand: action.payload}
        case GET_SORTS:
            return { ...state, sorts: action.payload}            
        default:
            return state;
    }
}