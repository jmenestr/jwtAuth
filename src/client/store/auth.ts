
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from "typescript-fsa-reducers";
import Cookie from 'js-cookie'
import { asyncFactory } from 'typescript-fsa-redux-thunk'
import * as React from 'react'
export interface AuthState {
    isAuthenticated: boolean;
    error?: string;
    email: string
    password: string
    firstName: string
    lastName: string
}

const actionCreator = actionCreatorFactory('auth');
const createAsync = asyncFactory<AuthState>(actionCreator);

interface LoginParams {
    email: string
    password: string
    firstName?: string
    lastName?: string
}

interface SignupParams extends LoginParams {
    firstName: string
    lastName: string;
}
const BaseURL = 'http://localhost:8080'

export const updateLoginField = actionCreator<{ event: React.ChangeEvent<HTMLInputElement>, key: 'email' | 'password' | 'firstName' | 'lastName' }>('updateLoginField')

export const login = createAsync<LoginParams, void>('Login', async (params, dispatch) => {
    const url = `${BaseURL}/auth/login`
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })

      if (!res.ok) { 
        const message = await res.json()

        throw new Error(message.error) 
      }

      location.href = '/'
      return;
})

export const signup  = createAsync<SignupParams, void>('SignUp', async (params, dispatch) => {
    const url = `${BaseURL}/auth/signup`
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })

      if (!res.ok) { 
          const message = await res.json()

          throw new Error(message.error) 
        }

      location.href = '/'
      return;
})

export const logout = createAsync<void, void>('Logout', async (params, dispatch) => {
    Cookie.remove('accessToken')
    dispatch(logout.async.done({}))
    window.location.href = '/'
    return;
})  
export const initialState: AuthState = {
    isAuthenticated: Boolean(Cookie.get('accessToken')),
    email: '',
    firstName: '',
    lastName: '',
    password: '',
}

export const authReducer = reducerWithInitialState(initialState)
    .case(updateLoginField, (state, { event, key }) => {
        const val = event.currentTarget.value
        return {
            ...state,
            [key]: val
        }
    })
    .cases([login.async.started, signup.async.started], (state) => {
        return {
            ...state,
            error: undefined,
        }
    })
    .cases([login.async.done, signup.async.done], (state) => {
        return {
            ...state,
            isAuthenticated: true
        }
    })
    .cases([login.async.failed, signup.async.failed], (state, { error }) => {
        return {
            ...state,
            isAuthenticated: false,
            error: error.message
        }
    })
    .case(logout.async.done, (state) => {
        return {
            ...state,
            isAuthenticated: false,
        }
    })
