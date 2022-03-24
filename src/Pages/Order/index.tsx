import { FormikHelpers } from 'formik';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from 'types/commonTypes';
import Order from './Order';
import { LoginInitValuesType } from './orderUtils';
const mapStateToProps = (state: RootState) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    onLogin: (
        values: LoginInitValuesType,
        actions: FormikHelpers<LoginInitValuesType>,
    ) => dispatch({ type: 'LOGIN_REQUEST', values, actions }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);