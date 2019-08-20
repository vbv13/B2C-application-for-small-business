import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';

import { USER_SERVER } from '../components/utils/misc';

export function registerUser(dataToSubmit){

    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }

}

export function loginUser(dataToSubmit){

    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data)            //actions goes here and make request, will return sth back, and server will return loginSuccess

    return {                //and it will goes to the reducer
        type: LOGIN_USER,
        payload: request
    }
} 