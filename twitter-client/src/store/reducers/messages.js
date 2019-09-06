import {LOAD_MESSAGES, REMOVE_MESSAGE} from '../actionTypes';

const messages = (state = [], action) => {
    switch(action){
        case LOAD_MESSAGES:
            return [...action.messages];
        default:
            return state;
    }
}