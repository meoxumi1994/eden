const app = (state = {
  current_id : 0
}, action) => {
    switch (action.type) {
        case 'NEXT_SCREEN':
          if(state.current_id != action.next_id){
            return {
              ...state,
              current_id: action.next_id
            }
          }
          return state
        case 'CHANGE_APP':
          return {
            ...state,
            [action.key] : action.value
          }
        default:
            return state
    }
}

export default app
