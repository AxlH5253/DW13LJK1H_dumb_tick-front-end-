import { GET_EVENT_BY_TITLE} from '../config/constant';

const initialState = {
    data:[],
    isLoading: false,
    isPost:false,
    error:false
};

export const getEventTitle = (state = initialState,action)=>{
    switch (action.type){
        case `${GET_EVENT_BY_TITLE}_PENDING`:
            return {
            ...state,
            isLoading: true,
        };
        case `${GET_EVENT_BY_TITLE}_FULFILLED`:
            return {
            ...state,
            data: action.payload.data,
            isLoading: false,
        };
        case `${GET_EVENT_BY_TITLE}_REJECTED`:
            return {
            ...state,
            error: true,
            isLoading: false
        };
        default:
            return state
    } 
};