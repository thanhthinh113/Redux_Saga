// src/store/sagas.js
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchData() {
  try {
    const response = yield call(axios.get, 'https://67055f04031fd46a830fb4fb.mockapi.io/redux'); // Thay đổi URL API của bạn ở đây
    yield put({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'FETCH_DATA_FAILURE', payload: error.message });
  }
}

function* rootSaga() {
  yield takeEvery('FETCH_DATA_REQUEST', fetchData);
}

export default rootSaga;
