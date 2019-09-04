import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_SORTS
} from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';

export function getProductsBySell(){
    //?sortBy=sold&order=desc&limit=100
    const request = axios.get(`${PRODUCT_SERVER}/articles/?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data);
        
        return {
            type: GET_PRODUCTS_BY_SELL,
            payload: request
        }
}

export function getProdutsByArrival(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
        .then(response => response.data)

    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }    
}

//Kategorie

export function getBrands(){
    const request = axios.get(`${PRODUCT_SERVER}/brands`)
        .then(response => response.data)

    return {
        type: GET_BRANDS,
        payload: request
    }     
}

export function getSorts(){
    const request = axios.get(`${PRODUCT_SERVER}/sorts`)
        .then(response => response.data)

    return {
        type: GET_SORTS,
        payload: request
    }     
}