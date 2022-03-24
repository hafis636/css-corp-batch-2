import { connect } from 'react-redux'
import { UpdateCartItemRequestAction } from 'reducers/loadingReducer';
import { CartType } from 'types/cartTypes';
import { AppDispatch, RootState } from 'types/commonTypes';
import ProductListingItem from './ProductListingItem';
const mapStateToProps = ({ cart }: RootState) => ({
    cart
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(ProductListingItem);
