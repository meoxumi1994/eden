import { Map, List } from 'immutable'

const text = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_TEXT':
          if( !state[action.id] )
            state[action.id] = {}
          return {
            ...state,
            [action.id] : {
              ...state[action.id],
              [action.key] : action.value
            }
          }
        default:
            return state
    }
}

export default text
