import {createStore, combineReducers,applyMiddleware} from "redux";
import {promise,logger} from './middleware';
import {home} from "../_reducers/home";
import {getEvent} from '../_reducers/getevent';
import {getUpEvent} from '../_reducers/getupevent'
import {getEventTitle} from '../_reducers/geteventbytitle';
import {getEventByCategory} from '../_reducers/getEventByCategory';
import {getEventDetail} from '../_reducers/geteventdetail';

const rootReducers = combineReducers({
    getEvent,
    home,
    getUpEvent,
    getEventTitle,
    getEventByCategory,
    getEventDetail
});

export const store = createStore(rootReducers,
applyMiddleware(promise,logger))