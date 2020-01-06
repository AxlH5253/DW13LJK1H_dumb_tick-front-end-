import {GET_CATEGORIES, 
        GET_EVENT_BY_TITLE,
        GET_EVENT_UP_COMMING,
        GET_EVENT_TODAY,
        GET_EVENT_BY_CATEGORY,
        GET_EVENT_DETAIL,
        SHOW_MODAL,
        HIDE_MODAL,
        LOGIN,
        SHOW_MODAL_REGISTER,
        HIDE_MODAL_REGISTER
    } from '../config/constant'

import axios from 'axios';

export const getCategories = () =>{
    return{
        type: GET_CATEGORIES, 
        payload: axios(
            {
                method:'GET',
                url:'http://localhost:5000/api/v1/categories'
        })
    };
};


export const getEventByTitle = title =>{
    return{
        type: GET_EVENT_BY_TITLE, 
        payload: axios(
            {
                method:'GET',
                url:`http://localhost:5000/api/v1/events?title=${title}`,
        })
    };
};

export const getEvenToday =() =>{
    return{
        type: GET_EVENT_TODAY, 
        payload: axios(
            {
                method:'GET',
                url:'http://localhost:5000/api/v1/events?start_time=2020-01-04',
        })
    };
};

export const getEvenUpComing =() =>{
    return{
        type: GET_EVENT_UP_COMMING, 
        payload: axios(
            {
                method:'GET',
                url:'http://localhost:5000/api/v1/events?start_time_gte=2020-01-04',
        })
    };
};

export const getEvenByCat = categoryId =>{
    return{
        type: GET_EVENT_BY_CATEGORY, 
        payload: axios(
            {
                method:'GET',
                url:`http://localhost:5000/api/v1/category/${categoryId}/events`,
        })
    };
};

export const getDetailEvt = evtId =>{
    return{
        type: GET_EVENT_DETAIL, 
        payload: axios(
            {
                method:'GET',
                url:`http://localhost:5000/api/v1/event/${evtId}`,
        })
    };
};


export const login =  user => {
    return{
        type: LOGIN, 
        payload: axios(
            {
                method:'POST',
                url:`http://localhost:5000/api/v1/login`,
                data: user
        })
    };
};

export const showModal = ()=>{
    return{
        type: SHOW_MODAL,
        payload: null
    }

}

export const hideModal = ()=>{
    return{
        type: HIDE_MODAL,
        payload: null
    }

}

export const showModalRegister = ()=>{
    return{
        type: SHOW_MODAL_REGISTER,
        payload: null
    }

}

export const hideModalRegister = ()=>{
    return{
        type: HIDE_MODAL_REGISTER,
        payload: null
    }

}