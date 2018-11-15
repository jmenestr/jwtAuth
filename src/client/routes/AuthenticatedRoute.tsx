import * as React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import {connect} from 'react-redux'
import { AuthState } from '../store/auth';

interface OwnProps extends RouteProps {}
interface MappedProps {
    isAuthenticated: boolean;
}
type Props = OwnProps & MappedProps

const mapStateToProps = (state: { auth: AuthState }): MappedProps => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const AuthenticatedRouteComponent = ({ isAuthenticated, ...routeProps}: Props) =>
    isAuthenticated ? <Route {...routeProps} /> : <Redirect to={'/login'} push />

const AuthenticatedRoute = connect(mapStateToProps)(AuthenticatedRouteComponent)

export default AuthenticatedRoute
