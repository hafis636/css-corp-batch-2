import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'types/commonTypes';
import ContainerLayout from './ContainerLayout'
const mapStateToProps = (store: RootState) => ({
    quantity: store.cart.reduce((p, c) => p + c.quantity, 0),
    error: store.error,
    isUserExist: Object.keys(store.user).length > 0,
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
    onLogout: () => dispatch({ type: 'LOGOUT_REQUEST' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerLayout);