/* module */
import { all, call } from 'redux-saga/effects';

/* store */
import auth from 'store/saga/auth';

export default function* index() {
    yield all([
        // call(auth),
    ])
}