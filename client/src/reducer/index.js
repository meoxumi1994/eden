import { combineReducers } from 'redux'

import inst from './inst'
import data from './data'

const reducer = combineReducers({
  data,
  inst
})

export default reducer
