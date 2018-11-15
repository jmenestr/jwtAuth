import * as React from "react";
import { Link, RouteComponentProps } from 'react-router-dom'
import SocialMediaLoginButtons from './SocialMediaLoginButtons';
import UserFields from "./UserFields";

interface Props extends RouteComponentProps {
  onSubmit: (email: string, password: string, firstName?: string, lastName?: string) => void;
  onFirstNameChange: React.EventHandler<React.ChangeEvent>
  onLastNameChange: React.EventHandler<React.ChangeEvent>
  onEmailChange: React.EventHandler<React.ChangeEvent>
  onPasswordChange: React.EventHandler<React.ChangeEvent>
  email: string;
  password: string;
  firstName: string;
  lastName:string
}


export default class BaseForm extends React.Component<Props> {

  onSubmit = () => this.props.onSubmit(this.props.email, this.props.password )

  render() {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-grey-lighter">

        <form className="px-8 pt-6 pb-8 bg-white shadow-md rounded w-2/3">
        <p className="text-3xl font-bold my-4">{ this.props.match.path === '/signup' ? 'Create an Account' : 'Welcome Back!' }</p>
          <SocialMediaLoginButtons signup={this.props.match.path === '/signup'} />
          <div className='flex items-center'>
            <span className='mr-6 text-grey-dark'>OR</span>
            <hr className='flex-1 bg-grey-light'></hr>
          </div>
          {
            this.props.match.path === '/signup' ? <UserFields onFirstNameChange={this.props.onFirstNameChange} onLastNameChange={this.props.onLastNameChange} lastName={this.props.lastName} firstName={this.props.firstName} /> : null
          }
          <div className="mb-4">
            <label
              className="inline-block text-grey-darker text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name='email'
              placeholder="Enter your email"
              value={this.props.email}
              onChange={this.props.onEmailChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="inline-block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name='password'
              placeholder="******************"
              value={this.props.password}
              onChange={this.props.onPasswordChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button onClick={this.onSubmit} className="bg-blue hover:bg-blue-dark text-white font-bold py-3 px-5 rounded focus:outline-none focus:shadow-outline w-1/4" type="button">
               { this.props.match.path === '/signup' ? 'Sign Up' : 'Login' }
            </button>
            <Link to={this.props.match.path === '/signup' ? "/login" : "/signup"} className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker">
                { this.props.match.path === '/signup' ? 'Already a member?' : 'Need to Sign Up?' }
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
