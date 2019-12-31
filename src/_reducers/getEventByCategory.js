import {GET_EVENT_BY_CATEGORY} from '../config/constant';

const initialState = {
    data:[],
    isLoading: false,
    isPost:false,
    error:false
};

export const getEventByCategory = (state = initialState,action)=>{
    switch (action.type){
        case `${GET_EVENT_BY_CATEGORY}_PENDING`:
            return {
            ...state,
            isLoading: true,
        };
        case `${GET_EVENT_BY_CATEGORY}_FULFILLED`:
            return {
            ...state,
            data: action.payload.data,
            isLoading: false,
        };
        case `${GET_EVENT_BY_CATEGORY}_REJECTED`:
            return {
            ...state,
            error: true,
            isLoading: false
        };
        default:
            return state
    } 
};