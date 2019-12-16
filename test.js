import { put, takeEvery, call, all } from 'redux-saga/effects'
import axios from "axios";
const apiUrl = "//localhost:4000/";

function takePagination(number) {
  debugger
  return axios({
    method: 'get',
    url: `${apiUrl}api/ViewHeroes?page=${number}`
  })
}

export function* workerButton(number) {
  try {
    const response = yield call(takePagination, number);
    const data = response.data

    yield put({ type: 'PAGINATION_TO_PROPS', payload: data })
  } catch (error) {
    yield console.log(error)
  }
}

export function* watchPagingation() {

  yield takeEvery('PAGINATION_START', workerButton)
}
// обратите внимание, как мы экспортируем rootSaga
// единая точка входа для запуска всех Саг одновременно
export default function* rootSaga() {
  yield all([
    watchPagingation(),
  ])
}






export const paginationStart = (currentPage) => ({
  type: PAGINATION_START, payload: currentPage
});

export const paginationToProps = data => ({
  type: PAGINATION_TO_PROPS, payload: data
});