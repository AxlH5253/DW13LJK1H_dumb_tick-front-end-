import {GET_CATEGORIES, 
        GET_EVENT_BY_TITLE,
        GET_EVENT_UP_COMMING,
        GET_EVENT_TODAY,
        GET_EVENT_BY_CATEGORY,
        GET_EVENT_DETAIL} from '../config/constant'

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
                url:'http://localhost:5000/api/v1/events?start_time=2019-12-28',
        })
    };
};

export const getEvenUpComing =() =>{
    return{
        type: GET_EVENT_UP_COMMING, 
        payload: axios(
            {
                method:'GET',
                url:'http://localhost:5000/api/v1/events?start_time_gte=2019-12-28',
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