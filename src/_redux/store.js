import {createStore, combineReducers,applyMiddleware} from "redux";
import {promise,logger} from './middleware';
import {home} from "../_reducers/home";
import {getEvent} from '../_reducers/getevent';
import {getUpEvent} from '../_reducers/getupevent'
import {getEventTitle} from '../_reducers/geteventbytitle';
import {getEventByCategory} from '../_reducers/getEventByCategory';
import {getEventDetail} from '../_reducers/geteventdetail';
import {modal} from '../_reducers/showModal';
import {loginUser} from '../_reducers/login';

const rootReducers = combineReducers({
    getEvent,
    home,
    getUpEvent,
    getEventTitle,
    getEventByCategory,
    getEventDetail,
    modal,
    loginUser
});

export const store = createStore(rootReducers,
applyMiddleware(promise,logger))