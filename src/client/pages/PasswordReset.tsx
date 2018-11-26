import * as React from 'react'
import Input from '../components/Input';

interface Props {

}
const PasswordReset = () =>

      <div className="w-screen h-screen flex items-center justify-center bg-grey-lighter">

        <form className="px-8 pt-6 pb-8 bg-white shadow-md rounded w-2/3"  method='post'>
        <p className="text-3xl font-bold my-4"> Reset Password</p>

          <Input name='email' label='Email' type='email' placeholder='Please enter your email'/>

            <button className="bg-blue hover:bg-blue-dark text-white font-bold py-3 px-5 mb-2 rounded focus:outline-none focus:shadow-outline" type="submit">
               Reset your password
            </button>

        </form>
      </div>


export default PasswordReset
