import { connect } from 'react-redux';
import { LoadCartRequestAction, LoadSingleProductRequestAction } from 'reducers/loadingReducer';
import { AppDispatch, RootState } from 'types/commonTypes';
import SingleProduct from './SingleProduct';

const mapStateToProps = ({ products, cart }: RootState) => {
    return {
        products,
        cartStatus: cart.findIndex((x) => { return x.productId === products?.id }),

    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        loadSingleProduct: (productId: number) => dispatch(LoadSingleProductRequestAction(productId)),
        loadCart: () => dispatch(LoadCartRequestAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);