import { AxiosResponse } from 'axios';
import {
  ADD_CART_ITEM_REQUEST,
  APPLY_OFFER_REQUEST,
  DELETE_CART_ITEM_REQUEST,
  LOAD_CART_REQUEST,
  UPDATE_CART_ITEM_REQUEST,
} from 'constants/actionTypes';
import {
  AddCartItemRequestActionType,
  LoadingActions,
  ModifyCartItemRequestActionType,
  RequestActionType,
} from 'reducers/actionTypes';
import {
  AddCartItemSuccessAction,
  DeleteCartItemSuccessAction,
  LoadCartSuccessAction,
  UpdateCartItemSuccessAction,
} from 'reducers/cartReducer';
import {
  AddCartItemFailAction,
  DeleteCartItemFailAction,
  LoadCartErrorAction,
  UpdateCartItemFailAction,
} from 'reducers/errorReducer';
import { ApplyOfferSuccessAction } from 'reducers/offerReducer';
import {
  takeEvery,
  call,
  put,
  all,
  fork,
  takeLatest,
} from 'redux-saga/effects';
import { CartType } from 'types/cartTypes';
import { OfferType } from 'types/productsTypes';
import axiosInstance from 'utils/axios';

function* loadCart() {
  try {
    const res: AxiosResponse<CartType[]> = yield call(
      axiosInstance.get,
      'cart',
    );
    yield put(LoadCartSuccessAction(res.data));
  } catch (error) {
    let message = 'Something went wrong. Please try after sometime.';
    if (error instanceof Error) {
      message = error.message;
    }
    yield put(LoadCartErrorAction(message));
  }
}

function* addCartItem({ processId }: AddCartItemRequestActionType) {
  try {
    const res: AxiosResponse<CartType> = yield call(
      axiosInstance.post,
      'cart',
      {
        productId: processId,
        quantity: 1,
      },
    );
    yield put(AddCartItemSuccessAction(res.data, processId || 0));
  } catch (error) {
    let message = 'Something went wrong. Please try after sometime.';
    if (error instanceof Error) {
      message = error.message;
    }
    yield put(AddCartItemFailAction(message, processId || 0));
  }
}

function* updateCartItem({
  cartItem,
  processId,
}: ModifyCartItemRequestActionType) {
  try {
    const res: AxiosResponse<CartType> = yield call(
      axiosInstance.put,
      `cart/${cartItem.id}`,
      cartItem,
    );
    yield put(UpdateCartItemSuccessAction(res.data, processId));
  } catch (error) {
    let message = 'Something went wrong. Please try after sometime.';
    if (error instanceof Error) {
      message = error.message;
    }
    yield put(UpdateCartItemFailAction(message, processId));
  }
}

function* applyOffer({ offer }: any) {
  try {
    const offersList = [
      {
        "name": "Flat 10% Off",
        "offercode": "FLAT10PERCENT",
        offerFunc: (param: number) => {
          return param - (param * 0.10);
        }
      },
      {
        "name": "Flat 10$ Off",
        "offercode": "FLAT10DOLLAR",
        offerFunc: (param: number) => {
          return param - 10;
        }
      }
    ];
    const offerDiscount = offersList.find((x: any) => x?.offercode === offer);
    yield put(ApplyOfferSuccessAction(offerDiscount));
  } catch (error) {

  }

}

function* deleteCartItem({
  cartItem,
  processId,
}: ModifyCartItemRequestActionType) {
  try {
    console.log(cartItem);
    yield call(axiosInstance.delete, `cart/${cartItem.id}`);
    yield put(DeleteCartItemSuccessAction(cartItem, processId));
  } catch (error) {
    let message = 'Something went wrong. Please try after sometime.';
    if (error instanceof Error) {
      message = error.message;
    }
    yield put(DeleteCartItemFailAction(message, processId));
  }
}

function* loadCartRequest() {
  yield takeEvery(LOAD_CART_REQUEST, loadCart);
}

function* addCartItemRequest() {
  yield takeLatest(ADD_CART_ITEM_REQUEST, addCartItem);
}

function* updateCartItemRequest() {
  yield takeLatest(UPDATE_CART_ITEM_REQUEST, updateCartItem);
}

function* applyOfferRequest() {
  yield takeLatest(APPLY_OFFER_REQUEST, applyOffer);
}

function* deleteCartItemRequest() {
  yield takeLatest(DELETE_CART_ITEM_REQUEST, deleteCartItem);
}

export default function* rootCart() {
  yield all([
    fork(loadCartRequest),
    fork(addCartItemRequest),
    fork(updateCartItemRequest),
    fork(deleteCartItemRequest),
    fork(applyOfferRequest),
  ]);
}
