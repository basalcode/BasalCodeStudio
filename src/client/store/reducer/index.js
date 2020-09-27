/* module */
import { combineReducers } from 'redux';

/* store */
import auth from 'store/reducer/auth';
import blog from 'store/reducer/blog';

export default combineReducers({
    auth,
    blog,
});