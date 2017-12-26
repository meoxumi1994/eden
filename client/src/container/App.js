import { connect } from 'react-redux'

import { getData } from '../action/App'
import App from '../component/App'

const mapStateToProps = (state, ownProps) => {
    const { sentences } = state.data
    const { current_id } = state.inst.app
    return ({
      data : sentences,
      current_id: current_id,
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPopUpText : (id) => {
    dispatch({ type: 'CHANGE_TEXT', id: id, key: 'get_high', value: true })
    setTimeout(() => {
      dispatch({ type: 'CHANGE_TEXT', id: id, key: 'get_high', value: false })
    }, 300 )
  },
  onGetData : () => {
    dispatch(getData())
  }
})

const AppContainer = connect(
    mapStateToProps, mapDispatchToProps
)(App)

export default AppContainer
