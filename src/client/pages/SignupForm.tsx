import { signup, updateLoginField, AuthState } from '../store/auth';
import BaseForm from '../components/BaseForm';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';


export interface MappedProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const mapStateToProps = (state: { auth: AuthState}): MappedProps => ({
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
  email: state.auth.email,
  password: state.auth.email,
})
export interface MappedDispatch {
  onSubmit: (email: string, password: string, firstName?: string, lastName?: string) => void;
  onFirstNameChange: React.EventHandler<React.ChangeEvent>
  onLastNameChange: React.EventHandler<React.ChangeEvent>
  onEmailChange: React.EventHandler<React.ChangeEvent>
  onPasswordChange: React.EventHandler<React.ChangeEvent>
}

const mapDispatchToProps = (dispatch): MappedDispatch => ({
  onSubmit: (email: string, password: string, firstName: string, lastName: string) => dispatch(signup.action({ email, password, firstName, lastName })),
  onFirstNameChange: (event: React.ChangeEvent<HTMLInputElement>) => dispatch(updateLoginField({ event, key: 'firstName'})),
  onLastNameChange: (event: React.ChangeEvent<HTMLInputElement>) => dispatch(updateLoginField({ event, key: 'lastName'})),
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => dispatch(updateLoginField({ event, key: 'email'})),
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => dispatch(updateLoginField({ event, key: 'password'})),
})


const SignupForm = withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseForm))

export default SignupForm
