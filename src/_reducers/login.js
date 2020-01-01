import {LOGIN} from '../config/constant';

const initialState = {
    data:[],
    isLoading: false,
    isPost:false,
    error:false
};

export const loginUser = (state = initialState,action)=>{
    switch (action.type){
        case `${LOGIN}_PENDING`:
            return {
            ...state,
            isLoading: true,
        };
        case `${LOGIN}_FULFILLED`:
            return {
            ...state,
            data: action.payload.data,
            isLoading: false,
        };
        case `${LOGIN}_REJECTED`:
            return {
            ...state,
            error: true,
            isLoading: false
        };
        default:
            return state
    } 
};