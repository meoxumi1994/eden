const data = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_DATA':
          return {
            ...state,
            [action.key] : action.value
          }
        default:
            return state
    }
}

export default data
