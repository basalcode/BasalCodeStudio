/* module */
import { all, call, put, fork, takeLatest } from 'redux-saga/effects';

/* api */
import { 
    login as loginAPI,
    checkLogin as checkLoginAPI,
    logout as logoutAPI
} from 'api/session/auth';

/* store */
import { LOG_IN, CHECK_LOG_IN, LOG_OUT } from 'store/action/auth';
import { 
    loginSuccess,
    loginFailure,
    checkLoginSuccess,
    checkLoginFailure,
    logoutSuccess,
    logoutFailure 
} from 'store/action/auth';

function* login(action) {
    try {
        action.emailRef.current.value = '';
        action.passwordRef.current.value = '';

        // request to server
        const resolve = yield call(loginAPI, action);
        const email = resolve.email;
        const userName = resolve.user_name;
        
        // same as dispatch
        yield put(loginSuccess(email, userName));
        
        alert('Login success!!')
        action.history.push('/blog/lobby');
    } catch (reject) { // loginAPI failed
        
        // same as dispatch
        yield put(loginFailure());

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
        yield put(checkLoginSuccess(login));
    } catch (reject) {
        yield put(checkLoginFailure());
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

        yield put(logoutSuccess());
        alert('Logout success!!');
    } catch (reject) {
        yield put(logoutFailure());
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