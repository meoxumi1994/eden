import { combineReducers } from 'redux'

import app from './app'
import conversation from './conversation'
import animation from './animation'
import poemcharacter from './poemcharacter'
import poem from './poem'

const inst = combineReducers({
  app,
  poem,
  animation,
  conversation,
  poemcharacter
})

export default inst
