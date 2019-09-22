import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    ADD_BRAND,
    GET_BRANDS,
    GET_SORTS,
    ADD_SORT,
    GET_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL
} from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';


export function getProductDetail(id){

    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(response=>{
        return response.data[0]
    });

    return {
        type: GET_PRODUCT_DETAIL,
        payload: request
    }

}


export function clearProductDetail(){
    return {
        type: CLEAR_PRODUCT_DETAIL,
        payload:''
    }
}


export function getProductsBySell(){
    //?sortBy=sold&order=desc&limit=100
    const request = axios.get(`${PRODUCT_SERVER}/articles/?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data);
        
        return {
            type: GET_PRODUCTS_BY_SELL,
            payload: request
        }
}

export function getProductsByArrival(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
        .then(response => response.data)

    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }    
}

export function getProductsToShop(skip, limit, filters=[], previousState=[]){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${PRODUCT_SERVER}/shop`,data)
                .then(response => {
                    let newState = [
                        ...previousState,
                        ...response.data.articles
                    ];
                    return {
                        size: response.data.size,
                        articles: newState
                    }
                })

    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }
}

export function addProduct(dataToSubmit){
    const request = axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit)
                        .then(response => response.data)

    return {
        type: ADD_PRODUCT,
        payload: request
    }
}

export function clearProduct(){
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}

//Kategorie

export function addBrand(dataToSubmit, existingBrands){
    const request = axios.post(`${PRODUCT_SERVER}/brand`,dataToSubmit)
    .then(response=>{
        let brands = [
            ...existingBrands,
            response.data.brand
        ];
        return {
            success: response.data.success,
            brands
        }
    });
    return {
        type: ADD_BRAND,
        payload: request
    }
}

export function getBrands(){
    const request = axios.get(`${PRODUCT_SERVER}/brands`)
        .then(response => response.data)

    return {
        type: GET_BRANDS,
        payload: request
    }     
}

export function addSort(dataToSubmit, existingsorts){
    const request = axios.post(`${PRODUCT_SERVER}/sort`,dataToSubmit)
    .then(response=>{
        let sorts = [
            ...existingsorts,
            response.data.sort
        ];
        return {
            success: response.data.success,
            sorts
        }
    });
    return {
        type: ADD_SORT,
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

