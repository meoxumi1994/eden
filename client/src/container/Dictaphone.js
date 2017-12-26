import { connect } from 'react-redux'

import Dictaphone from '../component/Dictaphone'

const mapStateToProps = (state, ownProps) => {
    return ({
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange : (record_text) => {
    dispatch({ type: "CHANGE_CONVERSATION", key: "record_text", value: record_text })
  }
})

const DictaphoneContainer = connect(
    mapStateToProps, mapDispatchToProps
)(Dictaphone)

export default DictaphoneContainer
