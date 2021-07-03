import { combineReducers } from 'redux'

import outfitReducer from './reducers/outfitSlice';
import weatherReducer from './reducers/weatherSlice';
import productReducer from './reducers/productSlice';
import notificationReducer from './reducers/notificationSlice';
import sessionReducer from './reducers/sessionSlice';

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  outfits: outfitReducer,
  weather: weatherReducer,
  productsState: productReducer,
  notification: notificationReducer,
  session: sessionReducer
})

export default rootReducer