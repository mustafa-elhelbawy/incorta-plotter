import { call, put, takeLatest } from "redux-saga/effects";
import dataAPI from "../../network/apis/data";
import { GET_DATA_REQUEST } from "../types/data";
import {
  getDataResponse,
  getDataError
} from "../actions/data";

export function* getChartDataSaga(data) {
  try {
    const response = yield call(dataAPI.getChartData, data.payload);
    yield put(getDataResponse(response.data));
  } catch (err) {
    yield put(getDataError(err.response.data));
  }
}

export function* data() {
  yield takeLatest(GET_DATA_REQUEST, getChartDataSaga);
}
