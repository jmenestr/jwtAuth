import * as React from "react";
import { Link, RouteComponentProps } from 'react-router-dom'
import SocialMediaLoginButtons from './SocialMediaLoginButtons';
import UserFields from "./UserFields";
import Input from "./Input";
import Banner from "./Banner";

interface Props extends RouteComponentProps {
  signup: (email: string, password: string, firstName?: string, lastName?: string) => void;
  login: (email: string, password: string) => void;
  onFirstNameChange: React.EventHandler<React.ChangeEvent>
  onLastNameChange: React.EventHandler<React.ChangeEvent>
  onEmailChange: React.EventHandler<React.ChangeEvent>
  onPasswordChange: React.EventHandler<React.ChangeEvent>
  email: string;
  password: string;
  firstName: string;
  lastName:string
  error?: string
}


export default class BaseForm extends React.Component<Props> {

  onSubmit = (event: React.FormEvent) => {
    this.props.match.path === '/signup' ?
    this.props.signup(this.props.email, this.props.password) :
    this.props.login(this.props.email, this.props.password)
    event.preventDefault();
  }

  render() {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-grey-lighter">

        <form className="px-8 pt-6 pb-8 bg-white shadow-md rounded w-2/3" onSubmit={this.onSubmit} method='post'>
        <p className="text-3xl font-bold my-4">{ this.props.match.path === '/signup' ? 'Create an Account' : 'Welcome Back!' }</p>
          <SocialMediaLoginButtons signup={this.props.match.path === '/signup'} />
          <div className='flex items-center'>
            <span className='mr-6 text-grey-dark'>OR</span>
            <hr className='flex-1 bg-grey-light'></hr>
          </div>
          { this.props.error ? <Banner message={this.props.error} /> : null }
          {
            this.props.match.path === '/signup' ? <UserFields onFirstNameChange={this.props.onFirstNameChange} onLastNameChange={this.props.onLastNameChange} lastName={this.props.lastName} firstName={this.props.firstName} /> : null
          }
          <Input name='email' label='Email' type='email' placeholder='Enter your email' value={this.props.email} onChange={this.props.onEmailChange} />
          <Input name='password' label='Password' type='password' placeholder="******************" value={this.props.password} onChange={this.props.onPasswordChange} />
          
          <div className="flex items-center justify-between">
            <div className='w-1/4 flex flex-col'>
            <button className="bg-blue hover:bg-blue-dark text-white font-bold py-3 px-5 mb-2 rounded focus:outline-none focus:shadow-outline" type="submit">
               { this.props.match.path === '/signup' ? 'Sign Up' : 'Login' }
            </button>
              {
                this.props.match.path === '/login' ? 
                <Link to='/auth/reset' className="block align-baseline font-bold text-sm text-blue hover:text-blue-darker">
                  Forgot password?
                </Link> :
                null

              }
            </div>
            <Link to={this.props.match.path === '/signup' ? "/login" : "/signup"} className="block align-baseline font-bold text-sm text-blue hover:text-blue-darker">
                { this.props.match.path === '/signup' ? 'Already a member?' : 'Need to Sign Up?' }
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
