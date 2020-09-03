import { all, call, put, fork, takeLatest } from 'redux-saga/effects';
import { LOG_IN } from '../action/auth';

import { login as loginAPI } from '../api/auth';

import { loginSuccess as loginSuccessAction } from '../action/auth';
import { loginFailure as loginFailureAction } from '../action/auth';

function* login(action) {
    try {
        console.log('[Saga] login start');
        // request to server
        const response = yield call(loginAPI, action);
        const email = response.email;
        const userName = response.user_name;
        
        // same as dispatch
        yield put(loginSuccessAction(email, userName));

        action.history.push('/blog/lobby');
    } catch (reject) { // loginAPI failed
        console.error(reject);
        // same as dispatch
        yield put(loginFailureAction(reject));
    }
}

function* watchLogin() {
    //wait for action and its finish.
    yield takeLatest(LOG_IN, login);
}

export default function* auth() {
    yield all([
        fork(watchLogin),
    ]);
}