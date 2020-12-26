/* module */
import { all, call, put, fork, takeLatest } from 'redux-saga/effects';

/* api */
import authAPI from 'api/auth/auth';

/* store */
import { action as authAction} from 'store/action/auth/auth';
import {
    GET,
    DELETE
} from 'store/action/auth/auth';

/* getAuth */
function* watchGetAuth() {
    yield takeLatest(GET, getAuth);
}

function* getAuth(action) {
    try {
        const response = yield call(authAPI.get);
        
        const isLoggedIn = response.payload.isLoggedIn;
        const email = response.payload.email;
        const userName = response.payload.userName;

        yield put(authAction.put(isLoggedIn, email, userName));
    } catch (error) {
        console.log(error);
    }
}

/* deleteAuth */
function* watchDeleteAuth() {
    yield takeLatest(DELETE, deleteAuth);
}

function* deleteAuth(action) {
    try {
        yield call(authAPI.delete);
    } catch (error) {
        console.log(error);
    }
}

export default function* authSaga() {
    yield all([
        fork(watchGetAuth),
        fork(watchDeleteAuth),
    ]);
}