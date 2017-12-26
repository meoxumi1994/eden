const conversation = (state = {

}, action) => {
    switch (action.type) {
        case 'CHANGE_CONVERSATION':
          return {
            ...state,
            [action.key] : action.value
          }
        default:
            return state
    }
}

export default conversation
