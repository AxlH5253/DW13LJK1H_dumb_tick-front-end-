import {GET_EVENT_DETAIL} from '../config/constant';

const initialState = {
    data:[],
    isLoading: false,
    isPost:false,
    error:false
};

export const getEventDetail = (state = initialState,action)=>{
    switch (action.type){
        case `${GET_EVENT_DETAIL}_PENDING`:
            return {
            ...state,
            isLoading: true,
        };
        case `${GET_EVENT_DETAIL}_FULFILLED`:
            return {
            ...state,
            data: action.payload.data,
            isLoading: false,
        };
        case `${GET_EVENT_DETAIL}_REJECTED`:
            return {
            ...state,
            error: true,
            isLoading: false
        };
        default:
            return state
    } 
};