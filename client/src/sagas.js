import { put, takeEvery, call, all } from 'redux-saga/effects'
import axios from "axios";
const apiUrl = "//localhost:4000/";

function takePagination(number) {
  return axios({
    method: 'get',
    url: `${apiUrl}api/ViewHeroes?page=${number.payload}`
  })
}

function deleteHero(d) {
  return axios({
    method: 'delete',
    url: `${apiUrl}api/upload/${d.payload}`,
    data: {
      data: d.filename
    }
  })
}

function updateOrCreateHero(params) {
  const formData = new FormData();
  if (params.payload.heroImage !== undefined) {
    formData.append('heroImage', params.payload.heroImage)
  }
  formData.append('nickname', params.payload.nickname);
  formData.append('real_name', params.payload.real_name);
  formData.append('origin_description', params.payload.origin_description);
  formData.append('superpowers', params.payload.superpowers);
  formData.append('catch_phrase', params.payload.catch_phrase);


  return (params.payload.method === "put") ?
    axios({
      method: 'put',
      url: `${apiUrl}api/upload/${params.payload._id}`,
      data: formData

    })
    :
    axios({
      method: 'post',
      url: `${apiUrl}api/upload`,
      data: formData
    })
}

export function* workerUpdateOrCreateHero(d) {
  try {
    yield call(updateOrCreateHero, d);
    yield put({ type: 'PAGINATION_START', payload: d.payload.currentPage || 1 })
  } catch (error) {
    yield console.log(error)
  }
}

export function* workerPagination(number) {
  try {
    const response = yield call(takePagination, number);
    const data = response.data

    yield put({ type: 'PAGINATION_TO_PROPS', payload: data })
  } catch (error) {
    yield console.log(error)
  }
}

export function* workerDeleteHero(d) {

  try {
    yield call(deleteHero, d);
    yield put({ type: 'PAGINATION_START', payload: d.currentPage })
  } catch (error) {
    yield console.log(error)
  }
}


export function* watchPagingation() {

  yield takeEvery('PAGINATION_START', workerPagination)
}

export function* watchDelete() {

  yield takeEvery('DELETE_HERO', workerDeleteHero)
}

export function* watchUpdateOrCreateHero() {

  yield takeEvery('UPDATE_OR_CREATE_HERO', workerUpdateOrCreateHero)
}

export default function* rootSaga() {
  yield all([
    watchPagingation(),
    watchDelete(),
    watchUpdateOrCreateHero()
  ])
}