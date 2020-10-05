/* module */
import { combineReducers } from 'redux';

/* store */
import app from 'store/reducer/app';
import auth from 'store/reducer/auth';
import blog from 'store/reducer/blog';

export default combineReducers({
    app,
    auth,
    blog,
});