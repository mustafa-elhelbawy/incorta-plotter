import { call, put, takeLatest } from "redux-saga/effects";
import columnsAPI from "../../network/apis/columns";
import { GET_COLUMNS_REQUEST } from "../types/columns";
import {
  getColumnsResponse,
  getColumnsError
} from "../actions/columns";

export function* getColumnsSaga() {
  try {
    const response = yield call(columnsAPI.getColumns);
    yield put(getColumnsResponse(response.data));
  } catch (err) {
    yield put(getColumnsError(err.data));
  }
}

export function* columns() {
  yield takeLatest(GET_COLUMNS_REQUEST, getColumnsSaga);
}
