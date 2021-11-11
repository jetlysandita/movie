import { applyMiddleware, createStore,combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import {createWrapper} from 'next-redux-wrapper'
import { storeMovie,sagaMovie } from './movie';

function* rootSaga() {
	yield fork(sagaMovie);
}

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store:any = createStore(
    combineReducers({storeMovie} as any),
    applyMiddleware(sagaMiddleware),
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)
  
  return store
}

const wrapper = createWrapper(makeStore)

export default wrapper