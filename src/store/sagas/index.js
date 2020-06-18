import {takeEvery, all, takeLatest} from 'redux-saga/effects';
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth';
import * as actionTypes from '../actions/actionTypes';
import { initIngedientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './orders';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
};

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngedientsSaga);
};

export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
};

