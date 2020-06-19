import { all, fork } from 'redux-saga/effects';
import { columns } from "./columns";

export default function* rootSaga() {
  yield all([
    fork(columns)
  ])
};

