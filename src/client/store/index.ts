import { createStore, combineReducers , applyMiddleware} from 'redux'
import { authReducer } from './auth';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    auth: authReducer
})

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
    );
const store = createStore(
    rootReducer,
    enhancer
)

export default store
