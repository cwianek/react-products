import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'

// const composedEnhancer = composeWithDevTools(
//   applyMiddleware(thunkMiddleware)
// )

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export default store