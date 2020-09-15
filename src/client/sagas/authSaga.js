import { all, call, put, fork, takeLatest } from 'redux-saga/effects';
import { LOG_IN, CHECK_LOG_IN, LOG_OUT } from '../action/authAction';

import { login as loginAPI } from '../api/db/authApiDB';
import { checkLogin as checkLoginAPI } from '../api/session/authApiSession';
import { logout as logoutAPI } from '../api/session/authApiSession';

import { 
    loginSuccess as loginSuccessAction,
    loginFailure as loginFailureAction,
    checkLoginSuccess as checkLoginSuccessAction,
    checkLoginFailure as checkLoginFailureAction,
    logoutSuccess as logoutSuccessAction,
    logoutFailure as logoutFailureAction
} from '../action/authAction';

function* login(action) {
    try {
        action.emailRef.current.value = '';
        action.passwordRef.current.value = '';

        // request to server
        const resolve = yield call(loginAPI, action);
        const email = resolve.email;
        const userName = resolve.user_name;
        
        // same as dispatch
        yield put(loginSuccessAction(email, userName));
        
        alert('Login success!!')
        action.history.push('/blog/lobby');
    } catch (reject) { // loginAPI failed
        
        // same as dispatch
        yield put(loginFailureAction());

        action.emailRef.current.value = action.userEmail
        action.messageRef.current.innerText = reject;
    }
}
function* watchLogin() {
    //wait for action and its finish.
    yield takeLatest(LOG_IN, login);
}

function* checkLogin(action) {
    try {
        const resolve = yield call(checkLoginAPI);
        const login = resolve;
        yield put(checkLoginSuccessAction(login));
    } catch (reject) {
        yield put(checkLoginFailureAction());
    }

}
function* watchCheckLogin() {
    yield takeLatest(CHECK_LOG_IN, checkLogin);
}

function* logout(action) {
    try {
        const resolve = yield call(logoutAPI);
        const isSuccess = resolve;
        console.log('isSuccess', isSuccess);

        yield put(logoutSuccessAction());
        alert('Logout success!!');
    } catch (reject) {
        yield put(logoutFailureAction());
    }
}
function* watchLogout() {
    yield takeLatest(LOG_OUT, logout);
}

export default function* authSaga() {
    yield all([
        fork(watchLogin),
        fork(watchCheckLogin),
        fork(watchLogout)
    ]);
}