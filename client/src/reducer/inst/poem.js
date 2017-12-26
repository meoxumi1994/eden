const poem = (state = {

}, action) => {
    switch (action.type) {
        case 'CHANGE_POEM_UP':
          if(!state[action.name]){
            state[action.name] = 0
          }
          return {
            ...state,
            [action.name] : state[action.name] + 1
          }
        default:
            return state
    }
}

export default poem
