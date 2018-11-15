import * as React from 'react'
import { Redirect, RouteProps, Route } from 'react-router-dom';
import { AuthState } from '../store/auth';
import { connect } from 'react-redux';

interface MappedProps {
    isAuthenticated: boolean;
}

const mapStateToProps = (state: { auth: AuthState }): MappedProps => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const HomeComponent = ({ isAuthenticated }: MappedProps) =>
    isAuthenticated ? <Redirect to='/dashboard' push /> : <Redirect to={'/login'} push />

const Home = connect(mapStateToProps)(HomeComponent)

export default Home
