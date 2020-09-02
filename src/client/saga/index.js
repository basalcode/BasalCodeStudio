import { all, call } from 'redux-saga/effects';

import auth from './auth';

export default function* index() {
    yield all([
        call(auth),
    ])
}