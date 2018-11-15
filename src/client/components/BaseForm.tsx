import * as React from "react";
import { Link } from 'react-router-dom'
import SocialMediaLoginButtons from './SocialMediaLoginButtons';
import UserFields from "./UserFields";

interface Props {
  onSubmit: (email: string, password: string) => void;
  signup: boolean;
}

interface State {
  email: string;
  password: string;
}
export default class BaseForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }
  onSubmit = () => this.props.onSubmit(this.state.email, this.state.password)

  onUsernameUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: e.target.value
    });
  };

  onPasswordUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-grey-lighter">

        <form className="px-8 pt-6 pb-8 bg-white shadow-md rounded w-2/3">
        <p className="text-3xl font-bold my-4">{ this.props.signup ? 'Create an Account' : 'Welcome Back!' }</p>
          <SocialMediaLoginButtons signup={this.props.signup} />
          <div className='flex items-center'>
            <span className='mr-6 text-grey-dark'>OR</span>
            <hr className='flex-1 bg-grey-light'></hr>
          </div>
          {
            this.props.signup ? <UserFields /> : null
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
              placeholder="Enter your email"
              value={this.state.email}
              onChange={this.onUsernameUpdate}
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
              placeholder="******************"
              value={this.state.password}
              onChange={this.onPasswordUpdate}
            />
          </div>
          <div className="flex items-center justify-between">
            <button onClick={this.onSubmit} className="bg-blue hover:bg-blue-dark text-white font-bold py-3 px-5 rounded focus:outline-none focus:shadow-outline w-1/4" type="button">
               { this.props.signup ? 'Sign Up' : 'Login' }
            </button>
            <Link to={this.props.signup ? "/login" : "/signin"} className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker">
                { this.props.signup ? 'Already a member?' : 'Need to Sign Up?' }
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
