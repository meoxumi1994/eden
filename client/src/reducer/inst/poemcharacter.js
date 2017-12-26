const poemcharacter = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_POEM_CHARACTER':
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

export default poemcharacter
