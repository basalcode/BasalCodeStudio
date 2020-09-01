import { combineReducers } from 'redux';
import { LOGIN } from '../constant/auth';

export const login = (state = false, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload
        default:
            return state;
    }
}

export default combineReducers({
    login
});