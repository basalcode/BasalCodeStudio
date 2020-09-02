import { all, call, put, fork, takeLatest } from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../action/auth';

import { login } from '../action/auth';

function loginAPI() {

}

function* login() {
    try {
        // request to server
        yield call(loginAPI);
        // same as dispatch
        yield put({
            type: LOG_IN_SUCCESS
        })
    } catch (error) { // loginAPI failed
        console.log(error)
        // same as dispatch
        yield put({
            type: LOG_IN_FAILURE
        })
    }
}

function* watchLogin() {
    //wait for action and its finish.
    yield takeLatest(LOG_IN, login)
}

export default function* authSaga() {
    yield all([
        fork(watchLogin),
    ]);
}