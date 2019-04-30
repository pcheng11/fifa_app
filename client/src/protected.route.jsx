import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";


/**
 * 
 * @param {*} param0 
 * Protected route for user auth
 */
const ProtectedRoute = ({component: Component, auth, ...rest}) => {
    return (
        <Route 
            {...rest} 
            render={ props => {
                if (auth.isAuthenticated) {
                    return <Component {...props} />
                } else {
                    return <Redirect to='/login' />
                }
            }
        }
        />
    )
}

// const mapStateToProps = state => ({
//     auth: state.auth,
//     errors: state.errors
// });
// // loginUser is a dispatch action
// export default connect(
//     mapStateToProps
// )(ProtectedRoute);

export default ProtectedRoute;