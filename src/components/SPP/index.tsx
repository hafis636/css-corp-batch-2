import { connect } from 'react-redux'
import { AddCartItemRequestAction } from 'reducers/loadingReducer';
import { AppDispatch } from 'types/commonTypes';
import SPP from './spp';
const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    addCartItem: (productId: number) => dispatch(AddCartItemRequestAction(productId)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SPP);