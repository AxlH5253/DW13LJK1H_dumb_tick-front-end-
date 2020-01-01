import {SHOW_MODAL_REGISTER,HIDE_MODAL_REGISTER} from '../config/constant';


export const modalRegister = (state = false,action)=>{
    switch (action.type){     
        case SHOW_MODAL_REGISTER:
            return true
        case HIDE_MODAL_REGISTER:
            return false
        default:
            return state
    } 
};