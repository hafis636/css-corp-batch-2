import { FormikHelpers } from 'formik';
import { connect } from 'react-redux';
import { ApplyOfferRequestAction, LoadCartRequestAction, LoadProductRequestAction } from 'reducers/loadingReducer';
import { AppDispatch, RootState } from 'types/commonTypes';
import Order from './Order';
import { AddressInitValuesType, LoginInitValuesType, RegisterInitValuesType } from './orderUtils';
const mapStateToProps = ({ cart, products, offerlist, user }: RootState) => ({
    user: user,
    cart,
    products: products.filter((product) => {
        return cart.find((cartItem) => {
            if (product.id === cartItem.productId) {
                product.qty = cartItem.quantity;
                return product;
            }
        })
    }),
    offers: offerlist
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    onLogin: (
        values: LoginInitValuesType,
        actions: FormikHelpers<LoginInitValuesType>,
    ) => dispatch({ type: 'LOGIN_REQUEST', values, actions }),
    onRegister: (
        values: RegisterInitValuesType,
        actions: FormikHelpers<RegisterInitValuesType>,
    ) => dispatch({ type: 'REGISTER_REQUEST', values, actions }),
    addAddress: (
        values: AddressInitValuesType,
        actions: FormikHelpers<AddressInitValuesType>,
    ) => dispatch({ type: 'ADDRESS_REQUEST', values, actions }),
    loadProducts: () => dispatch(LoadProductRequestAction()),
    loadCart: () => dispatch(LoadCartRequestAction()),
    applyOffer: (offer: string) => dispatch(ApplyOfferRequestAction(offer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);