import { login } from '../store/auth';
import BaseForm from '../components/BaseForm';
import * as React from 'react';
import { connect } from 'react-redux';


interface MappedDispatch {
  onSubmit: (email: string, password: string) => void;
}
const mapDispatchToProps = (dispatch): MappedDispatch => ({
  onSubmit: (email: string, password: string) => dispatch(login.action({ email, password }))
})

const LoginFormComponent = ({ onSubmit }: MappedDispatch) => <BaseForm onSubmit={onSubmit} signup={false}/>

const LoginForm = connect(null, mapDispatchToProps)(LoginFormComponent)

export default LoginForm
