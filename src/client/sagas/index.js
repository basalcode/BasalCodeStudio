import { all, call } from 'redux-saga/effects';

import authSaga from './authSaga';

export default function* index() {
    yield all([
        call(authSaga),
    ])
}