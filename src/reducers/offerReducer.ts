import {
  APPLY_OFFER_REQUEST,
  APPLY_OFFER_SUCCESS,
} from 'constants/actionTypes';
import { OfferType } from 'types/productsTypes';
import { ApplyOfferSuccessType } from './actionTypes';
const offerInitialState: OfferType[] = [];

export const ApplyOfferSuccessAction = (
  data: OfferType | undefined
): ApplyOfferSuccessType => ({
  type: APPLY_OFFER_SUCCESS,
  offerlist: data,
});


export default (
  state: OfferType[] = offerInitialState,
  action: ApplyOfferSuccessType,
) => {
  switch (action.type) {

    case APPLY_OFFER_SUCCESS:
      return action.offerlist ? [action.offerlist] : [{ invalid: 1 }];
    default:
      return state;
  }
};


