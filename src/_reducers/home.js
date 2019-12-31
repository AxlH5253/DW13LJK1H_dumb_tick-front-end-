import {GET_CATEGORIES, GET_EVENT_BY_TITLE,GET_EVENT_UP_COMMING,GET_EVENT_TODAY} from '../config/constant';

const initialState = {
    data:[],
    isLoading: false,
    isPost:false,
    error:false
};

export const home = (state = initialState,action)=>{
    switch (action.type){
        case `${GET_CATEGORIES}_PENDING`:
            return{
                ...state,
                isLoading:true,
            }
        case `${GET_CATEGORIES}_FULFILLED`:
            return{
                ...state,
                data:action.payload.data,
                isLoading:false
            }
        case `${GET_CATEGORIES}_REJECTED`:
            return{
            ...state,
            error:true,
            isLoading:false
            }
            
        default:
            return state
    } 
};