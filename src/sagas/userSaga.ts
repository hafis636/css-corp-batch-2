import { AxiosResponse } from 'axios';
import {
  ADDRESS_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
} from 'constants/actionTypes';
import {
  AddressRequestActionType,
  LoginRequestActionType,
  RegisterRequestActionType,
} from 'reducers/actionTypes';
import {
  LoginFailAction,
  logoutFailAction,
  registerFailAction,
} from 'reducers/errorReducer';
import {
  addressSuccessAction,
  loginSuccessAction,
  logoutSuccessAction,
  registerSuccessAction,
} from 'reducers/userReducer';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { AuthType } from 'types/authTypes';
import { User } from 'types/UserType';
import axiosInstance from 'utils/axios';

function* login({ values, actions }: LoginRequestActionType) {
  try {
    const { remember_me, serverError, ...rest } = values;
    const res: AxiosResponse = yield call(
      axiosInstance.get,
      'users',
      { params: rest },
    );
    actions.resetForm();
    const userData = res.data.find((x: User) => x);
    if (userData !== undefined) { sessionStorage.setItem('@app/user', JSON.stringify(userData)) };
    yield put(loginSuccessAction(res.data.find((x: User) => x)));
    if (userData === undefined) {
      let message = 'Invalid username / Password';
      actions.setErrors({ serverError: message });
      yield put(LoginFailAction(message));
    }
  } catch (error) {
    let message = 'Something went wrong. Please try after sometime.';
    if (error instanceof Error) {
      message = error.message;
    }
    actions.setErrors({ serverError: message });
    yield put(LoginFailAction(message));
  }
}

function* register({ values, actions }: RegisterRequestActionType) {
  try {
    const { serverError, confirmPassword, ...rest } = values;
    const res: AxiosResponse = yield call(
      axiosInstance.post,
      'users',
      rest,
    );
    actions.resetForm();
    const userData = res.data;
    if (userData !== undefined) { sessionStorage.setItem('@app/user', JSON.stringify(userData)) };
    yield put(registerSuccessAction(userData));
  } catch (error) {
    let message = 'Something went wrong. Please try after sometime.';
    if (error instanceof Error) {
      message = error.message;
    }
    yield call(actions.setErrors, { serverError: message });
    yield put(registerFailAction(message));
  } finally {
    actions.setSubmitting(false);
  }
}

function* addressUpdate({ values, actions }: AddressRequestActionType) {
  try {
    const userData = sessionStorage.getItem('@app/user');
    if (userData) {
      const parsedData = JSON.parse(userData);
      const updatedAddress = parsedData.addresses ? [values, ...parsedData.addresses] : [values];
      const rest = { ...parsedData, "addresses": updatedAddress };
      const res: AxiosResponse = yield call(
        axiosInstance.put,
        `users/${parsedData.id}`,
        rest,
      );
      actions.resetForm();
      sessionStorage.setItem('@app/user', JSON.stringify(rest));
      yield put(addressSuccessAction(res.data));
    }
  } catch (error) {

  }
}
function* logout() {
  try {
    sessionStorage.removeItem('@app/user');
    sessionStorage.removeItem('@app/offer');
    yield put(logoutSuccessAction());
  } catch (error) {
    let message = 'Something went wrong. Please try after sometime.';
    if (error instanceof Error) {
      message = error.message;
    }
    yield put(logoutFailAction(message));
  }
}

function* registerRequest() {
  yield takeLatest(REGISTER_REQUEST, register);
}

function* loginRequest() {
  yield takeLatest(LOGIN_REQUEST, login);
}

function* logoutRequest() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* addressRequest() {
  yield takeLatest(ADDRESS_REQUEST, addressUpdate);
}

export default function* rootUser() {
  yield all([fork(loginRequest), fork(registerRequest), fork(logoutRequest), fork(addressRequest)]);
}
