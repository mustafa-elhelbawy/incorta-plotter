import { all, fork } from 'redux-saga/effects';
import { columns } from "./columns";
import { data } from "./data";

export default function* rootSaga() {
  yield all([
    fork(columns),
    fork(data)
  ])
};

