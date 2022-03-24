import { connect } from 'react-redux'
import { ApplyOfferRequestAction, deleteCartItemRequestAction, LoadCartRequestAction, LoadProductRequestAction, UpdateCartItemRequestAction } from 'reducers/loadingReducer';
import { CartType } from 'types/cartTypes';
import { AppDispatch, RootState } from 'types/commonTypes';
import Cart from './Cart';
const mapStateToProps = ({ cart, products, offerlist }: RootState) => ({
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
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    loadProducts: () => dispatch(LoadProductRequestAction()),
    loadCart: () => dispatch(LoadCartRequestAction()),
    updateCartItem: (cartItem: CartType) => dispatch(UpdateCartItemRequestAction(cartItem)),
    deleteCartItem: (cartItem: CartType) => dispatch(deleteCartItemRequestAction(cartItem)),
    applyOffer: (offer: string) => dispatch(ApplyOfferRequestAction(offer)),

})
export default connect(mapStateToProps, mapDispatchToProps)(Cart);