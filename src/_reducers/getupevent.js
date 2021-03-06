import {GET_EVENT_UP_COMMING} from '../config/constant';

const initialState = {
    data:[],
    isLoading: false,
    isPost:false,
    error:false
};

export const getUpEvent = (state = initialState,action)=>{
    switch (action.type){  
        case `${GET_EVENT_UP_COMMING}_PENDING`:
            return {
            ...state,
            isLoading: true,
        };
        case `${GET_EVENT_UP_COMMING}_FULFILLED`:
            return {
            ...state,
            data: action.payload.data,
            isLoading: false,
        };
        case `${GET_EVENT_UP_COMMING}_REJECTED`:
            return {
            ...state,
            error: true,
            isLoading: false
        };
        default:
            return state
    } 
};