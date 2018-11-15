
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from "typescript-fsa-reducers";
import Cookie from 'js-cookie'
import { asyncFactory } from 'typescript-fsa-redux-thunk'

export interface AuthState {
    isAuthenticated: boolean;
    error?: string;
}

const actionCreator = actionCreatorFactory('auth');
const createAsync = asyncFactory<AuthState>(actionCreator);

interface LoginParams {
    email: string
    password: string
}
const BaseURL = 'http://localhost:8080'

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

      if (!res.ok) { throw new Error('Failed to Login') }

      location.href = '/'
      return;
})

export const signup  = createAsync<LoginParams, void>('SignUp', async (params, dispatch) => {
    const url = `${BaseURL}/auth/signup`
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })

      if (!res.ok) { throw new Error('Failed to Signup') }

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
    isAuthenticated: Boolean(Cookie.get('accessToken'))
}

export const authReducer = reducerWithInitialState(initialState)
    .cases([login.async.done, signup.async.done], (state) => {
        return {
            ...state,
            isAuthenticated: true
        }
    })
    .case(login.async.failed, (state, { error }) => {
        return {
            isAuthenticated: false,
            error: error.message
        }
    })
    .case(logout.async.done, (state) => {
        return {
            isAuthenticated: false,
        }
    })