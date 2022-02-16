import {
  LOAD_PRODUCTS_FAIL,
  LOAD_PRODUCTS_REQUEST,
  LOAD_SINGLE_PRODUCT_REQUEST,
} from 'constants/actionTypes';
import { AppDispatch } from 'types/commonTypes';
import { ProductType } from 'types/productsTypes';
import axiosInstance from 'utils/axios';

export const loadProducts = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: LOAD_PRODUCTS_REQUEST,
      });
      const res = await axiosInstance.get<ProductType[]>('660/products');
      dispatch({
        type: 'LOAD_PRODUCTS_SUCCESS',
        data: res.data,
      });
    } catch (error) {
      let message = 'Something went wrong. Please try after sometime.';
      if (error instanceof Error) {
        message = error.message;
      }
      dispatch({
        type: LOAD_PRODUCTS_FAIL,
        error: message,
      });
    }
  };
};

export const loadSingleProduct = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: LOAD_SINGLE_PRODUCT_REQUEST,
      });
      const res = await axiosInstance.get<ProductType[]>('products/1');
      console.log('res' + res);
      dispatch({
        type: 'LOAD_SINGLE_PRODUCT_REQUEST',
        data: res.data,
      });
    } catch (error) {
      let message = 'Something went wrong. Please try after sometime.';
      if (error instanceof Error) {
        message = error.message;
      }
      dispatch({
        type: LOAD_PRODUCTS_FAIL,
        error: message,
      });
    }
  };
};