import {apiCall} from '../../services/api';
import {addError} from './errors';
import {LOAD_MESSAGES, REMOVE_MESSAGE} from '../actionTypes';

export const loadMessages = message => ({
    type: LOAD_MESSAGES,
    message
});

export const fetchMessages = () => {
    return dispatch => {
        return apiCall('GET', '/api/messages')
                .then((res) => 
                    dispatch(loadMessages(res))
                )
                .catch(err => 
                    addError(err.message)
                );
    }
}