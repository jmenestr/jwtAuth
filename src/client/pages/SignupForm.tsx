import { signup } from '../store/auth';
import BaseForm from '../components/BaseForm';
import * as React from 'react';
import { connect } from 'react-redux';


interface MappedDispatch {
  onSubmit: (email: string, password: string) => void;
}
const mapDispatchToProps = (dispatch): MappedDispatch => ({
  onSubmit: (email: string, password: string) => dispatch(signup.action({ email, password}))
})

const SignupFormComponent = ({ onSubmit }: MappedDispatch) => <BaseForm onSubmit={onSubmit} signup={true}/>

const SignupForm = connect(null, mapDispatchToProps)(SignupFormComponent)

export default SignupForm
